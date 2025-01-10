"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

const PasswordReset = () => {
  const params = useParams();
  const { id } = params;
  const [encodedEmail, token] = id || [];
  const email = decodeURIComponent(encodedEmail || "");
  const { toast } = useToast();
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValid, setValid] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const checkUrlValidity = async () => {
      setLoading(true);
      try {
        if (!email || !token) {
          toast({ title: "Invalid URL", variant: "destructive" });
          setValid(false);
          return;
        }
        const res = await fetch("/api/checkUrl", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        });
        const data = await res.json();
        setValid(data.success);
        console.log(data)
        if (!data.success) {
          toast({ title: "Invalid URL", variant: "destructive" });
        }
      } catch (error) {
        toast({ title: "Error validating URL", variant: "destructive" });
      } finally {
        setLoading(false);
      }
    };
    checkUrlValidity();
  }, [email, token, toast]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      if (!newPassword || !confirmPassword) {
        toast({
          variant: "destructive",
          title: "All fields are required.",
        });
        return;
      }
      if (newPassword !== confirmPassword) {
        toast({
          variant: "destructive",
          title: "Passwords do not match.",
        });
        return;
      }
      const res = await fetch("/api/auth/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, token, newPassword }),
      });
      const data = await res.json();
      if (!data.success) {
        toast({ title: data.message, variant: "destructive" });
        return;
      }
      toast({ description: data.message });
      router.push("/login");
    } catch (error) {
      toast({ title: "Error resetting password", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="w-full h-screen flex justify-center items-center">Loading...</div>;
  }

  if (!isValid) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100">
        <div className="p-4 rounded-lg shadow-lg bg-white text-center">
          <h1 className="text-2xl font-semibold text-red-500 mb-4">Invalid or Expired URL</h1>
          <p className="text-gray-500">Please request a new password reset link.</p>
          <Link className="text-blue-700 underline-none " href={`/login`}> Login...</Link>
        </div>
      </div>
    );
  }

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
          />
        </div>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition w-full"
        >
          {isSubmitting ? "Submitting..." : "Reset Password"}
        </Button>
      </div>
    </div>
  );
};

export default PasswordReset;
