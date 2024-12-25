import Partnership from "@/app/_components/Partnership";
import UserAccountInfo from "@/app/_components/UserAccountInfo";
import { getCurrentUser, getUserInfo } from "@/app/_lib/_api/userServices";
import { Suspense } from "react";

async function Page() {
  return (
    <Suspense>
      <div>
        <Partnership />
        <UserAccountInfo />;
      </div>
    </Suspense>
  );
}

export default Page;
