import React from "react";
import { Button } from "antd";
import { UserType } from "@/app/interfaces";
import ProjectTitle from "./project-title";
import UserInfo from "./user-info";

function Header({ loggedinUserData }: { loggedinUserData: UserType | null }) {
  if (!loggedinUserData) {
    return (
      <div className="flex justify-between items-center">
        <ProjectTitle />
        <Button type="link">Sign In</Button>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center lg:mx-20 border border-t-0 border-black">
      <ProjectTitle />
      <UserInfo loggedinUserData={loggedinUserData} />
    </div>
  );
}

export default Header;
