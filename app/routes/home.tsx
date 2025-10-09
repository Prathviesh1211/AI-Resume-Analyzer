import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import { resumes } from "~/constants";
import ResumeCard from "~/components/ResumeCard";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import { useEffect } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumetrics" },
    {
      name: "description",
      content: "AI-powered insights to perfect your resume.",
    },
  ];
}

export default function Home() {

  const {isLoading,auth} =usePuterStore();
  const location=useLocation();
  const navigate=useNavigate();

  useEffect(() => {
  if (!isLoading) {
    if (!auth?.isAuthenticated) {
      navigate('/auth?next=/');
    }
  }
}, [isLoading, auth?.isAuthenticated, navigate]);


  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />
      <section className="main-section">
        <div className="page-heading">
          <h1>Track your Applications and Resume Ratings</h1>
          <h2>Review your submissions and check AI-powered feedbacks</h2>
        </div>

      {resumes.length > 0 && (
        <div className="resumes-section">
          {resumes.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
          ))}
        </div>
      )}
      </section>
    </main>
  );
}
