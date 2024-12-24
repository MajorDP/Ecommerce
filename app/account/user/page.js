import UserAccountInfo from "@/app/_components/UserAccountInfo";
import { getCurrentUser, getUserInfo } from "@/app/_lib/_api/userServices";

async function Page() {
  return (
    <div>
      <p>aa</p>
      <UserAccountInfo />;
    </div>
  );
}

export default Page;
