"use client";

import React from "react";
import { BarLoader } from "react-spinners";

// Mock User for Testing (Replace with `useUser` after testing)
const useMockUser = () => {
    const [isLoaded, setIsLoaded] = React.useState(false);

    React.useEffect(() => {
        setTimeout(() => setIsLoaded(true), 3000); // Simulate delay
    }, []);

    return { isLoaded };
};

const AppLayout = ({ children }) => {
    const { isLoaded } = useMockUser(); // Replace with `useUser` for production

    console.log("isLoaded:", isLoaded);

    return (
        <>
            {!isLoaded ? (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        zIndex: 1000,
                        backgroundColor: "white", // Optional to test visibility
                    }}
                >
                    <BarLoader width={"100%"} color="#36d7b7" />
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default AppLayout;
