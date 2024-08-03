import PageTitle from "@/app/components/page-title";
import HotelModel from "@/app/models/hotel-model";
import RoomModel from "@/app/models/room-model";
import RoomsForm from "../../_common/rooms-form";

async function EditRoomPage({ params }: { params: { id: string } }) {
  const response = await RoomModel.findById(params.id);
  const room = JSON.parse(JSON.stringify(response));

  const hotelsResponse = await HotelModel.find();
  const hotels = JSON.parse(JSON.stringify(hotelsResponse));

  return (
    <div>
      <PageTitle title="Edit Room" />
      <RoomsForm initialData={room} type="edit" hotels={hotels} />
    </div>
  );
}

export default EditRoomPage;
