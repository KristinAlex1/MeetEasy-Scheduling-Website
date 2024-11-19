"use server"

import { auth, clerkClient } from "@clerk/nextjs/server"

export async function updateUsername(username){
    const { userId } = auth();
    console.log("Auth userId:", userId);
    if (!userId) {
        console.error("Authentication failed. No userId found.");
        throw new Error("Unauthorized");
    }
    

    const existingUsername = await db.user.findUnique({
        where : {username},
    });

    if(existingUsername && existingUsername.id !== userId){
        throw new Error("Username is already taken");
    }

    await db.user.update({
        where: { clerUserId: userId},
        data: {username},
    });
    await clerkClient.users.updateUser(userId,{
        username,

    });

    return {sucess:true}
}