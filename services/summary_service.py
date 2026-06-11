from dal import summary_dal


def get_daily_summary_service(db):
    return summary_dal.get_daily_summary(db)


def get_weekly_summary_service(db):
    return summary_dal.get_weekly_summary(db)


def get_monthly_summary_service(db):
    return summary_dal.get_monthly_summary(db)


def get_yearly_summary_service(db):
    return summary_dal.get_yearly_summary(db)


def get_custom_summary_service(db, from_date, to_date):
    return summary_dal.get_summary_between(
        db,
        from_date,
        to_date
    )


def get_daily_records_service(db):
    return summary_dal.get_daily_summary(db)