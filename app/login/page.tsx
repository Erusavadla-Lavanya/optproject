"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async () => {
    setMessage(""); // Clear any previous messages
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message); // If error, show the message
    } else {
      setMessage("Login successful! Redirecting to dashboard..."); // Show success message
      console.log("Login successful:", data.user);
      setTimeout(() => {
        router.push("/localhost:3000"); // Redirect to dashboard after 1 second
      }, 1000); // Delay to show the success message briefly
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image/man-freelancer.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-15 border rounded bg-gray-300 bg-opacity-30">
        <h1 className="text-2xl font-bold mb-4">Log In</h1>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Log In
        </button>

        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
}
