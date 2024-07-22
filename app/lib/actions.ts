"use server";

import { currentUser } from "@clerk/nextjs/server";
import userModel from "../models/user-model";
import { connectMongoDB } from "../config/db";
import HotelModel from "../models/hotel-model";
import { revalidatePath } from "next/cache";

connectMongoDB();

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
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message,
    };
  }
};
