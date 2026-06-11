function NutritionCard({ title, value, color }) {
    return (
        <div
            className="bg-white shadow-lg rounded-2xl p-5 border-l-4"
            style={{ borderColor: color }}
        >
            <p className="text-sm text-gray-500">{title}</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
                {value}
            </h2>
        </div>
    );
}

export default NutritionCard;