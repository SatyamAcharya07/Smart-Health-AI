from fastapi import APIRouter
from app.database import db
from app.services.gemini import generate_recommendation

router = APIRouter(
    tags=["Dashboard"]
)


@router.get("/dashboard")
def get_dashboard():

    centers = list(
        db.collection("health_centers").stream()
    )

    total_health_centers = len(centers)

    total_medicines = 0
    available_beds = 0
    critical_alerts = 0

    recommendations = []

    for center in centers:

        center_data = center.to_dict()
        center_id = center_data["center_id"]
        center_name = center_data["name"]

        # -----------------------------
        # Medicines
        # -----------------------------

        medicines = list(
            db.collection("health_centers")
            .document(center_id)
            .collection("medicines")
            .stream()
        )

        total_medicines += len(medicines)

        for med in medicines:

            medicine = med.to_dict()

            if medicine["current_stock"] < medicine["minimum_stock"]:

                critical_alerts += 1

                recommendations.append({

                    "medicine": medicine["medicine_name"],

            "from": "District Warehouse",

            "to": center_name,

            "quantity":
                medicine["minimum_stock"] - medicine["current_stock"]

                })

        # -----------------------------
        # Beds
        # -----------------------------

        bed_doc = (
            db.collection("health_centers")
            .document(center_id)
            .collection("beds")
            .document("bed_info")
            .get()
        )

        if bed_doc.exists:

            bed = bed_doc.to_dict()

            available_beds += bed["available_beds"]

    ai_summary = generate_recommendation(recommendations)

    return {

        "total_health_centers": total_health_centers,

        "total_medicines": total_medicines,

        "available_beds": available_beds,

        "critical_alerts": critical_alerts,

        "recommendations": recommendations,

        "ai_summary": ai_summary

    }