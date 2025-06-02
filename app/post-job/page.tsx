// "use client";

// import React, { useState } from "react";
// import {
//   MdEmail,
//   MdWork,
//   MdLocationOn,
//   MdTag,
//   MdShortText,
//   MdDescription,
//   MdDateRange,
//   MdBusiness,
//   MdLanguage,
//   MdAttachMoney,
//   MdLink,
// } from "react-icons/md";
// import { supabase } from "@/lib/supabase";

// const jobCategories = [
//   "Frontend Developer",
//   "Backend Developer",
//   "Full Stack Developer",
//   "Data Analyst",
//   "Data Scientist",
//   "DevOps Engineer",
//   "UI/UX Designer",
//   "Mobile App Developer",
//   "Product Manager",
//   "AI/ML Engineer",
// ];

// const PostJob = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredCategories, setFilteredCategories] = useState(jobCategories);
//   const [formData, setFormData] = useState({
//     email: "lavanyaerusavadla93@gmail.com",
//     title: "",
//     location: "",
//     category: "",
//     tags: "",
//     shortDesc: "",
//     description: "",
//     applyUrl: "",
//     date: "",
//     companyName: "",
//     companyWebsite: "",
//     companyDesc: "",
//     salary: "",
//   });
//   const [message, setMessage] = useState("");

//   const handleChange = (e: any) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (e: any) => {
//     const term = e.target.value;
//     setSearchTerm(term);
//     setFormData((prev) => ({ ...prev, category: term }));
//     setFilteredCategories(
//       jobCategories.filter((cat) =>
//         cat.toLowerCase().startsWith(term.toLowerCase())
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     setMessage("Saving...");

//     // 1. Insert company (if not already exists)
//     let { data: companyData, error: companyError } = await supabase
//       .from("companies")
//       .select("*")
//       .eq("name", formData.companyName)
//       .single();

//     let company_id;
//     if (!companyData) {
//       const { data, error } = await supabase
//         .from("companies")
//         .insert({
//           name: formData.companyName,
//           website: formData.companyWebsite,
//           description: formData.companyDesc,
//         })
//         .select()
//         .single();

//       if (error) {
//         setMessage("Error saving company");
//         return;
//       }

//       company_id = data.id;
//     } else {
//       company_id = companyData.id;
//     }

//     // 2. Insert job
//     const { error: jobError } = await supabase.from("jobs").insert({
//       name: formData.title,
//       city: formData.location,
//       salary: parseFloat(formData.salary),
//       percentage: 100,
//       main_skills: formData.category,
//       skills: formData.tags.split(",").map((s) => s.trim()),
//       company_id,
//     });

//     if (jobError) {
//       setMessage("Error saving job.");
//       return;
//     }

//     setMessage("Job posted successfully ✅");
//     setFormData({
//       email: "lavanyaerusavadla93@gmail.com",
//       title: "",
//       location: "",
//       category: "",
//       tags: "",
//       shortDesc: "",
//       description: "",
//       applyUrl: "",
//       date: "",
//       companyName: "",
//       companyWebsite: "",
//       companyDesc: "",
//       salary: "",
//     });
//     setSearchTerm("");
//   };

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">POST JOB</h1>

//       {/* Basic Details */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-red-700">
//           Basic Details
//         </h2>
//         <div className="grid md:grid-cols-3 gap-4">
//           <Input
//             icon={<MdEmail />}
//             placeholder="Email"
//             value={formData.email}
//             name="email"
//             disabled
//           />

//           <Input
//             icon={<MdWork />}
//             placeholder="Job Title"
//             value={formData.title}
//             name="title"
//             onChange={handleChange}
//           />

//           <Input
//             icon={<MdLocationOn />}
//             placeholder="Location"
//             value={formData.location}
//             name="location"
//             onChange={handleChange}
//           />

//           <div className="relative col-span-3 md:col-span-1">
//             <MdWork />
//             <input
//               type="text"
//               value={searchTerm}
//               onChange={handleCategoryChange}
//               placeholder="Select Job Category"
//               className="input pl-10"
//               name="category"
//             />
//             {searchTerm && (
//               <ul className="absolute bg-white border shadow mt-1 z-10 w-full max-h-40 overflow-y-auto">
//                 {filteredCategories.map((category, idx) => (
//                   <li
//                     key={idx}
//                     className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                     onClick={() => {
//                       setSearchTerm(category);
//                       setFormData((prev) => ({ ...prev, category }));
//                       setFilteredCategories([]);
//                     }}
//                   >
//                     {category}
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           <Input
//             icon={<MdTag />}
//             placeholder="Job Tags (comma separated)"
//             value={formData.tags}
//             name="tags"
//             onChange={handleChange}
//           />
//           <Input
//             icon={<MdShortText />}
//             placeholder="Short Description"
//             value={formData.shortDesc}
//             name="shortDesc"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="relative mt-4">
//           <span className="absolute top-3 left-3 text-gray-400">
//             <MdDescription />
//           </span>
//           <textarea
//             placeholder="Job Description"
//             className="input w-full h-32 pl-10 pt-3"
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="grid md:grid-cols-2 gap-4 mt-4">
//           <Input
//             icon={<MdLink />}
//             placeholder="Application email / URL"
//             value={formData.applyUrl}
//             name="applyUrl"
//             onChange={handleChange}
//           />
//           <Input
//             icon={<MdDateRange />}
//             placeholder="dd-mm-yyyy"
//             value={formData.date}
//             name="date"
//             onChange={handleChange}
//           />
//         </div>
//       </section>

