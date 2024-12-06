import { useEffect, useState } from "react";
import { userStore } from "./user.store";
import { supabase } from "../supabase/index";

export default function AuthSubscriber() {
  const { user, setUser } = userStore();

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      session?.user && setUser(session?.user);
    });
    const { subscription } = data;
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user;
      if (!user) {
        return;
      }

      user && setUser(user);
    });

    return () => {
      subscription && subscription.unsubscribe();
    };
  }, []);

  return null;
}
