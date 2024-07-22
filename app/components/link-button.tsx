"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "antd";

function LinkButton({ title, path }: { title: string; path: string }) {
  const router = useRouter();

  return <Button onClick={() => router.push(path)}>{title}</Button>;
}

export default LinkButton;
