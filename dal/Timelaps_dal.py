from sqlalchemy.orm import Session
from models.timelaps_model import TimeLaps


def save_timelaps(
        db,
        food_name,
        total_calories,
        total_protein,
        total_fat,
        total_carbs,

):
    timelaps = TimeLaps(
        food_name=food_name,

        total_calories=total_calories,
        total_protein=total_protein,
        total_fat=total_fat,
        total_carbs=total_carbs
    )

    db.add(timelaps)
    db.commit()
    db.refresh(timelaps)

    return timelaps

def get_all_timelaps(db:Session):
    return(
        db.query(TimeLaps)
        .order_by(TimeLaps.created_at.desc())
        .all()
    )