"use client";

import { RoomType } from "@/app/interfaces";
import { checkRoomAvailability } from "@/app/lib/actions";
import { Button, Form, Input, message } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

function CheckOut({ room }: { room: RoomType }) {
  const [checkIn, setCheckIn] = useState<string>("");
  const [checkOut, setCheckOut] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);

  const checkAvailability = async () => {
    try {
      const response = await checkRoomAvailability({
        roomId: room._id,
        reqCheckInDate: checkIn,
        reqCheckOutDate: checkOut,
      });

      if (response.success) {
        setIsAvailable(true);
        message.success("Room is available");
      } else {
        setIsAvailable(false);
        message.success("Room is not available");
      }
    } catch (error: any) {
      message.error(error.message);
    }
  };

  const onBookRoom = () => {};

  useEffect(() => {
    setIsAvailable(false);
  }, [checkIn, checkOut]);

  return (
    <div className="p-5 border border-gray-300">
      <Form layout="vertical" className="flex flex-col gap-5 text-gray-500">
        <Form.Item label="Check In">
          <Input
            type="date"
            onChange={(e) => setCheckIn(e.target.value)}
            value={checkIn}
            min={dayjs().format("YYYY-MM-DD")}
          />
        </Form.Item>

        <Form.Item label="Check Out">
          <Input
            type="date"
            onChange={(e) => setCheckOut(e.target.value)}
            value={checkOut}
            min={dayjs(checkIn).add(1, "day").format("YYYY-MM-DD")}
            disabled={!checkIn}
          />
        </Form.Item>

        <Button
          type="primary"
          className="w-full"
          disabled={!checkIn || !checkOut || isAvailable}
          loading={loading}
          onClick={checkAvailability}
        >
          Check Availability
        </Button>

        {isAvailable && (
          <Button
            type="primary"
            className="w-full"
            loading={loading}
            onClick={onBookRoom}
          >
            Book Your Room
          </Button>
        )}
      </Form>
    </div>
  );
}

export default CheckOut;
