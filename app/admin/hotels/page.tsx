import LinkButton from "@/app/components/link-button";
import PageTitle from "@/app/components/page-title";
import HotelModel from "@/app/models/hotel-model";
import HotelsTable from "./_common/hotels-table";

async function HotelsPage() {
  const response = await HotelModel.find().sort({ createdAt: -1 });
  const hotels = JSON.parse(JSON.stringify(response));

  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Hotels" />
        <LinkButton title="Add Hotel" path="/admin/hotels/add" />
      </div>
      <HotelsTable hotels={hotels} />
    </div>
  );
}

export default HotelsPage;
