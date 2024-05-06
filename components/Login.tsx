"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
  return (
    <div className="bg-[#e6e7ee] h-screen flex flex-col items-center justify-center text-center  ">
      <button
        onClick={() => signIn("google")}
        className="text-black text-3xl animate-pulse"
      >
      <Image
        alt="logo"
        src="/logotext.png"
        width={300}
        height={300}
        className="rounded-2xl m-4"
      />
        {/* Sign In to use RealAI */}
      </button>
    </div>
  );
}

export default Login;
