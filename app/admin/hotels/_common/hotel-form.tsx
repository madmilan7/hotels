"use client";

import { useState } from "react";
import { Button, Form, Input, message, Upload } from "antd";
import { uploadImageToFirebase } from "@/app/utils/image-upload";
import { addHotel } from "@/app/lib/actions";
import { useRouter } from "next/navigation";

function HotelForm({ type = "add" }: { type: string }) {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      values.media = await uploadImageToFirebase(uploadedFiles);
      let response: any = null;
      if (type === "add") {
        response = await addHotel(values);
      }

      if (response.success) {
        message.success("Hotel Added Successfully");
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

      <div className="col-span-3">
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
        <Button disabled={loading}>Cancel</Button>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </div>
    </Form>
  );
}

export default HotelForm;