//       {/* Company Details */}
//       <section className="mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-red-700">
//           Company Details
//         </h2>
//         <div className="grid md:grid-cols-3 gap-4">
//           <Input
//             icon={<MdBusiness />}
//             placeholder="Company Name"
//             value={formData.companyName}
//             name="companyName"
//             onChange={handleChange}
//           />
//           <Input
//             icon={<MdLanguage />}
//             placeholder="Company Website (Optional)"
//             value={formData.companyWebsite}
//             name="companyWebsite"
//             onChange={handleChange}
//           />
//           <Input
//             icon={<MdDescription />}
//             placeholder="Briefly describe your company"
//             value={formData.companyDesc}
//             name="companyDesc"
//             onChange={handleChange}
//           />
//           <Input
//             icon={<MdAttachMoney />}
//             placeholder="Enter Salary"
//             value={formData.salary}
//             name="salary"
//             onChange={handleChange}
//           />
//         </div>
//       </section>

//       <button
//         onClick={handleSubmit}
//         className="bg-red-600 text-white px-6 py-3 rounded hover:bg-red-700"
//       >
//         Submit Your Job
//       </button>
//       {message && <p className="mt-4 text-center text-green-600">{message}</p>}
//     </div>
//   );
// };

// export default PostJob;

// const Input = ({ icon, ...props }: any) => (
//   <div className="relative">
//     <div className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
//       {icon}
//     </div>
//     <input {...props} className="input pl-10" />
//   </div>
// );

"use client";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BriefcaseIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  WrenchScrewdriverIcon,
  ListBulletIcon,
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";

const JobForm = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    salary: "",
    percentage: "",
    main_skills: "",
    skills: "",
    company_id: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setSuccess("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    const skillsArray = formData.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const jobData = {
      name: formData.name,
      city: formData.city,
      salary: Number(formData.salary),
      percentage: Number(formData.percentage),
      main_skills: formData.main_skills,
      skills: skillsArray,
      company_id: Number(formData.company_id),
    };

    const { error } = await supabase.from("jobs").insert([jobData]);

    if (error) {
      console.error(error);
      setError("Failed to add job. Please try again.");
    } else {
      setSuccess("Job added successfully!");
      setFormData({
        name: "",
        city: "",
        salary: "",
        percentage: "",
        main_skills: "",
        skills: "",
        company_id: "",
      });
      setTimeout(() => {
        router.push("/jobs");
      }, 1000);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-18 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-[#0D4715]">
        Add New Job
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Job Title"
          name="name"
          value={formData.name}
          onChange={handleChange}
          Icon={BriefcaseIcon}
        />
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          Icon={MapPinIcon}
        />
        <Input
          label="Salary"
          name="salary"
          type="number"
          value={formData.salary}
          onChange={handleChange}
          Icon={CurrencyDollarIcon}
        />

        <Input
          label="Main Skills"
          name="main_skills"
          value={formData.main_skills}
          onChange={handleChange}
          Icon={WrenchScrewdriverIcon}
        />
        <Input
          label="Skills (comma-separated)"
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          Icon={ListBulletIcon}
        />
        <Input
          label="Company ID"
          name="company_id"
          type="number"
          value={formData.company_id}
          onChange={handleChange}
          Icon={BuildingOfficeIcon}
        />

        {success && <p className="text-green-600">{success}</p>}
        {error && <p className="text-red-600">{error}</p>}

        <button
          type="submit"
          className="bg-[#0D4715] text-white px-4 py-2 rounded hover:bg-[#0D4715] w-full"
        >
          Submit Job
        </button>
      </form>
    </div>
  );
};

export default JobForm;

// Reusable Input Component with Icon
const Input = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  Icon,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  Icon: React.ElementType;
}) => (
  <div>
    <label htmlFor={name} className="block text-sm font-medium text-gray-700">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="mt-1 relative">
      <Icon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5 pointer-events-none" />
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        required
        className="pl-10 pr-3 py-2 block w-full border rounded-md shadow-sm focus:ring-[#01627d] focus:border-[#01627d] sm:text-sm"
      />
    </div>
  </div>
);
