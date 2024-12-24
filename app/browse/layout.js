import Link from "next/link";
import { signout } from "../_lib/_api/userServices";
import SignOutButton from "../_components/_userAuth/SignOutButton";
import ProtectedRoute from "../_components/_userAuth/ProtectedRoute";

function Layout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}

export default Layout;
