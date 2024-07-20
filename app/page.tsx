import { connectMongoDB } from "./config/db";
import { UserType } from "./interfaces";
import { getCurrentUserFromMongoDB } from "./lib/actions";

connectMongoDB();

export default async function Home() {
  const response = await getCurrentUserFromMongoDB();
  let mongoUser: UserType | null = null;
  if (response.success) {
    mongoUser = response.data;
  }

  let userId = "";
  let name = "";
  let email = "";

  if (mongoUser) {
    userId = mongoUser.userId;
    name = mongoUser.name;
    email = mongoUser.email;
  }

  return (
    <div className="text-sm">
      <h1 className="text-3xl text-gray-500 font-bold uppercase">hotels</h1>
      <h1>user id: {userId}</h1>
      <h1>name: {name}</h1>
      <h1>email: {email}</h1>
    </div>
  );
}
