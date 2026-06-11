import { useState } from "react";
import api from "../services/api";

import Layout from "../components/Layout";
import NutritionCard from "../components/NutritionCard";

function CustomSummary() {

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(false);

    const getSummary = async () => {

        if (!fromDate || !toDate) return;

        try {
            setLoading(true);

            const res = await api.get("/summary/custom", {
                params: {
                    from_date: fromDate,
                    to_date: toDate
                }
            });

            setSummary(res.data);

        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>

            <h1 className="text-3xl font-bold mb-6">
                📅 Custom Summary
            </h1>

            <div className="bg-white shadow-lg rounded-2xl p-6 mb-6">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    <input
                        type="date"
                        className="border p-2 rounded-lg"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />

                    <input
                        type="date"
                        className="border p-2 rounded-lg"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />

                </div>

                <button
                    onClick={getSummary}
                    className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl"
                >
                    {loading ? "Loading..." : "Get Summary"}
                </button>

            </div>

            {summary && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                    <NutritionCard title="Calories" value={summary.total_calories} color="#ff6b6b" />
                    <NutritionCard title="Protein" value={summary.total_protein} color="#4dabf7" />
                    <NutritionCard title="Fat" value={summary.total_fat} color="#51cf66" />
                    <NutritionCard title="Carbs" value={summary.total_carbs} color="#f59f00" />

                </div>
            )}

        </Layout>
    );
}

export default CustomSummary;