import { supabase } from '@/lib/supabase';
import { useEffect, useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';
import ReplyListener from '../components/ReplyListener';


export default function FreelancerDashboard() {
  const [freelancerId, setFreelancerId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      setFreelancerId(data.user?.id || null);
      console.log('Logged in Freelancer ID:', data.user?.id);
    }

    fetchUser();
  }, []);

  if (!freelancerId) return <p>Loading...</p>;

  const jobId = 'your-job-id'; // dynamically pass this

  return (
    <>
      <ApplicationForm jobId={jobId} freelancerId={freelancerId} />
      <ReplyListener freelancerId={freelancerId} />
    </>
  );
}
