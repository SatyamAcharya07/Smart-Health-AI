from fastapi import APIRouter
from app.database import db
from app.services.firestore_utils import delete_collection
import pandas as pd

router = APIRouter(
    tags=["Database Seeder"]
)


@router.post("/seed")
def seed_database():

    # -----------------------------------
    # Clear Existing Database
    # -----------------------------------

    delete_collection(
        db.collection("health_centers")
    )

    # -----------------------------------
    # Read Excel Files
    # -----------------------------------

    centers_df = pd.read_excel(
        "data/health_centers.xlsx"
    )

    medicines_df = pd.read_excel(
        "data/medicines.xlsx"
    )

    beds_df = pd.read_excel(
        "data/beds.xlsx"
    )

    # -----------------------------------
    # Health Centers
    # -----------------------------------

    for _, row in centers_df.iterrows():

        db.collection("health_centers")\
            .document(row["center_id"])\
            .set({

                "center_id": row["center_id"],
                "name": row["name"],
                "district": row["district"],
                "address": row["address"]

            })

    # -----------------------------------
    # Medicines
    # -----------------------------------

    for _, row in medicines_df.iterrows():

        db.collection("health_centers")\
            .document(row["center_id"])\
            .collection("medicines")\
            .document(row["medicine_name"])\
            .set({

                "medicine_name": row["medicine_name"],
                "current_stock": int(row["current_stock"]),
                "minimum_stock": int(row["minimum_stock"]),
                "daily_usage": int(row["daily_usage"]),
                "expiry_date": str(row["expiry_date"])[:10]

            })

    # -----------------------------------
    # Beds
    # -----------------------------------

    for _, row in beds_df.iterrows():

        db.collection("health_centers")\
            .document(row["center_id"])\
            .collection("beds")\
            .document("bed_info")\
            .set({

                "total_beds": int(row["total_beds"]),
                "occupied_beds": int(row["occupied_beds"]),
                "available_beds": int(row["available_beds"])

            })

    return {

        "message": "Database seeded successfully."

    }