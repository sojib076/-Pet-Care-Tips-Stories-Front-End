"use client"

import { signIn,  } from "next-auth/react";

const GoogleLoginBtn = () => {
 
 
  return (
    <button
      className="flex justify-center items-center px-16 py-3 bg-white rounded-md shadow-md"
      onClick={() => {
        signIn("google", { callbackUrl: "/dashboard" });
      }}
    >




      <svg




        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        width="24px"
        height="24px"
      >
        <path
          fill="#4285F4"
          d="M24 9.5c3.9 0 7.1 1.3 9.5 3.4l7.1-7.1C35.8 2.1 30.2 0 24 0 14.6 0 6.6 5.8 2.8 14.2l8.3 6.4C13.1 14.1 18 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.5 24c0-1.6-.1-3.1-.4-4.6H24v9.1h12.7c-.5 2.6-2 4.8-4.2 6.3l6.6 5.1c3.9-3.6 6.4-8.9 6.4-15.9z"
        />
        <path
          fill="#FBBC05"
          d="M11.1 28.6c-1.1-3.2-1.1-6.8 0-9.9L2.8 12.3C-1 18.2-1 27.8 2.8 33.7l8.3-6.4z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.5 0 12-2.1 16-5.7l-7.6-5.9c-2.1 1.4-4.8 2.3-8.4 2.3-6 0-11.1-4.1-12.9-9.6l-8.3 6.4C6.6 42.2 14.6 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </svg>
      <span className="ml-2">Login with Google</span>
    </button>
  );
};

export default GoogleLoginBtn;
