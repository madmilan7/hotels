import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spiner from "./components/spiner";

export default async function Home() {
  return (
    <div>
      <Suspense fallback={<Spiner />}>
        <RoomsData />
      </Suspense>
    </div>
  );
}
