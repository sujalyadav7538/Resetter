
"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";


const ForgotPassword = () => {
  const {toast}=useToast();
  const [email,setEmail]=useState("");
  const handleEmail=(e)=>{
    setEmail(e.target.value)
  }
  return (
    <div className="w-full h-screen flex justify-center items-center bg-gray-100">
      <div className="w-[80%] sm:w-[60%] md:w-[40%] lg:w-[30%] bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center mb-4">Forgot Password</h1>
        
        <div className="flex gap-2 flex-col mb-4">
          <label htmlFor="email" className="text-sm font-medium">Enter your Email:</label>
          <Input id="email" className="w-full" type="email" placeholder="Enter your email" onChange={handleEmail}/>
        </div>

        <div className="flex justify-center mt-4">
          <Button 
           className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
           variant="ouline"
           onClick={() => {
            toast({
              title: "Password Reset Mail Sent",
              description:`On ${email} valid for 10 min`,
            })
          }}
           >
            Reset Password
          </Button>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm">
            Remembered your password?{" "}
            <a href="/login" className="text-blue-500 hover:underline">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

