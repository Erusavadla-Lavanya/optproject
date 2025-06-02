import { supabase } from '@/lib/supabase';
import { useState } from 'react';


interface Props {
  jobId: string;
  freelancerId: string;
}

export default function ApplicationForm({ jobId, freelancerId }: Props) {
  const [message, setMessage] = useState('');
  const [reply, setReply] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.from('job_applications').insert([
      {
        job_id: jobId,
        freelancer_id: freelancerId,
        message,
      },
    ]);

    if (error) console.error(error);
    else console.log('Application submitted');
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button type="submit">Submit Application</button>
      {reply && <p>Employer reply: {reply}</p>}
    </form>
  );
}