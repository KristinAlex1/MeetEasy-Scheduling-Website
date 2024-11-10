import { currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

export const checkUser = async () => {
    const user = await currentUser();
    console.log("Clerk Current User Data:", user);

    if (!user) {
        return null;
    }

    try {
        // Check if the user exists in the database
        const loggedInUser = await db.user.findUnique({
            where: { clerkUserId: user.id },
        });

        if (loggedInUser) {
            return loggedInUser;
        }

        // If not found, create a new user in the database
        const name = `${user.firstName} ${user.lastName}`;
        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                username: name.split(" ").join("-") + user.id.slice(-4),
            },
        });

        console.log("New User Created in Database:", newUser);
        return newUser;

    } catch (error) {
        console.error("Error in checkUser:", error);
        return null;
    }
};
