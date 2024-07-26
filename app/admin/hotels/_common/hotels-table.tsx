"use client";

import React, { useState } from "react";
import { HotelType } from "@/app/interfaces";
import { message, Table } from "antd";
import { Edit, PlusSquare, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { deleteHotel } from "@/app/lib/actions";

function HotelsTable({ hotels }: { hotels: HotelType[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onDelete = async (hotelId: string) => {
    try {
      setLoading(true);
      const response = await deleteHotel(hotelId);
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
    { title: "Owner", dataIndex: "owner", key: "owner" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "number", key: "number" },
    { title: "Address", dataIndex: "address", key: "address" },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (record: HotelType) =>
        dayjs(record.createdAt).format("MM-DD-YYYY hh mm A"),
    },
    {
      title: "Action",
      key: "action",
      render: (record: HotelType) => (
        <div className="flex items-center gap-5">
          <Trash2
            size={18}
            className="cursor-pointer text-red-600"
            onClick={() => onDelete(record._id)}
          />
          <Edit
            size={18}
            className="cursor-pointer text-yellow-600"
            onClick={() => router.push(`/admin/hotels/edit/${record._id}`)}
          />
          <PlusSquare size={18} className="cursor-pointer text-green-600" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <Table loading={loading} dataSource={hotels} columns={columns} />
    </div>
  );
}

export default HotelsTable;
