"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setError("");
    setMessage("");
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      const user = authData?.user;
      if (!user || !user.id || !user.email) {
        throw new Error("User data missing after signup.");
      }

      // Insert role into custom table
      const { error: insertError } = await supabase.from("login").insert([
        {
          id: user.id,
          email: user.email,
          role,
        },
      ]);
      if (insertError) throw insertError;

      setMessage("Signup successful! Please check your email to verify.");
      router.push("/login");
    } catch (err: any) {
      console.error("Signup Error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/image/man-freelancer.jpg')] bg-cover bg-center flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-15 border rounded bg-gray-300 bg-opacity-30">
        <h1 className="text-2xl font-bold mb-4 text-[#641B2E] text-center">
          Sign Up
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2 mb-4  border rounded"
        >
          <option value="client">Client</option>
          <option value="freelancer">Freelancer</option>
        </select>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#641B2E] disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Sign Up"}
        </button>

        {message && <p className="text-green-600 mt-4">{message}</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
      </div>
    </div>
  );
}
