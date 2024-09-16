import PageTitle from "@/app/components/page-title";
import AdminBookingsTable from "./_common/admin-bookings.table";
import BookingModel from "@/app/models/booking-model";

async function AdminBookingsPage() {
  const bookingsResponse = await BookingModel.find({})
    .populate("hotel")
    .populate("room")
    .populate("user")
    .sort({ createdAt: -1 });

  const bookings = JSON.parse(JSON.stringify(bookingsResponse));

  return (
    <div>
      <PageTitle title="Bookings" />
      <AdminBookingsTable bookings={bookings} />
    </div>
  );
}

export default AdminBookingsPage;
