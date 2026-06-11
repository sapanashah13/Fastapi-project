from sqlalchemy import func, extract
from models.timelaps_model import TimeLaps
from datetime import datetime, timedelta, date

def base_query(db):
    return db.query(
        func.sum(TimeLaps.total_calories).label("total_calories"),
        func.sum(TimeLaps.total_protein).label("total_protein"),
        func.sum(TimeLaps.total_fat).label("total_fat"),
        func.sum(TimeLaps.total_carbs).label("total_carbs")
    )

#convert SQL result to dict

def serialize(result):
    if not result:
        return {
            "total_calories": 0,
            "total_protein": 0,
            "total_fat": 0,
            "total_carbs": 0,
        }
    return {
        "total_calories": float(result.total_calories or 0),
        "total_protein": float(result.total_protein or 0),
        "total_fat": float(result.total_fat or 0),
        "total_carbs": float(result.total_carbs or 0),
    }





def get_daily_summary(db):

      result = base_query(db).filter(
        func.date(TimeLaps.created_at) == date.today()
      ).first()
      return serialize(result)




def get_weekly_summary(db):
    today = date.today()
    start_of_week = today - timedelta(days=today.weekday())
    end_of_week = start_of_week + timedelta(days=6)

    result = base_query(db).filter(
        func.date(TimeLaps.created_at)  >= start_of_week,
        func.date(TimeLaps.created_at)  <= end_of_week
    ).first()

    data = serialize(result)
    return {
        "week_start": start_of_week,
        "week_end": end_of_week,
        **data
    }

def get_monthly_summary(db):
    now = datetime.now()

    result = base_query(db).filter(
         extract("month", TimeLaps.created_at) == now.month,
         extract("year", TimeLaps.created_at) == now.year
    ).first()

    data = serialize(result)

    return {
        "month": f"{now.year}.{now.month:02d}",
        **data
    }

def get_yearly_summary(db):

    current_year = datetime.now().year

    result = base_query(db).filter(
        extract("year",TimeLaps.created_at) == current_year
    ).first()

    data= serialize(result)

    return {
        "year": current_year,
        **data
    }

def get_summary_between(
        db,
        from_date,
        to_date,
):
    end_of_day = datetime.combine(
        to_date,
        datetime.max.time()
    )
    result = base_query(db).filter(
        TimeLaps.created_at >= from_date,
        TimeLaps.created_at <= end_of_day
    ).first()

    data = serialize(result)

    return {
        "from_date": from_date,
        "to_date": to_date,
        **data
    }

