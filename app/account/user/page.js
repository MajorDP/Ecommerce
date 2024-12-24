import Partnership from "@/app/_components/Partnership";
import UserAccountInfo from "@/app/_components/UserAccountInfo";
import { getCurrentUser, getUserInfo } from "@/app/_lib/_api/userServices";

async function Page() {
  return (
    <div>
      <Partnership />
      <UserAccountInfo />;
    </div>
  );
}

export default Page;
