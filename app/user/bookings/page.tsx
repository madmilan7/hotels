import PageTitle from "@/app/components/page-title";
import { getCurrentUserFromMongoDB } from "@/app/lib/actions";
import BookingModel from "@/app/models/booking-model";
import React from "react";
import UserBookingsTable from "./_common/user-bookings-table";

async function BookingsPage() {
  const userResponse = await getCurrentUserFromMongoDB();
  const userBookingsResponse = await BookingModel.find({
    user: userResponse.data._id,
  })
    .populate("room")
    .populate("hotel")
    .sort({ createdAt: -1 });
  const userBookings = JSON.parse(JSON.stringify(userBookingsResponse));

  return (
    <div>
      <PageTitle title="My Bookings" />
      <UserBookingsTable bookings={userBookings} />
    </div>
  );
}

export default BookingsPage;
