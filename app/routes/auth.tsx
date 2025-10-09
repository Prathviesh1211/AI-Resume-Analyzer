import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { usePuterStore } from '~/lib/puter'

export const meta=()=>([
  {title:'Resumetrics | Auth' },
  {name:'description',content:'Log into your account'}
])

const auth = () => {
  
  const {isLoading,auth} =usePuterStore();
  const location=useLocation();
  const next=location.search.split('next')[1];
  const navigate=useNavigate();

  useEffect(()=>{
    if(auth.isAuthenticated)navigate(next);
  },[auth.isAuthenticated,next])

  return (
  <main className="bg-[url('/images/bg-auth.svg')] bg-cover flex min-h-screen items-center justify-center">
    <div className='gradient-border shadow-lg'>
      <section className='flex  flex-col bg-white gap-8 rounded-2xl p-10'>
        <div className='flex flex-col text-center items-center'>
          <h1 className=''>Welcome</h1>
          <h2 className=''>Login To Continue Your Job journey</h2>
        </div>
        <div className='text-center'>
          {isLoading?(
            <button className='auth-button animate-pulse'>
              <p>Signing you in...</p>
            </button> 
          ):(
            <>
              {auth.isAuthenticated?(
                <button className='auth-button' onClick={()=>auth.signOut()}>
                 <p> Log Out</p>
                </button>
              ):<button className='auth-button' onClick={()=>auth.signIn()}>
                 <p> Log In </p>
                </button>}
            </>
          )}
        </div>
      </section>
    </div>
  </main>
  )
}

export default auth
