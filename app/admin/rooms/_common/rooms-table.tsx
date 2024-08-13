"use client";

import React, { useState } from "react";
import { RoomType } from "@/app/interfaces";
import { message, Table } from "antd";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { deleteRoom } from "@/app/lib/actions";

function RoomsTable({ rooms }: { rooms: RoomType[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await deleteRoom(roomId);
      if (response.success) {
        message.success(response.message);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Hotel",
      dataIndex: "hotel",
      key: "hotel",
      render: (text: any, record: RoomType) => record.hotel?.name,
    },
    { title: "Room Number", dataIndex: "roomNumber", key: "roomNumber" },
    { title: "Type", dataIndex: "type", key: "type" },
    { title: "Rent Per Day", dataIndex: "rentPerDay", key: "rentPerDay" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: RoomType) =>
        dayjs(record.createdAt).format("MM-DD-YYYY hh mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (record: RoomType) => (
        <div className="flex items-center gap-5">
          <Trash2
            size={18}
            className="cursor-pointer text-red-600"
            onClick={() => onDelete(record._id)}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-600"
            onClick={() => router.push(`/admin/rooms/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table loading={loading} dataSource={rooms} columns={columns} />
    </div>
  );
}

export default RoomsTable;
