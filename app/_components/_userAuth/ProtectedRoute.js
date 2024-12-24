"use client";

import { getCurrentUser } from "@/app/_lib/_api/userServices";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const currentUser = await getCurrentUser();

      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push("/login");
      }
    }

    getUser();
  }, [router]);

  if (!user) {
    return null;
  }

  return <div>{children}</div>;
}

export default ProtectedRoute;
