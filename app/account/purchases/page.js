import UserPurchasesList from "@/app/_components/_account/UserPurchasesList";

export const metadata = {
  title: "Your purchases",
};

function Page() {
  return (
    <div>
      <p className="p-4 bg-gradient-to-r from-slate-500 via-blue-400 to-slate-500 border border-black text-white w-[90%]  sm:w-[50%] rounded-3xl m-auto mt-6 text-center text-sm sm:text-2xl font-semibold shadow-lg">
        Your purchase history
      </p>
      <UserPurchasesList />
    </div>
  );
}

export default Page;
