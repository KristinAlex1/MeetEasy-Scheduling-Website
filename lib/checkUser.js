import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
  try {
    // Fetch the current user from Clerk
    const user = await currentUser();
    console.log("Clerk Current User Data:", user);

    if (!user) {
      console.error("No current user found.");
      return null;
    }

    // Check if the user exists in the database
    const loggedInUser = await db.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (loggedInUser) {
      console.log("User found in the database:", loggedInUser);
      return loggedInUser;
    }

    // Generate username based on user's name
    const name = `${user.firstName || "Guest"} ${user.lastName || ""}`.trim();
    const username = `${name.replace(/\s+/g, "-").toLowerCase()}-${user.id.slice(-4)}`;

    // Create a new user in the database
    const newUser = await db.user.create({
      data: {
        clerkUserId: user.id,
        name,
        imageUrl: user.imageUrl || "",
        email: user.emailAddresses[0]?.emailAddress || "",
        username,
      },
    });

    console.log("New User Created in Database:", newUser);
    return newUser;

  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return null;
  }
};
