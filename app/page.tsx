import { Suspense } from "react";
import RoomsData from "./_common/rooms-data";
import Spiner from "./components/spiner";
import Filters from "./_common/filters";

export default async function Home({
  searchParams,
}: {
  searchParams: { checkIn: string; checkOut: string; type: string };
}) {
  const suspenseKey = JSON.stringify(searchParams);

  return (
    <div>
      <Filters searchParams={searchParams} />
      <Suspense fallback={<Spiner fullHeight />} key={suspenseKey}>
        <RoomsData searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
