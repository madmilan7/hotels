import PageTitle from "@/app/components/page-title";
import RoomsForm from "../_common/rooms-form";
import HotelModel from "@/app/models/hotel-model";

async function AddRoomPage() {
  const response = await HotelModel.find();
  const hotels = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <PageTitle title="Add Room" />
      <RoomsForm hotels={hotels} />
    </div>
  );
}

export default AddRoomPage;
