// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("client");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (authError) throw authError;

//       const user = authData?.user;
//       if (!user || !user.id || !user.email) {
//         throw new Error("User data missing after signup.");
//       }

//       // Insert role into custom table
//       const { error: insertError } = await supabase.from("login").insert([
//         {
//           id: user.id,
//           email: user.email,
//           role,
//         },
//       ]);
//       if (insertError) throw insertError;

//       setMessage("Signup successful! Please check your email to verify.");
//       router.push("/login");
//     } catch (err: any) {
//       console.error("Signup Error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // <div className="min-h-screen bg-[url('/image/student-8732859_1280.png')] bg-cover bg-center flex items-center justify-center">
//     //   <div className="max-w-md w-full mx-auto p-15 border rounded bg-opacity-30">

//     <div className="min-h-screen flex">
//   {/* Left side - Image */}
//   <div className="w-1/2 bg-[url('/image/student-8732859_1280.png')] bg-cover bg-center" />

//   {/* Right side - Sign-up form */}
//   <div className="w-1/2 flex items-center justify-center bg-white">
//     <div className="max-w-md w-full p-10 border rounded shadow-md">
//       {/* Your sign-up form goes here */}
//       <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
//       {/* Add your form inputs here */}
//     </div>
//     </div>

//         <h1 className="text-2xl font-bold mb-4 text-[#641B2E] text-center">
//           Sign Up
//         </h1>

//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           className="w-full p-2 mb-4 border rounded"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <select
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//           className="w-full p-2 mb-4  border rounded"
//         >
//           <option value="client">Client</option>
//           <option value="freelancer">Freelancer</option>
//         </select>

//         <button
//           onClick={handleSignup}
//           disabled={loading}
//           className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#641B2E] disabled:bg-gray-400"
//         >
//           {loading ? "Processing..." : "Sign Up"}
//         </button>

//         {message && <p className="text-green-600 mt-4">{message}</p>}
//         {error && <p className="text-red-600 mt-4">{error}</p>}
//       </div>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { supabase } from "@/lib/supabase";

// export default function SignupPage() {
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("client");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSignup = async () => {
//     setError("");
//     setMessage("");
//     setLoading(true);

//     try {
//       const { data: authData, error: authError } = await supabase.auth.signUp({
//         email,
//         password,
//       });

//       if (authError) throw authError;

//       const user = authData?.user;
//       if (!user || !user.id || !user.email) {
//         throw new Error("User data missing after signup.");
//       }

//       // Insert role into custom table
//       const { error: insertError } = await supabase.from("login").insert([
//         {
//           id: user.id,
//           email: user.email,
//           role,
//         },
//       ]);
//       if (insertError) throw insertError;

//       setMessage("Signup successful! Please check your email to verify.");
//       router.push("/login");
//     } catch (err: any) {
//       console.error("Signup Error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left side - Background image */}
//       <div className="w-1/2 bg-[url('/image/student-8732859_1280.png')] bg-cover bg-center" />

//       {/* Right side - Sign Up form */}
//       <div className="w-1/2 flex items-center justify-center bg-white">
//         <div className="max-w-md w-full p-10 border rounded shadow-md">
//           <h1 className="text-2xl font-bold mb-4 text-[#641B2E] text-center">
//             Sign Up
//           </h1>

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             className="w-full p-2 mb-4 border rounded"
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             className="w-full p-2 mb-4 border rounded"
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="w-full p-2 mb-4 border rounded"
//           >
//             <option value="client">Client</option>
//             <option value="freelancer">Freelancer</option>
//           </select>

//           <button
//             onClick={handleSignup}
//             disabled={loading}
//             className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#4b1323] disabled:bg-gray-400"
//           >
//             {loading ? "Processing..." : "Sign Up"}
//           </button>

//           {message && <p className="text-green-600 mt-4">{message}</p>}
//           {error && <p className="text-red-600 mt-4">{error}</p>}
//         </div>
//       </div>
//     </div>
//   );
// }
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen flex">
      {/* Left side - Background image */}
      <div className="w-1/2 bg-[url('/image/student-8732859_1280.png')] bg-cover bg-center hidden md:block" />

      {/* Right side - Sign Up form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="max-w-md w-full p-3">
          <h1 className="text-2xl font-bold mb-6 text-[#641B2E] text-center">
            Sign Up
          </h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            className="w-full p-2 mb-4 border rounded"
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

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          >
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-[#641B2E] text-white py-2 rounded hover:bg-[#4b1323] disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Sign Up"}
          </button>

          {message && <p className="text-green-600 mt-4">{message}</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
}
