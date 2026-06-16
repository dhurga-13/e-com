"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(""); // Clear error when user starts typing again
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    // Simulating a backend database using localStorage
    setTimeout(() => {
      try {
        const existingUsers = JSON.parse(
          localStorage.getItem("riode_registered_users") || "[]",
        );

        // Check if user already exists
        if (existingUsers.some((u: any) => u.email === formData.email)) {
          setError("User with this email already exists.");
          setLoading(false);
          return;
        }

        // Add new user to the "database"
        existingUsers.push({
          username: formData.username,
          email: formData.email,
          password: formData.password,
        });

        localStorage.setItem(
          "riode_registered_users",
          JSON.stringify(existingUsers),
        );
        setLoading(false);
        router.push("/login");
      } catch (err) {
        setError("An unexpected error occurred. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="container mx-auto flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 shadow-sm">
        <h2 className="text-2xl font-bold text-center mb-8 uppercase tracking-wider text-gray-800">
          Register
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 text-sm border border-red-100 mb-4">
              {error}
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Username *
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Password *
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase">
              Confirm Password *
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              required
              suppressHydrationWarning
              className="w-full px-4 py-3 border border-gray-300 focus:outline-none focus:border-black transition-colors"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            suppressHydrationWarning
            disabled={loading}
            className="w-full bg-black text-white py-4 mt-4 font-bold uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-bold text-black border-b-2 border-black hover:border-gray-400 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
