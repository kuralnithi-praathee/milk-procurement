import React from "react";
import { Button } from "react-bootstrap";

export default function OutlinedButton({ handleSubmit,title }) {
    return (
        <Button
            type="submit"
            variant="success"
            style={{
                borderRadius: "40px",
                padding: "10px 24px",
                height: "40px",
                backgroundColor: "#ffff",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "15.4px",
                letterSpacing: "0.32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                color:'#229C47',
                border:"2px solid #229C47",
                width:"150px"
            }}
            onClick={handleSubmit}
            // onMouseOver={(e) => (e.target.style.backgroundColor = "#1E8C40")}
            // onMouseOut={(e) => (e.target.style.backgroundColor = "#229C47")}
        >
            {title}
        </Button>
    );
}
