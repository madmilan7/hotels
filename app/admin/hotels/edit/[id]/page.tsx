import PageTitle from "@/app/components/page-title";
import HotelForm from "../../_common/hotel-form";
import HotelModel from "@/app/models/hotel-model";

async function EditHotelPage({ params }: { params: { id: string } }) {
  const hotelId = params.id;
  const response = await HotelModel.findById(hotelId);
  const hotel = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <PageTitle title="Edit Hotel" />
      <HotelForm type="edit" initialData={hotel} />
    </div>
  );
}

export default EditHotelPage;
