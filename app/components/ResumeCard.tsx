import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";
import { resume } from "react-dom/server";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { id, companyName, jobTitle,feedback,imagePath },
}: {
  resume: Resume;
}) => {

    const {fs} = usePuterStore();
    const [resumeUrl,setResumeUrl]=useState("")
  

  useEffect(()=>{
    const loadResume=async()=>{
      const blob=await fs.read(imagePath);
      if(!blob)return;
      let url=URL.createObjectURL(blob);
      setResumeUrl(url);
    }

    loadResume();
  },[imagePath])


  return (
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="gap-2 flex flex-col">
          { companyName && <h2 className="font-bold text-black! wrap-break-word">
            {companyName}
          </h2>}
         {jobTitle &&  <h3 className="text-lg wrap-break-word text-gray-500">{jobTitle}</h3>}
         {!jobTitle && !companyName && <h2 className="text-black font-bold">Resume</h2>}
        </div>
        <div className="flex shrink-0">
            <ScoreCircle score={feedback.overallScore}/>
        </div>
      </div>
      {
        resumeUrl && (
          <div className="gradient-border animate-in duration-1000 fade-in">
        <div className="h-full w-full">
            <img src={resumeUrl} alt="Resume" className="w-full h-[350px] max-sm:h-[280px] object-cover object-top" />
        </div>
      </div>
        )
      }
    </Link>
  );
};

export default ResumeCard;
