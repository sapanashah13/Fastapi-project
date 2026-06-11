import { useState } from "react";
import api from "../services/api.jsx";
import Navbar from "../components/Navbar";

function FoodCalculator() {
  const [foods, setFoods] = useState([
    { name: "", weight_in_gram: "" }
  ]);

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Add new food row
  const addFood = () => {
    setFoods([...foods, { name: "", weight_in_gram: "" }]);
  };

  // Handle input change
  const handleChange = (index, field, value) => {
    const updatedFoods = [...foods];
    updatedFoods[index][field] = value;
    setFoods(updatedFoods);
  };

  // Remove food row
  const removeFood = (index) => {
    const updatedFoods = foods.filter((_, i) => i !== index);
    setFoods(updatedFoods);
  };

  // API call
  const calculateNutrition = async () => {
    try {
      setLoading(true);

      const res = await api.post("/foods/calculate", { items: foods});

      console.log("API Response:", res.data);

      setResult(res.data); // IMPORTANT FIX

    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <h2>Food Calculator</h2>

      {/* FOOD INPUT SECTION */}
      {foods.map((food, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Food name"
            value={food.name}
            onChange={(e) =>
              handleChange(index, "name", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Weight in grams"
            value={food.weight_in_gram}
            onChange={(e) =>
              handleChange(index, "weight_in_gram", e.target.value)
            }
          />

          <button onClick={() => removeFood(index)}>Remove</button>
        </div>
      ))}

      <button onClick={addFood}>Add Food</button>

      <button onClick={calculateNutrition}>
        {loading ? "Calculating..." : "Calculate"}
      </button>

      {/* RESULT SECTION */}
      {result && (
        <div style={{ marginTop: "20px" }}>
          <h3>Nutrition Result</h3>
          {/* Individual items */}
          {result.data?.map((item, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p><b>Name:</b> {item.name}</p>
              <p>Calories: {item.calories}</p>
              <p>Protein: {item.protein}</p>
              <p>Fat: {item.fat}</p>
              <p>Carbs: {item.carbs}</p>
            </div>
          ))}

          {/* Total nutrition */}
          <h4>Total Nutrition</h4>
          <p>Total Calories: {result.total_nutrition?.total_calories}</p>
          <p>Total Protein: {result.total_nutrition?.total_protein}</p>
          <p>Total Fat: {result.total_nutrition?.total_fat}</p>
          <p>Total Carbs: {result.total_nutrition?.total_carbs}</p>
        </div>
      )}
    </div>
  );
}

export default FoodCalculator;