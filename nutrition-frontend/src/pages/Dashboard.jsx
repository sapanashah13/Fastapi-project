import { useEffect, useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout";
import NutritionCard from "../components/NutritionCard";
import NutritionChart from "../components/NutritionChart";
import WeeklyTrendChart from "../components/WeeklyTrendChart";

function Dashboard() {

    const [summary, setSummary] = useState({
        total_calories: 0,
        total_protein: 0,
        total_fat: 0,
        total_carbs: 0
    });

    const [trend, setTrend] = useState([]);

    useEffect(() => {
        fetchSummary();
        fetchTrend();
    }, []);

    const fetchSummary = async () => {
        try {
            const res = await api.get("/summary/daily");
            setSummary({
    total_calories: Number(res.data.total_calories.toFixed(2)),
    total_protein: Number(res.data.total_protein.toFixed(2)),
    total_fat: Number(res.data.total_fat.toFixed(2)),
    total_carbs: Number(res.data.total_carbs.toFixed(2)),
});
        } catch (err) {
            console.log(err);
        }
    };

    const fetchTrend = async () => {
        try {
            const res = await api.get("/summary/daily-records");
            setTrend(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            setTrend([]);
        }
    };

    return (
        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                📊 Nutrition Dashboard
            </h1>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                <NutritionCard title="Calories" value={summary.total_calories} color="#ff6b6b" />
                <NutritionCard title="Protein" value={summary.total_protein} color="#4dabf7" />
                <NutritionCard title="Fat" value={summary.total_fat} color="#51cf66" />
                <NutritionCard title="Carbs" value={summary.total_carbs} color="#f59f00" />

            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">
                <NutritionChart summary={summary} />
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6">
                <WeeklyTrendChart data={trend} />
            </div>

        </Layout>
    );
}

export default Dashboard;