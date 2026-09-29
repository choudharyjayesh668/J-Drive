import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        axios.get(
            `${import.meta.env.VITE_API_URL}/verify`
            , {
            withCredentials: true
        })
        .then(() => {
            setAuthenticated(true);
        })
        .catch(() => {
            setAuthenticated(false);
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    if (loading) return (
        <div
            style={{
                minHeight: "100dvh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--canvas-light)",
                color: "var(--text-dark-muted)",
                fontSize: "14px",
                fontWeight: 500,
                letterSpacing: "-0.01em",
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span
                    style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: "var(--accent-primary)",
                        animation: "pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                    }}
                />
                <span>Authenticating session...</span>
            </div>
        </div>
    );

    return authenticated ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;