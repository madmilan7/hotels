import Image from "next/image";
import { RoomType } from "../interfaces";
import Link from "next/link";
import { getAvailableRooms } from "../lib/actions";

async function RoomsData({
  searchParams,
}: {
  searchParams: { checkIn: string; checkOut: string; type: string };
}) {
  const response = await getAvailableRooms({
    reqCheckInDate: searchParams.checkIn || "",
    reqCheckOutDate: searchParams.checkOut || "",
    type: searchParams.type || "",
  });

  const rooms: RoomType[] = response.data;

  if (rooms.length === 0) {
    return <div>No rooms found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
      {rooms.map((room) => (
        <Link key={room._id} href={`book-room/${room._id}`}>
          <div className="flex flex-col gap-2 border border-gray-200 overflow-hidden">
            <Image
              src={room.media[0]}
              alt="room"
              className="w-full h-80 object-cover hover:scale-110 transition duration-500"
              width={1280}
              height={720}
            />

            <div className="px-3 py-2 flex flex-col text-sm gap-2">
              <span>{room.name}</span>
              <span className="text-xs text-gray-500">
                {room.hotel.name} - {room.hotel.address}
              </span>
              <hr className="border-gray-200" />
              <div className="flex justify-between">
                <span>$ {room.rentPerDay} / Per Day</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RoomsData;
