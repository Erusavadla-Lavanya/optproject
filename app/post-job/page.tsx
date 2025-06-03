
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
    <div className="max-w-xl mx-auto bg-white p-10  ">
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
    <label htmlFor={name} className="block text-sm font-medium text-gray-1000">
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
