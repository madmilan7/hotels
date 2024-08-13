"use client";

import { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { uploadImageToFirebase } from "@/app/utils/image-upload";
import { addHotel, editHotel } from "@/app/lib/actions";
import { useRouter } from "next/navigation";
import Image from "next/image";

function HotelForm({
  type = "add",
  initialData,
}: {
  type: string;
  initialData?: any;
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
        response = await addHotel(values);
      } else {
        response = await editHotel({
          hotelId: initialData._id,
          payload: values,
        });
      }

      if (response.success) {
        message.success(response.message);
        router.push("/admin/hotels");
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
        className="col-span-3"
        label="Name"
        name="name"
        rules={[{ required: true, message: "please input hotel name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Owner"
        name="owner"
        rules={[{ required: true, message: "please input owner name!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Email"
        name="email"
        rules={[{ required: true, message: "please input email!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="col-span-3 lg:col-span-1"
        label="Number"
        name="number"
        rules={[{ required: true, message: "please input number!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        className="col-span-3"
        label="Address"
        name="address"
        rules={[{ required: true, message: "please input address!" }]}
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
                className="object-cover"
                width={64}
                height={64}
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
            setUploadedFiles([...uploadedFiles, file]);
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

export default HotelForm;
