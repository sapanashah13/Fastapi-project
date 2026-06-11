import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    return (
        <nav>
            <Link to="/dashboard">Dashboard</Link>

            {" | "}

            <Link to="/food">Food Calculator</Link>

            {" | "}
            <Link to="/summary">Summary</Link>
            {" | "}

            <Link to="/custom-summary">Custom Summary</Link>
            {" | "}

            <Link to="/Chatbot">Chat with us</Link>
            {" | "}

            <Link to="/Maintenance">Maintain your body </Link>
            {" | "}


            <button onClick={logout}>
                Logout
            </button>
        </nav>
    );
}

export default Navbar;