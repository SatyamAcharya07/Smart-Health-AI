from fastapi import APIRouter
from app.database import db
from app.services.gemini import generate_recommendation

router = APIRouter(
    tags=["Recommendations"]
)


@router.get("/recommendations")
def get_recommendations():

    centers = list(
        db.collection("health_centers").stream()
    )

    medicines = {}

    # -----------------------------------
    # Collect medicine data
    # -----------------------------------

    for center in centers:

        center_data = center.to_dict()

        center_id = center_data["center_id"]
        center_name = center_data["name"]

        docs = (
            db.collection("health_centers")
            .document(center_id)
            .collection("medicines")
            .stream()
        )

        for doc in docs:

            med = doc.to_dict()

            name = med["medicine_name"]

            if name not in medicines:
                medicines[name] = []

            medicines[name].append({

                "center_id": center_id,
                "center_name": center_name,

                "current_stock": med["current_stock"],

                "minimum_stock": med["minimum_stock"],

                "daily_usage": med["daily_usage"]

            })

    recommendations = []

    # -----------------------------------
    # Find shortages and surplus
    # -----------------------------------

    for medicine_name, data in medicines.items():

        shortage = None
        surplus = None

        for item in data:

            if item["current_stock"] < item["minimum_stock"]:
                shortage = item

            if item["current_stock"] > (
                item["minimum_stock"] * 2
            ):
                surplus = item

        if shortage and surplus:

            qty = min(

                surplus["current_stock"]
                - surplus["minimum_stock"],

                shortage["minimum_stock"]
                - shortage["current_stock"]

            )

            recommendations.append({

                "medicine": medicine_name,

                "from": surplus["center_name"],

                "to": shortage["center_name"],

                "quantity": qty

            })

    # -----------------------------------
    # Gemini AI Summary
    # -----------------------------------

    ai_summary = (
    "Monitor medicine shortages and redistribute stock "
    "from nearby centres when required."
)

    return {

        "recommendations": recommendations,

        "ai_summary": ai_summary

    }