import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Drawer } from "antd";
import { UserType } from "@/app/interfaces";
import { BedDouble, GitGraph, Home, Hotel, List, User } from "lucide-react";
import { useAuth } from "@clerk/nextjs";

interface MenuItemsType {
  name: string;
  icon: React.JSX.Element;
  onclick: () => void;
  isActive: boolean;
}

function Sidebar({
  showSidebar,
  setShowSidebar,
  loggedinUserData,
}: {
  showSidebar: boolean;
  setShowSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  loggedinUserData: UserType | null;
}) {
  const router = useRouter();
  const pathName = usePathname();
  const { signOut } = useAuth();

  const onLogout = async () => {
    await signOut();
    setShowSidebar(false);
    router.push("/sign-in");
  };

  const iconSize = 18;

  const userMenuItems: MenuItemsType[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathName === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/user/bookings"),
      isActive: pathName === "/user/bookings",
    },
    {
      name: "Profile",
      icon: <User size={iconSize} />,
      onclick: () => router.push("/user/profile"),
      isActive: pathName === "/user/profile",
    },
  ];
  const adminMenuItems: MenuItemsType[] = [
    {
      name: "Home",
      icon: <Home size={iconSize} />,
      onclick: () => router.push("/"),
      isActive: pathName === "/",
    },
    {
      name: "Bookings",
      icon: <List size={iconSize} />,
      onclick: () => router.push("/admin/bookings"),
      isActive: pathName === "/admin/bookings",
    },
    {
      name: "Hotels",
      icon: <Hotel size={iconSize} />,
      onclick: () => router.push("/admin/hotels"),
      isActive: pathName === "/admin/hotels",
    },
    {
      name: "Rooms",
      icon: <BedDouble size={iconSize} />,
      onclick: () => router.push("/admin/rooms"),
      isActive: pathName === "/admin/rooms",
    },
    {
      name: "Reports",
      icon: <GitGraph size={iconSize} />,
      onclick: () => router.push("/admin/reports"),
      isActive: pathName === "/admin/reports",
    },
  ];

  const menuItemsToShow: MenuItemsType[] = loggedinUserData?.isAdmin
    ? adminMenuItems
    : userMenuItems;

  return (
    <Drawer open={showSidebar} onClose={() => setShowSidebar(false)} closable>
      <div className="flex flex-col gap-14">
        {menuItemsToShow.map((item, index) => (
          <div
            key={index}
            className={`flex gap-4 items-center text-gray-700 cursor-pointer px-7 py-3 rounded-sm
                ${item.isActive ? "bg-black text-white" : ""}`}
            onClick={() => {
              item.onclick();
              setShowSidebar(false);
            }}
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
        <span
          className="text-center cursor-pointer text-red-500 font-semibold"
          onClick={onLogout}
        >
          Logout
        </span>
      </div>
    </Drawer>
  );
}

export default Sidebar;
