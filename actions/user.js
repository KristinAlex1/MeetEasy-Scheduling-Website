"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { db } from "../lib/prisma";

export async function updateUsername(username) {
  try {
    // Validate input
    if (!username || typeof username !== "string") {
      console.error("Invalid username provided.");
      throw new Error("Invalid username.");
    }

    // Retrieve authenticated user's details
    const { userId, sessionId } = auth();
    console.log("Auth Details in updateUsername:", { userId, sessionId });

    if (!userId) {
      console.error("Authentication failed. No userId found.");
      throw new Error("Unauthorized");
    }

    // Check if the username already exists in the database
    const existingUsername = await db.user.findUnique({
      where: { username },
    });

    if (existingUsername && existingUsername.clerkUserId !== userId) {
      console.error(`Username "${username}" already taken by another user.`);
      throw new Error("Username is already taken.");
    }

    // Create or update user record in the database
    const updatedUser = await db.user.upsert({
      where: { clerkUserId: userId },
      create: {
        clerkUserId: userId,
        username,
      },
      update: { username },
    });

    console.log("Database user record updated:", updatedUser);

    // Update the username in Clerk
    await clerkClient.users.updateUser(userId, {
      username,
    });

    console.log("Clerk user profile updated with username:", username);

    // Return success response
    return { success: true, username: updatedUser.username };
  } catch (error) {
    // Enhanced error logging for better debugging
    console.error("Error in updateUsername function:", {
      message: error.message,
      stack: error.stack,
    });
    throw new Error(error.message || "An error occurred while updating the username.");
  }
}
