import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Resumetric | Auth" },
  { name: "description", content: "Log into your account" },
];

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.search.split("next=")[1] || "/";

  useEffect(() => {
    if (auth.isAuthenticated && next && location.pathname !== next) {
      navigate(next);
    }
  }, [auth.isAuthenticated, next, location.pathname, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex items-center justify-center min-h-screen">
      <div className="shadow-lg gradient-border">
        <section className="rounded-2xl flex flex-col gap-8 bg-white p-6">
          <div className="flex flex-col items-center gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
          </div>

          <div className="flex flex-col items-center">
            {isLoading ? (
              <button className="auth-button animate-pulse">
                <p>Signing you in...</p>
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={() => auth.signOut()}>
                    <p>Log Out</p>
                  </button>
                ) : (
                  <button className="auth-button" onClick={() => auth.signIn()}>
                    <p>Log In</p>
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
