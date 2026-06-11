import { useState } from "react";

import api from "../services/api.jsx";

import { useNavigate }
from "react-router-dom";

function Login() {

    const navigate =
        useNavigate();

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleLogin =
        async () => {

            try {

                const response =
                    await api.post(
                        "/auth/login",
                        {
                            email,
                            password
                        }
                    );

                localStorage.setItem(
                    "token",
                    response.data.access_token
                );

                navigate(
                    "/dashboard"
                );

            }

     catch (error) {
    console.log("Error:", error);
    console.log("Message:", error.message);

    alert(error.message);
}
}

    return (

        <div>

            <h1>
                Login
            </h1>

            <input
                placeholder="Email"
                value={email}
                onChange={(e) =>
                    setEmail(
                        e.target.value
                    )
                }
            />

            <br />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) =>
                    setPassword(
                        e.target.value
                    )
                }
            />

            <br />

            <button
                onClick={
                    handleLogin
                }
            >
                Login
            </button>

        </div>
    );
}

export default Login;