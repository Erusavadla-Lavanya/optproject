import { supabase } from "@/lib/supabase";
import { useState } from "react";

interface Props {
  applicationId: string;
}

export default function EmployerReply({ applicationId }: Props) {
  const [replyText, setReplyText] = useState("");

  const sendReply = async () => {
    const { data, error } = await supabase
      .from("job_applications")
      .update({ reply_from_employer: replyText })
      .eq("id", applicationId);
    console.log(data, error);

    if (error) console.error("Failed to reply", error);
    else alert("Reply sent!");
  };

  return (
    <div>
      <textarea
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
      />
      <button onClick={sendReply}>Send Reply</button>
    </div>
  );
}
