from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.bed import Bed

router = APIRouter(
    prefix="/health-centers",
    tags=["Beds"]
)

# -------------------------------------------------
# Add Bed Information
# -------------------------------------------------

@router.post("/{center_id}/beds")
def add_beds(center_id: str, bed: Bed):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    db.collection("health_centers")\
        .document(center_id)\
        .collection("beds")\
        .document("bed_info")\
        .set(bed.model_dump())

    return {
        "message": "Bed information added successfully"
    }


# -------------------------------------------------
# Get Bed Information
# -------------------------------------------------

@router.get("/{center_id}/beds")
def get_beds(center_id: str):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    doc = (
        db.collection("health_centers")
        .document(center_id)
        .collection("beds")
        .document("bed_info")
        .get()
    )

    if not doc.exists:
        raise HTTPException(
            status_code=404,
            detail="Bed information not found"
        )

    return doc.to_dict()


# -------------------------------------------------
# Update Bed Information
# -------------------------------------------------

@router.put("/{center_id}/beds")
def update_beds(center_id: str, bed: Bed):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    db.collection("health_centers")\
        .document(center_id)\
        .collection("beds")\
        .document("bed_info")\
        .update(bed.model_dump())

    return {
        "message": "Bed information updated successfully"
    }


# -------------------------------------------------
# Delete Bed Information
# -------------------------------------------------

@router.delete("/{center_id}/beds")
def delete_beds(center_id: str):

    center = db.collection("health_centers").document(center_id).get()

    if not center.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    bed_ref = (
        db.collection("health_centers")
        .document(center_id)
        .collection("beds")
        .document("bed_info")
    )

    if not bed_ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail="Bed information not found"
        )

    bed_ref.delete()

    return {
        "message": "Bed information deleted successfully"
    }