// /app/employer/applications.tsx
"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const EmployerApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [replyText, setReplyText] = useState<{ [key: number]: string }>({});
  const employerId = 1; // Replace with dynamic auth if needed

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .select(
        `
        id, job_id, student_id, message, reply_from_employer, applied_at,
        jobs(name),
        students(name, email)
      `
      )
      .in("job_id", [
        /* fetch job ids posted by this employer */
      ]);

    if (error) console.error(error);
    else setApplications(data || []);
  };

  const sendReply = async (applicationId: number) => {
    const reply = replyText[applicationId];
    if (!reply) return;

    const { error } = await supabase
      .from("job_applications")
      .update({
        reply_from_employer: reply,
        reply_sent_at: new Date().toISOString(),
      })
      .eq("id", applicationId);

    if (error) alert("Error sending reply");
    else {
      alert("Reply sent!");
      fetchApplications();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#008b74]">
        Job Applications
      </h2>
      {applications.map((app) => (
        <div
          key={app.id}
          className="border p-4 mb-4 rounded shadow-md bg-white"
        >
          <p>
            <strong>Job:</strong> {app.jobs.name}
          </p>
          <p>
            <strong>Applicant:</strong> {app.students?.name} ({app.student_id})
          </p>
          <p>
            <strong>Message:</strong> {app.message}
          </p>
          <p>
            <strong>Applied At:</strong>{" "}
            {new Date(app.applied_at).toLocaleString()}
          </p>
          {app.reply_from_employer ? (
            <p className="text-green-600">
              <strong>Your Reply:</strong> {app.reply_from_employer}
            </p>
          ) : (
            <div className="mt-2">
              <textarea
                className="w-full p-2 border rounded mb-2"
                rows={2}
                placeholder="Type reply..."
                value={replyText[app.id] || ""}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [app.id]: e.target.value,
                  }))
                }
              />
              <button
                onClick={() => sendReply(app.id)}
                className="bg-[#01627d] text-white px-4 py-2 rounded"
              >
                Send Reply
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default EmployerApplications;
