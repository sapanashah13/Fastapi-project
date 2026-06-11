from sqlalchemy.orm import Session

from dal.Timelaps_dal import get_all_timelaps
from models.timelaps_model import TimeLaps




def fetch_timelaps(db:Session):
   records =get_all_timelaps(db)

   return {
      "status": 200,
      "count": len(records),
      "data": records
   }