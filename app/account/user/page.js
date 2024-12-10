"use client";
import UserAccountInfo from "@/app/_components/UserAccountInfo";
import { getCurrentUser, getUserInfo } from "@/app/_lib/_api/userServices";
import { Suspense, useEffect, useState } from "react";

function Page() {
  const [userData, setUserData] = useState(null);

  console.log(userData);
  useEffect(function () {
    async function getUser() {
      const user = await getCurrentUser();
      const userData = await getUserInfo(user.data.user.id);
      setUserData(userData);
    }

    getUser();
  }, []);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserAccountInfo userData={userData} />;
    </Suspense>
  );
}

export default Page;
