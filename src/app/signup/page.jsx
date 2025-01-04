"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";



const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {toast}=useToast();

  const handleSubmit = async() => {
    try {
      if(!email || !password || !name){
        toast({
          variant: "destructive",
          title: "ALL FIELDS ARE REQUIRED",
          action: <ToastAction altText="Try again" >Try again</ToastAction>,
        });
        return;
        
      }
      const response=await fetch('api/auth/signup',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({email,password,name})
      });
      const data = await response.json();
      if(data.success==false){
        toast({title:data.message,variant: "destructive"});
        return;
      }

      toast({description:data.message})
        
    } catch (error) {
      toast({title:error.message,variant: "destructive"});
    }
    };

  return (
    <div className="w-full h-screen flex justify-center items-center py-5 bg-gray-100">
    <div className="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-semibold text-center mb-4">SignUp Page</h1>

        {/* Name Field */}
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="font-medium">
            Name:
          </label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="email" className="font-medium">
            Email:
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="password" className="font-medium">
            Password:
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex gap-2 justify-center pt-3 ">
          <Link href={`/login`} className="flex items-center">
            <h1>Alreday have an account?</h1>
            <Button variant="link" className="text-blue-500 pt-2">Login</Button>
          </Link>
          
        </div>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition w-full"
          variant="outline"
        >
          Sign Up
        </Button>

      </div>
    </div>
  );
};

export default Signup;
