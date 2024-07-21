import { connectMongoDB } from "./config/db";
import { getCurrentUserFromMongoDB } from "./lib/actions";

connectMongoDB();

export default async function Home() {
  await getCurrentUserFromMongoDB();

  return <div>HomePage</div>;
}
