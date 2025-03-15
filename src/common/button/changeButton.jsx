import React, { useState } from "react";
import { Button } from "react-bootstrap";

export default function ChangeButton({ handleSubmit, title }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(false); // Ensure state resets before the next click
        setTimeout(() => {
            setClicked(true);
            handleSubmit();

            // Revert back after 1 second
            setTimeout(() => {
                setClicked(false);
            }, 1000);
        }, 10); // Small delay to ensure re-triggering
    };

    return (
        <Button 
            type="submit"
            variant="success"
            style={{
                borderRadius: "10px",
                padding: "10px 24px",
                height: "40px",
                backgroundColor: "#FFFFFF", // Change bg on click
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "15.4px",
                letterSpacing: "0.32px",
                border: "2px solid #229C47",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                color:  "#229C47", // Change text color on click
                transition: "background-color 0.3s ease-in-out, transform 0.1s ease-in-out", // Smooth effect
                transform: clicked ? "scale(0.95)" : "scale(1)", // Button press effect
     
            }}
            onClick={handleClick}

        >
            {title}
        </Button>


    );
}
