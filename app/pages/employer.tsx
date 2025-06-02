// pages/employer.tsx
import { useEffect, useState } from 'react';

import EmployerReply from '../components/EmployerReply';

import { supabase } from '@/lib/supabase';

// Define the JobApplication type
interface JobApplication {
  id: number;
  freelancer_id: number | string;
  message: string;
  resume_url?: string | null;
}


export default function EmployerPage() {
  const [applications, setApplications] = useState<JobApplication[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      const { data, error } = await supabase
        .from('job_applications')
        .select('*');

      if (error) {
        console.error('Error fetching applications:', error);
      } else {
        setApplications(data as JobApplication[]);
      }
    };

    fetchApplications();
  }, []);

  return (
    <div>
      <h1>Employer Dashboard</h1>
      {applications.map((app) => (
        <div key={app.id} style={{ border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
          <p><strong>Freelancer ID:</strong> {app.freelancer_id}</p>
          <p><strong>Message:</strong> {app.message}</p>
          <p><strong>Resume:</strong> {app.resume_url || 'N/A'}</p>
          <EmployerReply applicationId={app.id.toString()} />
        </div>
      ))}
    </div>
  );
}
