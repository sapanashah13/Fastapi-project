import {
    Routes,
    Route
} from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FoodCalculator from "./pages/FoodCalculator.jsx"
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Summary from "./pages/Summary.jsx";
import CustomSummary from "./pages/CustomSummary";
import ChatPage from "./pages/ChatPage";



function App() {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/>
            <Route path="/dashboard" element={ <ProtectedRoute><Dashboard/> </ProtectedRoute>}/>
            <Route path="/food" element={<ProtectedRoute><FoodCalculator /></ProtectedRoute>} />
            <Route path="/summary" element={<ProtectedRoute><Summary /></ProtectedRoute>}/>
            <Route path="/custom-summary" element={<ProtectedRoute><CustomSummary/></ProtectedRoute>} />
            <Route path="/chatbot" element={<ChatPage />} />

        </Routes>
    );
}

export default App;