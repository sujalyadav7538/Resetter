"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast"


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {toast}=useToast();

 const handleSubmit = async() => {
     try {
       if(!email || !password ){
         toast({
           variant: "destructive",
           title: "ALL FIELDS ARE REQUIRED",
           action: <ToastAction altText="Try again" >Try again</ToastAction>,
         });
         return;
         
       }
       const response=await fetch('api/auth/login',{
         method:"POST",
         headers:{
           "Content-Type":"application/json"
         },
         body:JSON.stringify({email,password})
       });
       const data = await response.json();
       if(data.success==false){
         toast({title:data.message,variant: "destructive"});
         return;
       }
       console.log(data)
       toast({description:data.message})
         
     } catch (error) {
       toast({title:error.message,variant: "destructive"});
     }
     };

  return (
    <div className="w-full h-screen flex justify-center items-center py-5 bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-semibold text-center mb-4">Login Page</h1>

        <div className="flex flex-col gap-4">
          <label htmlFor="username" className="font-medium">
            Username/Email:
          </label>
          <Input
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full"
          />
        </div>

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
        <div className="flex gap-2 justify-between pt-3">
          <Link href={`/signup`} >
            <Button variant="link" className="text-blue-500">SignUp</Button>
          </Link>
          <Link href={"/forgot-password"}>
            <Button  variant="link" className="text-blue-500">Forgot Password?</Button>
          </Link>
        </div>

        <Button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          variant="ghost"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
