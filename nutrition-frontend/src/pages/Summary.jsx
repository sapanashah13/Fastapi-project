import { useEffect, useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout";
import NutritionCard from "../components/NutritionCard";

function Summary() {

    const [daily, setDaily] = useState(null);
    const [weekly, setWeekly] = useState(null);
    const [monthly, setMonthly] = useState(null);
    const [yearly, setYearly] = useState(null);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            const [d, w, m, y] = await Promise.all([
                api.get("/summary/daily"),
                api.get("/summary/weekly"),
                api.get("/summary/monthly"),
                api.get("/summary/yearly")
            ]);

            setDaily(d.data);
            setWeekly(w.data);
            setMonthly(m.data);
            setYearly(y.data);

        } catch (err) {
            console.log(err);
        }
    };

    const Card = ({ title, data, color }) => (
        <div className="bg-white shadow-lg rounded-2xl p-6 border-l-4"
            style={{ borderColor: color }}
        >
            <h2 className="text-xl font-semibold mb-3">{title}</h2>

            {data ? (
                <div className="space-y-1 text-gray-700">
                    <p>Calories: {data.total_calories}</p>
                    <p>Protein: {data.total_protein}</p>
                    <p>Fat: {data.total_fat}</p>
                    <p>Carbs: {data.total_carbs}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );

    return (
        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                📊 Nutrition Summary
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                <Card title="Daily" data={daily} color="#ff6b6b" />
                <Card title="Weekly" data={weekly} color="#4dabf7" />
                <Card title="Monthly" data={monthly} color="#51cf66" />
                <Card title="Yearly" data={yearly} color="#f59f00" />

            </div>

        </Layout>
    );
}

export default Summary;