from sqlalchemy.orm import Session
from dal import food_dal
from dal.Timelaps_dal import save_timelaps

def calculate_nutrition(db: Session,request):

 results = []
 total_calories = 0
 total_protein = 0
 total_fat = 0
 total_carbs = 0

 for item in request.items:


  name = item.name.strip().lower()
  gm = item.weight_in_gram/ 100

  result = food_dal.search_food(db, name)

 # 3. Check if the database returned a record
  if result:
   #Return the details as a JSON response


   calories = result.calories * gm
   protein = result.protein * gm
   fat = result.fat * gm
   carbs = result.carbs * gm


   #add totals

   total_calories += calories
   total_protein += protein
   total_fat += fat
   total_carbs += carbs

   results.append({
           "name": result.name,
           "calories": calories,
           "protein": protein,
           "fat": fat,
           "carbs": carbs
   })


  else:
   # Return a proper 404 HTTP error if not found
     results.append({
      "name": item.name,
      "error":"Not found"
     })
#Save once after all calculation
 save_timelaps(
     db=db,
     food_name="Combined Foods",
     total_calories=total_calories,
     total_protein=total_protein,
     total_fat=total_fat,
     total_carbs=total_carbs
 )

 return {
    "status": "Success",
    "data": results,
  # Total nutrition
    "total_nutrition": {
    "total_calories": round(total_calories,2),
    "total_protein": round(total_protein,2),
    "total_fat": round(total_fat,2),
    "total_carbs": round(total_carbs,2)
  }
 }





