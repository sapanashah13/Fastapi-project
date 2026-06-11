import { useState } from "react";
import { getMaintenanceCalories } from "../services/maintenance";

function MaintenanceCalculator() {
    const [form, setForm] = useState({
        age: "",
        weight: "",
        height: "",
        activity_level: ""
    });

    const [result, setResult] = useState(null);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const res = await getMaintenanceCalories(form);
            setResult(res);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Maintenance Calculator</h2>

            <input name="age" placeholder="Age" onChange={handleChange} />
            <input name="weight" placeholder="Weight" onChange={handleChange} />
            <input name="height" placeholder="Height" onChange={handleChange} />

            <button onClick={handleSubmit}>
                Calculate
            </button>

            {result && (
                <div>
                    <h3>Calories: {result.calories}</h3>
                </div>
            )}
        </div>
    );
}

export default MaintenanceCalculator;