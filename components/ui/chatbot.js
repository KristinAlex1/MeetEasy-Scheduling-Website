import React, { useEffect } from "react";

const Chatbot = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://code.tidio.co/your-chatbot-id.js"; // Replace with your actual Tidio script
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // Cleanup when the component is unmounted
    };
  }, []);

  return null; // The component doesn't render anything to the DOM
};

export default Chatbot;
