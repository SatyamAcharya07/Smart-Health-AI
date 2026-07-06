from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.medicine import Medicine

router = APIRouter(
    prefix="/health-centers",
    tags=["Medicines"]
)

# -------------------------------------------------
# Add Medicine
# -------------------------------------------------

@router.post("/{center_id}/medicines")
def add_medicine(center_id: str, medicine: Medicine):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    db.collection("health_centers")\
        .document(center_id)\
        .collection("medicines")\
        .document(medicine.medicine_name)\
        .set(medicine.model_dump(mode="json"))

    return {
        "message": "Medicine added successfully",
        "data": medicine.model_dump(mode="json")
    }


# -------------------------------------------------
# Get Medicines
# -------------------------------------------------

@router.get("/{center_id}/medicines")
def get_medicines(center_id: str):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    docs = (
        db.collection("health_centers")
        .document(center_id)
        .collection("medicines")
        .stream()
    )

    medicines = []

    for doc in docs:
        medicines.append(doc.to_dict())

    return medicines


# -------------------------------------------------
# Update Medicine
# -------------------------------------------------

@router.put("/{center_id}/medicines/{medicine_name}")
def update_medicine(
    center_id: str,
    medicine_name: str,
    medicine: Medicine
):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    medicine_ref = (
        db.collection("health_centers")
        .document(center_id)
        .collection("medicines")
        .document(medicine_name)
    )

    if not medicine_ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail="Medicine not found"
        )

    medicine_ref.update(
        medicine.model_dump(mode="json")
    )

    return {
        "message": "Medicine updated successfully",
        "data": medicine.model_dump(mode="json")
    }


# -------------------------------------------------
# Delete Medicine
# -------------------------------------------------

@router.delete("/{center_id}/medicines/{medicine_name}")
def delete_medicine(
    center_id: str,
    medicine_name: str
):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    medicine_ref = (
        db.collection("health_centers")
        .document(center_id)
        .collection("medicines")
        .document(medicine_name)
    )

    if not medicine_ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail="Medicine not found"
        )

    medicine_ref.delete()

    return {
        "message": "Medicine deleted successfully"
    }