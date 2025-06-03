// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

// export default function LoginPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     setMessage(""); // Clear any previous messages
//     const { data, error } = await supabase.auth.signInWithPassword({
//       email,
//       password,
//     });

//     if (error) {
//       setMessage(error.message); // If error, show the message
//     } else {
//       setMessage("Login successful! Redirecting to dashboard..."); // Show success message
//       console.log("Login successful:", data.user);
//       setTimeout(() => {
//         router.push("/localhost:3000"); // Redirect to dashboard after 1 second
//       }, 1000); // Delay to show the success message briefly
//     }
//   };

//   return (
//     <div className="min-h-screen bg-[url('/image/man-freelancer.jpg')] bg-cover bg-center flex items-center justify-center">
//       <div className="max-w-md w-full mx-auto p-15 border rounded bg-gray-300 bg-opacity-30">
//         <h1 className="text-2xl font-bold mb-4">Log In</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button
//           onClick={handleLogin}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//         >
//           Log In
//         </button>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//       </div>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setMessage("");
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Login successful! Redirecting to dashboard...");
      setTimeout(() => {
        router.push("/"); // Change to your dashboard route
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Background image */}
      <div className="w-1/2 bg-[url('/image/student-8732859_1280.png')] bg-cover bg-center hidden md:block" />

      {/* Right side - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-10 border rounded shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-[#641B2E] text-center">
            Log In
          </h1>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password input with eye toggle */}
          <div className="relative mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              className="w-full p-2 pr-10 border rounded"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#4b1323] disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Log In"}
          </button>

          {message && (
            <p
              className={`mt-4 ${
                message.includes("successful") ? "text-green-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

