import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate("/admin");
      }
    });
  }, [navigate]);

  return (
    <div className="container mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
      <div className="bg-card p-6 rounded-lg shadow-lg">
        <SupabaseAuth 
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]}
        />
      </div>
    </div>
  );
};

export default Auth;