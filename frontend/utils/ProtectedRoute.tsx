"use client";
import { ReactNode, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { BeatLoader } from "react-spinners";
import verifyAuth from "./verifyAuth";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { authState } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthentication() {
      const adminAuthenticationResult = await verifyAuth("admin");
      if (
        !authState.isAuthenticated ||
        !adminAuthenticationResult.isAuthenticated
      ) {
        console.log(authState.userData?.roles[0]);
        router.push("/dashboard/auth");
      } else {
        setLoading(false);
      }
    }

    checkAuthentication();
  }, []);

  return loading ? (
    <BeatLoader
      loading={loading}
      size={15}
      className="absolute flex flex-col bg-slate-50 rounded-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    />
  ) : (
    children
  );
};

export default ProtectedRoute;
