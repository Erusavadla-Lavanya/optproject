// /* components/Header.tsx */
// "use client";
// import { useRouter } from "next/navigation";
// import { FC } from "react";
// import { useUserRole } from "../hooks/useUserRole";

// const Header: FC = () => {
//   const router = useRouter();
//   const { role, loading } = useUserRole();

//   return (
//     <header className="bg-white w-380 shadow-sm">
//       {" "}
//       <nav className="w-full px-4 py-4 lg:px-10 flex items-center justify-between">
//         <div className="flex items-center">
//           {/* <h1 className="text-3xl font-extrabold italic text-red-500-transparent bg-clip-text">
//             OptNest
//           </h1> */}
//           <img
//             src="/image/logo.png"
//             alt="OptNest Logo"
//             className="h-13 w-20 ml-5 object-contain"
//           />
//           <h1 className="text-2xl font-extrabold italic text-darkblue">
//             OptNest
//           </h1>
//         </div>

//         <div className="hidden md:flex items-center space-x-20">
//           <div className="relative group"></div>
//           <div className="relative group">
//             <div className="relative inline-block text-left group">
//               <button className="flex items-center text-left text-gray-700 hover:text-[#01627d] transition-colors">
//                 Our Services
//                 <svg
//                   className="ml-1 h-4 w-4"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M19 9l-7 7-7-7"
//                   />
//                 </svg>
//               </button>

//               <div className="absolute z-10 hidden group-hover:block bg-white mt-2 rounded-md shadow-lg w-48">
//                 <ul className="py-2">
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-gray-700 hover:bg-[#F0F8F8] hover:text-[#01627d]"
//                     >
//                       Web Development
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-gray-700 hover:bg-[#F0F8F8] hover:text-[#01627d]"
//                     >
//                       Graphic Design
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-gray-700 hover:bg-[#F0F8F8] hover:text-[#01627d]"
//                     >
//                       Content Writing
//                     </a>
//                   </li>
//                   <li>
//                     <a
//                       href="#"
//                       className="block px-4 py-2 text-gray-700 hover:bg-[#F0F8F8] hover:text-[#01627d]"
//                     >
//                       Digital Marketing
//                     </a>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>

//           {/* <div className="relative group">
//             <button className="flex items-center text-gray-700 hover:text-[#034C53] transition-colors">
//               Find Work
//               <span className="ml-1"></span>
//             </button>
//           </div> */}

//           <div className="relative group">
//             <button className="flex items-center text-gray-700 hover:text-[#034C53] transition-colors">
//               Find Work
//               <span className="ml-1"></span>
//             </button>
//             {/* <div className="absolute right-[20] top-full mt-2 w-[800px] bg-white shadow-lg rounded-md p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10"> */}
//             <div className="absolute left-1/2 top-full mt-2 w-[800px] bg-white shadow-lg rounded-md p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 transform -translate-x-1/2">
//               <div className="grid grid-cols-4 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-sm mb-1">Ways to earn</h3>
//                   <p className="text-sm text-gray-600">
//                     Learn why OptNest has the right opportunities for you.
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-sm mb-1">
//                     Find work for your skills
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Explore the kind of work available in your field.
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-sm mb-1">
//                     Win work with ads
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Get noticed by the right client.
//                   </p>
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-sm mb-1">
//                     Join Freelancer Plus
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     Access more Connects, get strategic insights on competitors,
//                     and try out the latest tools.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="relative group">
//             <button
//               onClick={() => router.push("/jobs")}
//               className="flex items-center text-gray-700 hover:text-[#034C53] transition-colors"
//             >
//               Find Jobs
//               <span className="ml-1"></span>
//             </button>
//           </div>

//           <div className="relative group">
//             <button
//               onClick={() => router.push("/post-job")}
//               className="flex items-center text-gray-700 hover:text-[#034C53] transition-colors"
//             >
//               Post Jobs
//             </button>
//           </div>

//           {/* <div className="relative group">
//             <button
//               onClick={() => {
//                 if (role === "employer") {
//                   router.push("/post-job");
//                 } else {
//                   alert(
//                     "Only employers can post jobs. Please log in as an employer."
//                   );

//                   // router.push("/employer-login");
//                 }
//               }}
//               className="flex items-center text-gray-700 hover:text-[#034C53] transition-colors"
//             >
//               Post Jobs
//             </button>
//           </div> */}
//         </div>
//         <div className="flex items-center space-x-20">
//           <button className="w-full bg-[#034C53] py-2 px-7 rounded hover:bg-[#034C53] text-white">
//             Log in
//           </button>
//           <button
//             onClick={() => router.push("/signup")}
//             className="w-full bg-[#034C53] py-2 px-7 rounded hover:bg-[#034C53] text-white"
//           >
//             Signup
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;







"use client";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { useUserRole } from "../hooks/useUserRole";

const Header: FC = () => {
  const router = useRouter();
  const { role, loading } = useUserRole();

  return (
    <header className="bg-white w-full shadow-sm">
      <nav className="w-full px-4 py-4 lg:px-7 flex flex-col md:flex-row items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <img
            src="/image/logo.png"
            alt="OptNest Logo"
            className="h-10 w-14 object-contain"
          />
          <h1 className="text-2xl font-extrabold italic text-[#00344B]">
            OptNest
          </h1>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-10">
          {/* Our Services Dropdown */}
          <div className="relative group">
            <button className="flex items-center text-gray-700 hover:text-[#01627d] transition-colors">
              Our Services
              <svg
                className="ml-1 h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute z-10 hidden group-hover:block bg-white mt-2 rounded-md shadow-lg w-48">
              <ul className="py-2">
                {["Web Development", "Graphic Design", "Content Writing", "Digital Marketing"].map(service => (
                  <li key={service}>
                    <a
                      href="#"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#F0F8F8] hover:text-[#01627d]"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Find Work Mega Menu */}
          <div className="relative group">
            <button className="text-gray-700 hover:text-[#034C53] transition-colors">
              Find Work
            </button>
            <div className="absolute left-1/2 top-full mt-2 w-[800px] bg-white shadow-lg rounded-md p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 transform -translate-x-1/2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-semibold text-sm mb-1">Ways to earn</h3>
                  <p className="text-sm text-gray-600">Learn why OptNest has the right opportunities for you.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Find work for your skills</h3>
                  <p className="text-sm text-gray-600">Explore the kind of work available in your field.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Win work with ads</h3>
                  <p className="text-sm text-gray-600">Get noticed by the right client.</p>
                </div>
                <div>
                  <h3 className="font-semibold text-sm mb-1">Join Freelancer Plus</h3>
                  <p className="text-sm text-gray-600">Get more Connects and insights.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Other Links */}
          <button
            onClick={() => router.push("/jobs")}
            className="text-gray-700 hover:text-[#034C53] transition-colors"
          >
            Find Jobs
          </button>

          <button
            onClick={() => router.push("/post-job")}
            className="text-gray-700 hover:text-[#034C53] transition-colors"
          >
            Post Jobs
          </button>
        </div>

        {/* Login/Signup Buttons */}
        <div className="flex items-center space-x-4">
          <button className="bg-[#034C53] py-2 px-5 rounded text-white hover:bg-[#02575f]">
            Log in
          </button>
          <button
            onClick={() => router.push("/signup")}
            className="bg-[#034C53] py-2 px-5 rounded text-white hover:bg-[#02575f]"
          >
            Signup
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;

