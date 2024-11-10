import { clerkClient, currentUser } from "@clerk/nextjs/server";
import { db } from "./prisma";

console.log("checkUser function called");


export const checkUser = async () => {
    const user = await currentUser();
    console.log("Clerk Current User Data:", user); 

    if(!user){
        return null;
    }

    try {
        const loggedInUser = await db?.user.findUnique({
            where:{
                clerkUserId: user.id,
            },
        });

        if(loggedInUser){
            return loggedInUser;
        }

        const name = `${user.firstName}  ${user.lastName}`;
        console.log("Clerk Users Object:", clerkClient.users);


        await clerkClient.users.updateUser(user.id, {
            username: name.split(" ").join("-") + user.id.slice(-4),
        });


        const newUser = await db.user.create({
            data:{
                clerkUserId: user.id,
                name,
                imageUrl:user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                username: name.split(" ").join("-") + user.id.slice(-4),
            },
        });
        
        return newUser;

    } catch (error) {
        console.log(error);

    }
}