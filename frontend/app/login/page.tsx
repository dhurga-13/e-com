"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate network delay
    setTimeout(() => {
      try {
        const existingUsers = JSON.parse(
          localStorage.getItem("riode_registered_users") || "[]",
        );

        // Verify credentials properly against the simulated database
        const matchedUser = existingUsers.find(
          (u: any) => u.email === email && u.password === password,
        );

        if (matchedUser) {
          // Save session data
          localStorage.setItem(
            "riode_user",
            JSON.stringify({ name: matchedUser.username }),
          );

          // Trigger TopBar update
          window.dispatchEvent(new Event("auth_change"));

          setLoading(false);
          router.push("/");
        } else {
          setError("Invalid email or password.");
          setLoading(false);
        }
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wider text-gray-800">
          Login
        </h2>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 text-sm border border-red-100 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Password *
            </label>
            <input
              type="password"
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError("");
              }}
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-black border-gray-300"
              />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-gray-500 hover:text-black transition-colors"
            >
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            suppressHydrationWarning
            disabled={loading}
            className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm">
          <span className="text-gray-600">Not a member? </span>
          <Link
            href="/register"
            className="font-bold text-black border-b-2 border-black hover:border-gray-400 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
