import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export function useUserRole() {
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRole = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        setRole(null);
        setLoading(false);
        return;
      }

      const { data, error: roleError } = await supabase
        .from("login")
        .select("role")
        .eq("id", user.id)
        .single();

      if (roleError || !data) {
        setRole(null);
      } else {
        setRole(data.role);
      }
      setLoading(false);
    };

    fetchRole();
  }, []);

  return { role, loading };
}
