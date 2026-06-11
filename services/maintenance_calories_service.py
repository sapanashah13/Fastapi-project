from dal import maintenance_calories_dal


def create_maintenance_service(
    db,
    request,
    current_user
):
    record =  maintenance_calories_dal.create_maintenance_record(
        db,
        request,
        current_user
    )
    height_m = record.height / 100
    bmi = round(
        record.weight / (height_m ** 2),
        2
    )
    if bmi < 18.5:
        bmi_category = "Underweight"
        message = (
            "Your BMI falls in the underweight range. "
            "Consider consulting a healthcare professional or nutritionist "
            "to ensure you are meeting your nutritional needs and maintaining a healthy weight."
        )
    elif bmi < 25:
        bmi_category = "Normal Weight"
        message = (
            "Your BMI falls within the normal weight range. "
            "Maintain a balanced diet and regular physical activity "
            "to support your overall health."
        )
    elif bmi < 30:
        bmi_category = "Overweight"
        message = (
            "Your BMI falls in the overweight range. "
            "Consider reviewing your nutrition and exercise habits "
            "to support a healthy weight and reduce future health risks."
        )
    else:
        bmi_category = "Obese"
        message = (
            "Your BMI falls in the obese range. "
            "Consider consulting a healthcare professional and reviewing "
            "your nutrition and activity habits."
        )

    if record.gender.lower() == "male":
        bmr = (
            10 * record.weight
            + 6.25 * record.height
            - 5 * record.age
            + 5
        )

    else:
        bmr = (
            10 * record.weight
            + 6.25 * record.height
            - 5 * record.age
            - 161
        )

    factors = {
        "sedentary": 1.2,
        "light": 1.375,
        "moderate": 1.55,
        "active": 1.725,
        "very_active": 1.9
    }

    maintenance_calories = round(
        bmr * factors[record.activity_level.lower()],2
    )

    return {
        "id": record.id,
        "email": record.email,
        "weight": record.weight,
        "height": record.height,
        "age": record.age,
        "gender": record.gender,
        "activity_level": record.activity_level,
        "bmi":bmi,
        "bmi_category": bmi_category,
        "message": message,
        "maintenance_calories": maintenance_calories
    }
