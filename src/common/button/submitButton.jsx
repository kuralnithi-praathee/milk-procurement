import React from "react";
import { Button } from "react-bootstrap";

export default function SubmitButton({ handleSubmit,title }) {
    return (
        <Button
            type="submit"
            variant="success"
            style={{
                borderRadius: "40px",
                padding: "10px 24px",
                height: "40px",
                backgroundColor: "#229C47",
                fontSize: "18px",
                fontWeight: "600",
                lineHeight: "15.4px",
                letterSpacing: "0.32px",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                width:"150px",
                textWrap:"nowrap"

            }}
            onClick={handleSubmit}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1E8C40")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#229C47")}
        >
            {title}
        </Button>
    );
}
