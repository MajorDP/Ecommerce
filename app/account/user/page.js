import UserAccountInfo from "@/app/_components/UserAccountInfo";
import { getUserInfo } from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

async function Page() {
  const userData = await getUserInfo(0);
  const tempUserData = {
    id: 0,
    email: "asura@abv.bg",
    username: "asura",
    password: "123a",
    createdAt: "12-7-2024",
  };
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserAccountInfo userData={userData} />;
    </Suspense>
  );
}

export default Page;
