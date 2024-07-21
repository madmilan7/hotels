import React, { useState } from "react";
import { UserType } from "@/app/interfaces";
import { User } from "lucide-react";
import Sidebar from "./sidebar";

function UserInfo({ loggedinUserData }: { loggedinUserData: UserType | null }) {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);

  return (
    <div className="p-6 lg:border-l border-black">
      <span className="text-gray-500 text-sm flex items-center gap-5">
        {loggedinUserData?.name}
        <User onClick={() => setShowSidebar(!showSidebar)} />
      </span>

      {showSidebar && (
        <Sidebar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          loggedinUserData={loggedinUserData}
        />
      )}
    </div>
  );
}

export default UserInfo;
