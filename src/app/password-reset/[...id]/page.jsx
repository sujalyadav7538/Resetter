"use client";
import React, { useState,useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useParams } from "next/navigation";

const PasswordReset = () => {
  const params=useParams();
  const { id } = params;
  const [encodedEmail, token] = id || [];
  const { toast } = useToast();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const email=decodeURIComponent(encodedEmail);

  useEffect(() => {

    
  
   
  }, [])
  

  const handleSubmit = async () => {
    try {
      if (!newPassword || !confirmPassword) {
        toast({
          variant: "destructive",
          title: "ALL FIELDS ARE REQUIRED",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      if (newPassword !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        return;
      }

      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token, newPassword }),
      });

      const data = await response.json();
      if (data.success === false) {
        toast({ title: data.message, variant: "destructive" });
        return;
      }

      toast({ description: data.message });
    } catch (error) {
      toast({ title: error.message, variant: "destructive" });
    }
  };
  
  return (
    <div className="w-full h-screen flex justify-center items-center py-5 bg-gray-100">
      <div className="w-full md:w-1/2 lg:w-1/3 p-4 rounded-lg shadow-lg bg-white">
        <h1 className="text-2xl font-semibold text-center mb-4">Reset Password</h1>

        <p className="text-center text-gray-500 mb-4">
          Resetting password for: <strong>{email}</strong>
        </p>

        <div className="flex flex-col gap-4">
          <label htmlFor="newPassword" className="font-medium">
            New Password:
          </label>
          <Input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="flex flex-col gap-4 mt-4">
          <label htmlFor="confirmPassword" className="font-medium">
            Confirm Password:
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
          variant="ghost"
        >
          Reset Password
        </Button>
      </div>
    </div>
  );
};

export default PasswordReset;
