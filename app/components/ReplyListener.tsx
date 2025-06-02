import { useEffect, useState } from 'react';

import { RealtimePostgresUpdatePayload } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface Props {
  freelancerId: string;
}

interface JobApplication {
  id: string;
  reply_from_employer: string;
}

export default function ReplyListener({ freelancerId }: Props) {
  const [replies, setReplies] = useState<JobApplication[]>([]);

  useEffect(() => {
    const channel = supabase
      .channel('freelancer-replies')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'job_applications',
          filter: `freelancer_id=eq.${freelancerId}`,
        },
        (payload: RealtimePostgresUpdatePayload<JobApplication>) => {
          console.log('Employer reply received:', payload);
          setReplies((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [freelancerId]);

  return (
    <div>
      <h3>Replies from Employers:</h3>
      <ul>
        {replies.map((r) => (
          <li key={r.id}>{r.reply_from_employer}</li>
        ))}
      </ul>
    </div>
  );
}

