"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Header from "./header";
import { UserType } from "@/app/interfaces";
import { getCurrentUserFromMongoDB } from "@/app/lib/actions";
import Spiner from "@/app/components/spiner";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [loggedinUserData, setLoggedinUserData] = useState<UserType | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const isAuthRoute = pathname === "/sign-in" || pathname === "sign-up";

  const getUserData = async () => {
    try {
      const response = await getCurrentUserFromMongoDB();
      if (response.success) {
        setLoggedinUserData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loggedinUserData && !isAuthRoute) {
      getUserData();
    }
  });

  if (isAuthRoute) {
    return <div>{children}</div>;
  }

  if (loading) {
    return <Spiner fullHeight />;
  }

  return (
    <div>
      <Header loggedinUserData={loggedinUserData} />
      <div className="mx-5 lg:mx-20 mt-5">{children}</div>
    </div>
  );
}

export default LayoutProvider;
