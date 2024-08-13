"use client";

import { RoomType } from "@/app/interfaces";
import { Button, Form, Input } from "antd";
import { useState } from "react";

function CheckOut({ room }: { room: RoomType }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  return (
    <div className="p-5 border border-gray-300">
      <Form layout="vertical" className="flex flex-col gap-5 text-gray-500">
        <Form.Item label="Check In">
          <Input type="date" />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input type="date" />
        </Form.Item>

        <Button type="primary" className="w-full">Check Availabilty</Button>
      </Form>
    </div>
  );
}

export default CheckOut;
