"use server";

import { currentUser } from "@clerk/nextjs/server";
import userModel from "../models/user-model";
import { connectMongoDB } from "../config/db";
import HotelModel from "../models/hotel-model";
import { revalidatePath } from "next/cache";
import RoomModel from "../models/room-model";
import BookingModel from "../models/booking-model";
import { BookRoomType } from "../interfaces";
connectMongoDB();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getCurrentUserFromMongoDB = async () => {
  try {
    const currentUserFromClerk = await currentUser();

    // check if user exist in the database return the user data
    const user = await userModel.findOne({ userId: currentUserFromClerk?.id });
    if (user) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(user)),
      };
    }

    // if user does not exist in the database create a new user and retun user data
    const newUser = new userModel({
      name:
        currentUserFromClerk?.firstName + " " + currentUserFromClerk?.lastName,
      userId: currentUserFromClerk?.id,
      email: currentUserFromClerk?.emailAddresses[0].emailAddress,
      profile: currentUserFromClerk?.imageUrl,
      isAdmin: false,
      isActive: true,
    });

    await newUser.save();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newUser)),
    };
  } catch (error) {
    return {
      success: false,
      error: error,
      message: "Error while fetching use data from mongoDB",
    };
  }
};

export const addHotel = async (payload: any) => {
  try {
    const newHotel = new HotelModel(payload);
    await newHotel.save();
    revalidatePath("/admin/hotels");
    return {
      success: true,
      message: "Hotel added successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const editHotel = async ({
  hotelId,
  payload,
}: {
  hotelId: string;
  payload: any;
}) => {
  try {
    await HotelModel.findByIdAndUpdate(hotelId, payload);
    revalidatePath("/admin/hotels");
    return { success: true, message: "Hotel updated successfully!" };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteHotel = async (hotelId: string) => {
  try {
    await HotelModel.findByIdAndDelete(hotelId);
    revalidatePath("/admin/hotels");
    return {
      success: true,
      message: "Hotel deleted successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const addRoom = async (payload: any) => {
  try {
    const newRoom = new RoomModel(payload);
    await newRoom.save();
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room added successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const editRoom = async ({
  roomId,
  payload,
}: {
  roomId: string;
  payload: any;
}) => {
  try {
    await RoomModel.findByIdAndUpdate(roomId, payload);
    revalidatePath("/admin/rooms");
    return { success: true, message: "Room updated successfully!" };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    await RoomModel.findByIdAndDelete(roomId);
    revalidatePath("/admin/rooms");
    return {
      success: true,
      message: "Room deleted successfully!",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const checkRoomAvailability = async ({
  roomId,
  reqCheckInDate,
  reqCheckOutDate,
}: {
  roomId: string;
  reqCheckInDate: string;
  reqCheckOutDate: string;
}) => {
  try {
    const bookSlots = await BookingModel.findOne({
      room: roomId,
      bookingStatus: "Booked",
      $or: [
        {
          checkInDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          checkOutDate: {
            $gte: reqCheckInDate,
            $lte: reqCheckOutDate,
          },
        },
        {
          $and: [
            {
              checkInDate: { $lte: reqCheckInDate },
            },
            { checkOutDate: { $gte: reqCheckOutDate } },
          ],
        },
      ],
    });

    if (bookSlots) {
      return {
        success: false,
      };
    }
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

// Stripe payment
export const getStripeClientSecretKey = async ({
  amount,
}: {
  amount: number;
}) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      description: "Room Booking Payment",
    });

    return {
      success: true,
      data: paymentIntent.client_secret,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const bookRoom = async (payload: BookRoomType) => {
  try {
    const userResponse = await getCurrentUserFromMongoDB();
    payload.user = userResponse.data._id;
    const booking = new BookingModel(payload);
    await booking.save();
    revalidatePath("/user/bookings");
    return {
      success: true,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const cancelBooking = async ({
  bookingId,
  paymentId,
}: {
  bookingId: string;
  paymentId: string;
}) => {
  try {
    // change the status of the booking to cancelled
    await BookingModel.findByIdAndUpdate(bookingId, {
      bookingStatus: "Cancelled",
    });

    // refund the payment
    const refund = await stripe.refunds.create({
      payment_intent: paymentId, 
    });
    if (refund.status !== "successed") {
      return {
        success: false,
        message:
          "Your booking has been cancelled but the refund failed. Please contact support for further assistance.",
      };
    }

    revalidatePath("/user/bookings")
    return {
      success: true,
      message:
        "Your booking has been cancelled and the refund has been processed.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};
