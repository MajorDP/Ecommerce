"use client";
import { signout } from "@/app/_lib/_api/userServices";

function SignOutButton() {
  return (
    <form action={signout}>
      <button type="submit" className="underline-animation mt-5">
        Log out
      </button>
    </form>
  );
}

export default SignOutButton;
