import { useRouter } from "next/navigation";
import React from "react";

function ProjectTitle() {
  const router = useRouter();

  return (
    <div
      className="p-5 text-2xl font-bold lg:border-r border-black cursor-pointer"
      onClick={() => router.push("/")}
    >
      Hotels
    </div>
  );
}

export default ProjectTitle;
