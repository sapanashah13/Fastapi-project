import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

function NutritionChart({ summary }) {

    const data = [
        {
            name: "Calories",
            value: summary.total_calories
        },
        {
            name: "Protein",
            value: summary.total_protein
        },
        {
            name: "Fat",
            value: summary.total_fat
        },
        {
            name: "Carbs",
            value: summary.total_carbs
        }
    ];

    return (
        <ResponsiveContainer
            width="100%"
            height={300}
        >
            <BarChart data={data}>

                <CartesianGrid />

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar dataKey="value" />

            </BarChart>
        </ResponsiveContainer>
    );
}

export default NutritionChart;