// UserProfile.jsx
"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

const UserProfile = () => {
  const { user } = useUser();

  useEffect(() => {
    if (user && !user.username) {
      const username = `${user.firstName}-${user.lastName}-${user.id.slice(-4)}`;

      user.update({ username })
        .then(() => console.log("Updated user with username:", username))
        .catch(error => console.error("Error updating username:", error));
    }
  }, [user]);

  return (
    <div>
      Welcome, {user ? user.firstName : "Guest"}!
      {user && user.username && <p>Your username is: {user.username}</p>}
    </div>
  );
};

export default UserProfile;
