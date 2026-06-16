"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Step = "email" | "otp" | "reset";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Step 1: Handle Email Submission
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const users = JSON.parse(
        localStorage.getItem("riode_registered_users") || "[]",
      );
      const userExists = users.some((u: any) => u.email === email);

      if (userExists) {
        console.log("OTP Sent to:", email, "(Simulated OTP: 123456)");
        setStep("otp");
      } else {
        setError("No account found with this email address.");
      }
      setLoading(false);
    }, 1000);
  };

  // Step 2: Handle OTP Verification
  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (otp === "123456") {
        setStep("reset");
      } else {
        setError("Invalid OTP. Please try '123456'.");
      }
      setLoading(false);
    }, 800);
  };

  // Step 3: Handle Password Reset
  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      try {
        const users = JSON.parse(
          localStorage.getItem("riode_registered_users") || "[]",
        );
        const updatedUsers = users.map((u: any) => {
          if (u.email === email) {
            return { ...u, password: newPassword };
          }
          return u;
        });

        localStorage.setItem(
          "riode_registered_users",
          JSON.stringify(updatedUsers),
        );
        setLoading(false);
        router.push("/login");
      } catch (err) {
        setError("An error occurred. Please try again.");
        setLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-4 uppercase tracking-wider text-gray-800">
          Reset Password
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 text-sm border border-red-100 mb-6">
            {error}
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <p className="text-gray-600 text-sm text-center">
              Enter your email address and we'll send you a 6-digit OTP to reset
              your password.
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Email Address *
              </label>
              <input
                type="email"
                required
                suppressHydrationWarning
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {loading ? "Checking..." : "Send OTP"}
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-6">
            <p className="text-gray-600 text-sm text-center">
              We've sent a code to{" "}
              <span className="font-bold text-black">{email}</span>. Enter the
              6-digit code below.
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Verification Code *
              </label>
              <input
                type="text"
                placeholder="123456"
                required
                maxLength={6}
                suppressHydrationWarning
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors text-center tracking-[1em] font-bold text-xl"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-sm text-gray-500 hover:text-black underline"
            >
              Change Email
            </button>
          </form>
        )}

        {step === "reset" && (
          <form onSubmit={handleResetSubmit} className="space-y-5">
            <p className="text-gray-600 text-sm text-center">
              Identity verified! Now, please enter your new password.
            </p>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                New Password *
              </label>
              <input
                type="password"
                required
                suppressHydrationWarning
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                suppressHydrationWarning
                className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <Link
            href="/login"
            className="text-sm text-gray-600 hover:text-black transition-colors"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
