import React, { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { prepareInstructions } from "~/constants";
import { convertPdfToImage } from "~/lib/pdf2img";
import { usePuterStore } from "~/lib/puter";
import { generateUUID } from "~/lib/utils";
import type { Route } from "../+types/root";

// export function meta({}: Route.MetaArgs) {
//   return [
//     { title: "Resumetrics" },
//     {
//       name: "upload-resume",
//       content: "AI-powered insights to perfect your resume.",
//     },
//   ];
// }

const upload = () => {
  const {ai,fs,kv,auth,isLoading} =usePuterStore();
  const navigate=useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setFile(file);
  };

  const handleAnalyze =async ({
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
    setStatusText('Uploading the file...')
    const uploadedFile=await fs.upload([file]);
    if(!uploadedFile)return setStatusText('Error: Failed to upload file');
    console.log("Uploaded file:", uploadedFile);
    setStatusText('Converting to image...');
    const imageFile=await convertPdfToImage(file);
    if(!imageFile?.file)return setStatusText('Error: Failed to Convert PDF to image')
    setStatusText('Uploading the Image...');
    const uploadedImage=await fs.upload([imageFile.file]);
    
    if(!uploadedImage)return setStatusText('Error: Failed to upload image')
      
    setStatusText('Preparing data...')

    const uuid=generateUUID()
    const data={
      id:uuid,
      resumePath:uploadedFile.path,
      imagePath:uploadedImage.path,
      companyName,jobDescription,jobTitle,
      feedback:''
    }

    await kv.set(`resume:${uuid}`,JSON.stringify(data))
    
    
    setStatusText('Analyzing...');
    const feedback:AIResponse|undefined=await ai.feedback(
      uploadedFile.path,
      prepareInstructions({jobTitle,jobDescription})
    )

    if(!feedback)return setStatusText('Error: Failed to analyze resume');

    const feedbackText=typeof feedback.message.content ==='string'?
      feedback.message.content
      :feedback.message.content[0].text;

    data.feedback=JSON.parse(feedbackText)
    await kv.set(`resume:${uuid}`,JSON.stringify(data))
    setStatusText('Analysis complete,redirecting...');
    console.log(data);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    if (!file) {
      console.warn("No file selected!");
      return;
    }
    handleAnalyze({companyName,jobDescription,jobTitle,file});
  };

  return (
    <main className='bg-[url("/images/bg-main.svg")] bg-cover'>
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-6">
          <h1>Smart Feedback for your dream job </h1>
          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img src="./images/resume-scan.gif" alt="" />
            </>
          ) : (
            <h2>Drop your resume for an ATS score and improvement tips</h2>
          )}
          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className=" flex flex-col gap-4 mt-2"
            >
              <div className="form-div">
                <label htmlFor="company-name">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  name="company-name"
                  placeholder="Company Name"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-title">Job Title</label>
                <input
                  type="text"
                  id="job-title"
                  name="job-title"
                  placeholder="Job title"
                />
              </div>
              <div className="form-div">
                <label htmlFor="job-description">Job Description</label>
                <textarea
                  id="job-description"
                  name="job-description"
                  placeholder="Job Description"
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
