import { currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  let userId = "";
  let name = "";
  let email = "";

  const cuurentUserData = await currentUser();
  if (cuurentUserData) {
    userId = cuurentUserData.id;
    name = cuurentUserData.firstName + " " + cuurentUserData.lastName;
    email = cuurentUserData.emailAddresses[0].emailAddress;
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
