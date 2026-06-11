import { useEffect}from "react";
import api from "../services/api.jsx"


function Food() {
    useEffect(() => {
        api.get("/foods/").then(res => {
           console.log(res.data);
        });
    }, []);

    return (
        <h1>Foods</h1>
    );

}
export default Food;