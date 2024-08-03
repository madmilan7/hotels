"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { uploadImageToFirebase } from "@/app/utils/image-upload";
import { addRoom, editRoom } from "@/app/lib/actions";
import { Button, Form, Input, message, Select, Upload } from "antd";
import { HotelType } from "@/app/interfaces";

function RoomsForm({
  type = "add",
  initialData,
  hotels,
}: {
  type?: string;
  initialData?: any;
  hotels: HotelType[];
}) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [existingMedia, setExistingMedia] = useState<string[]>(
    initialData?.media || []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const newUrls = await uploadImageToFirebase(uploadedFiles);
      values.media = [...existingMedia, ...newUrls];
      let response: any = null;
      if (type === "add") {
        response = await addRoom(values);
      } else {
        response = await editRoom({
          roomId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/rooms");
      }

      if (!response.success) {
        message.error(response.error);
      }
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      layout="vertical"
      className="grid grid-cols-3 mt-5 gap-x-5"
      onFinish={onFinish}
      initialValues={initialData}
    >
      <Form.Item
        label="Hotel"
        name="hotel"
        rules={[{ required: true, message: "please select a hotel" }]}
      >
        <Select>
          {hotels.map((hotel) => (
            <Select.Option key={hotel._id}>{hotel.name}</Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Name is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Room Number"
        name="roomNumber"
        rules={[{ required: true, message: "Room Number is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Type"
        name="type"
        rules={[{ required: true, message: "Type is required" }]}
      >
        <Select>
          <Select.Option value="Delux">Delux</Select.Option>
          <Select.Option value="Premium">Premium</Select.Option>
          <Select.Option value="Standard">Standard</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Bedrooms"
        name="bedrooms"
        rules={[{ required: true, message: "Bedrooms is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Rent Per Day"
        name="rentPerDay"
        rules={[{ required: true, message: "Rent Per Day is required" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="col-span-3"
        label="Amenities"
        name="amenities"
        rules={[{ required: true, message: "Amenities is required" }]}
      >
        <Input.TextArea />
      </Form.Item>

      <div className="col-span-3 flex gap-5">
        <div className="flex gap-5">
          {existingMedia.map((media: any, index: number) => (
            <div
              key={index}
              className="flex flex-col border rounded-sm p-3 items-center gap-5"
            >
              <Image
                src={media}
                alt="media"
                className="h-16 w-16 object-cover"
              />
              <span
                className="text-gray-500 text-sm underline cursor-pointer"
                onClick={() =>
                  setExistingMedia(
                    existingMedia.filter(
                      (item: string, idx: number) => idx !== index
                    )
                  )
                }
              >
                Remove
              </span>
            </div>
          ))}
        </div>

        <Upload
          listType="picture-card"
          beforeUpload={(file) => {
            setUploadedFiles((prev) => [...prev, file]);
            return false;
          }}
          multiple
        >
          <span className="text-xs text-gray-500 p-3">Upload Media</span>
        </Upload>
      </div>

      <div className="flex justify-end col-span-3 gap-5">
        <Button disabled={loading} onClick={() => router.push("/admin/hotels")}>
          Cancel
        </Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          {type === "add" ? "Add" : "Update"}
        </Button>
      </div>
    </Form>
  );
}

export default RoomsForm;
