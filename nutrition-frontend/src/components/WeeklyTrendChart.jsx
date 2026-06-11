import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

function WeeklyTrendChart({ data }) {

    const safeData = Array.isArray(data) ? data : [];

    if (safeData.length === 0) {
        return <p>No trend data available</p>;
    }

    return (
        <div>
            <h2>Weekly Nutrition Trend</h2>

            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={safeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="calories"
                        stroke="#ff6b6b"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
export default WeeklyTrendChart;