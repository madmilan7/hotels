import { Button, Input } from "antd";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5 h-screen">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">hotels</h1>
      <Button type="primary">Get Started</Button>
      <Button type="default">Get Started</Button>
      <Input placeholder="username" />
    </div>
  );
}
