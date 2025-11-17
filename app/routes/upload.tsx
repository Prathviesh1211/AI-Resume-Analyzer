import React, { useState, type FormEvent } from "react";
import { resume } from "react-dom/server";
import { data, useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";

const upload = () => {
  const { auth, kv, fs,ai, isLoading } = usePuterStore();
  const navigate=useNavigate();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [statusText, setStatusText] = useState<string>("");

  const [file, setFile] = useState<File | null>(null);




  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: {
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    file: File;
  }) => {
    setIsProcessing(true);
    setStatusText("Uploading the file...");

    const uploadedFile = await fs.upload([file]);
    if(!uploadedFile)return setStatusText('Error:Failed to upload file')
      
    setStatusText('Converting to image...')
    const imageFile=await convertPdfToImage(file);
    if(!imageFile.file)return setStatusText('Error:Failed to convert PDF to image');

    setStatusText('Uploading the image...');
    const uploadedImage=await fs.upload([imageFile.file])
    if(!uploadedImage)return setStatusText('Error:Failed to upload image')
  
    setStatusText('Preparing Data...')
    const uuid=generateUUID();

    const data={
      id:uuid,
      resumePath:uploadedFile.path,
      imagePath:uploadedImage.path,
      companyName,jobTitle,jobDescription,
      feedback:''
    }

    await kv.set(`resume:${uuid}`,JSON.stringify(data));
    setStatusText('Analyzing...')

   const feedback = await ai.feedback(
  uploadedFile.path,
  prepareInstructions({
    jobTitle,
    jobDescription,
  })
  // { model: "gpt-4o-mini" }
);

    if(!feedback)return setStatusText('Error : Failed to analyze resume')

    const feedbackContent = typeof feedback.message.content === 'string'
    ? feedback.message.content
    : feedback.message.content[0];

console.log(feedback.message.content);

// Extract text property if feedbackContent is an object
const feedbackText = typeof feedbackContent === 'string' 
    ? feedbackContent 
    : feedbackContent.text;
    
    data.feedback = JSON.parse(feedbackText);

    await kv.set(`resume:${uuid}`,JSON.stringify(data));
    setStatusText('Analysis complete, redirecting...');
    console.log(data);
    navigate(`/resume/${uuid}`)
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form: HTMLFormElement | null = e.currentTarget.closest("form");

    if (!form) return;
    const formData = new FormData(form);

    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;

    // console.log({companyName,jobTitle,jobDescription,file});

    if (!file) return;

    handleAnalyze({ companyName, jobTitle, jobDescription, file });
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading ">
          <h1>Smart feedback for your dream job</h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                alt=""
                className="w-full h-160"
              />
            </>
          ) : (
            <h2>Drop your resume for ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              className="flex flex-col gap-4 mt-2 p-2"
              onSubmit={handleSubmit}
            >
              <div className="form-div">
                <label htmlFor="comany-name"> Company Name</label>
                <input
                  type="text"
                  placeholder="Company Name"
                  name="company-name"
                  id="company-name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title"> Job Title</label>
                <input
                  type="text"
                  placeholder="Job Title"
                  name="job-title"
                  id="job-title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description"> Job Description</label>
                <textarea
                  rows={3}
                  placeholder="Job Description"
                  name="job-description"
                  id="job-description"
                />
              </div>
              <div className="form-div">
                <label htmlFor="uploader">Upload Resume</label>
                <FileUploader onFileSelect={handleFileSelect} />
              </div>
              <button className="primary-button" type="submit">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default upload;
