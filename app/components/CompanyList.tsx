"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const currentUserId = "student1@example.com";

interface Job {
  id: number;
  name: string;
  city: string;
  salary: number;
  percentage: number;
  main_skills: string;
  skills: string[];
  company_id: number;
  company_name: string;
  applicant_count: number;
  has_applied: boolean;
  employer_reply?: string | null;
}

const CompanyList = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setResumeFile(file);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resumeFile) {
      setError("Please upload your resume before submitting the application.");
      return;
    }
    submitApplication();
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    const { data: jobsData, error: jobsError } = await supabase
      .from("jobs")
      .select(
        `id, name, city, salary, percentage, main_skills, skills, company_id, companies(name)`
      );

    if (jobsError) {
      setError("Failed to load jobs");
      setLoading(false);
      return;
    }

    const { data: applications } = await supabase
      .from("job_applications")
      .select("job_id, student_id, reply_from_employer");

    const jobList = (jobsData || []).map((job: any) => {
      const jobApps = applications?.filter((a) => a.job_id === job.id) || [];
      const studentApp = jobApps.find((a) => a.student_id === currentUserId);

      return {
        ...job,
        company_name: job.companies?.name || "",
        applicant_count: jobApps.length,
        has_applied: !!studentApp,
        employer_reply: studentApp?.reply_from_employer || null,
      };
    });

    const visibleJobs = jobList.filter(
      (job) => job.applicant_count < 5 || job.has_applied
    );

    setJobs(visibleJobs);
    setLoading(false);
  };

  const openApplyModal = (job: Job) => {
    setSelectedJob(job);
    setShowModal(true);
    setApplicationMessage("");
  };

  const submitApplication = async () => {
    if (!selectedJob || !resumeFile) return;

    const { error } = await supabase.from("job_applications").insert([
      {
        job_id: selectedJob.id,
        student_id: currentUserId,
        applied_at: new Date().toISOString(),
        message: applicationMessage,
      },
    ]);

    if (error) {
      alert("Error while applying.");
      console.error(error);
    } else {
      setShowModal(false);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setShowThankYouMessage(true);
        setTimeout(() => setShowThankYouMessage(false), 3000);
      }, 1000);
      await fetchJobs();
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      job.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading jobs...</p>
      ) : error ? (
        <p>{error}</p>
      ) : jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 gap-3">
            <h1 className="text-2xl font-bold text-[#332D56]">
              Available Jobs
            </h1>
            <input
              type="text"
              placeholder="Search by company or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-500 rounded px-3 py-2 w-full md:max-w-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="shadow-md p-8 bg-gray-100 transition-transform transform hover:-translate-y-1 hover:shadow-lg"
              >
                <h2 className="text-xl font-bold text-black">{job.name}</h2>
                <p className="text-gray-600">Company: {job.company_name}</p>
                <p className="text-gray-600">Location: {job.city}</p>
                <p className="text-gray-600">Salary: ${job.salary}</p>
                <p className="text-gray-600">Main Skills: {job.main_skills}</p>
                <p className="text-gray-600">Skills: {job.skills.join(", ")}</p>

                {job.has_applied ? (
                  <div className="mt-3">
                    <p className="text-green-600 font-semibold">
                      You have applied
                    </p>
                    {job.employer_reply && (
                      <p className="text-blue-600 mt-1">
                        Employer Reply: {job.employer_reply}
                      </p>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={() => openApplyModal(job)}
                    className="mt-3 px-4 py-2 bg-[#F97A00] text-white rounded hover:bg-[#e56c00]"
                  >
                    Apply
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* Apply Modal */}
      {showModal && selectedJob && (
        <div className="fixed inset-0 bg-white bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-black text-lg"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2 text-[#0D4715]">
              Apply for: {selectedJob.name}
            </h3>
            <p className="mb-2 text-gray-500">
              Company: {selectedJob.company_name}
            </p>

            <label className="block text-sm font-medium text-gray-500 mb-1">
              Upload Resume <span className="text-red-500">*</span>
            </label>
            <div className="relative mb-3">
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="border rounded-md p-2 bg-white text-gray-700 cursor-pointer text-center">
                {resumeFile ? resumeFile.name : "Click to choose a PDF file"}
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <textarea
              rows={4}
              placeholder="Write a brief message to the employer..."
              value={applicationMessage}
              onChange={(e) => setApplicationMessage(e.target.value)}
              className="w-full border rounded-md p-2 mb-4"
            />

            <form onSubmit={handleSubmit}>
              <button
                type="submit"
                className="bg-[#0D4715] text-white px-4 py-2 rounded hover:bg-green-800 w-full"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-green-100 text-green-800 font-semibold px-6 py-4 rounded shadow-lg">
            Application submitted successfully!
          </div>
        </div>
      )}

      {/* Thank You Message */}
      {showThankYouMessage && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-blue-100 text-blue-800 font-semibold px-6 py-4 rounded shadow-lg">
            Thank you for applying. We will get back to you soon!
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyList;
