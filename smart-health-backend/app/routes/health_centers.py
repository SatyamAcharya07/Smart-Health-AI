from fastapi import APIRouter, HTTPException
from app.database import db
from app.models.health_center import HealthCenter

router = APIRouter(
    prefix="/health-centers",
    tags=["Health Centers"]
)

# -------------------------------------------------
# Add Health Center
# -------------------------------------------------

@router.post("/")
def add_health_center(center: HealthCenter):

    db.collection("health_centers") \
        .document(center.center_id) \
        .set(center.model_dump())

    return {
        "message": "Health Center added successfully",
        "data": center.model_dump()
    }


# -------------------------------------------------
# Get All Health Centers
# -------------------------------------------------

@router.get("/")
def get_health_centers():

    docs = db.collection("health_centers").stream()

    centers = []

    for doc in docs:
        centers.append(doc.to_dict())

    return centers


# -------------------------------------------------
# Get One Health Center
# -------------------------------------------------

@router.get("/{center_id}")
def get_health_center(center_id: str):

    doc = db.collection("health_centers") \
        .document(center_id) \
        .get()

    if not doc.exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    return doc.to_dict()


# -------------------------------------------------
# Update Health Center
# -------------------------------------------------

@router.put("/{center_id}")
def update_health_center(
    center_id: str,
    center: HealthCenter
):

    ref = db.collection("health_centers") \
        .document(center_id)

    if not ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    ref.update(center.model_dump())

    return {
        "message": "Health Center updated successfully",
        "data": center.model_dump()
    }


# -------------------------------------------------
# Delete Health Center
# -------------------------------------------------

@router.delete("/{center_id}")
def delete_health_center(center_id: str):

    ref = db.collection("health_centers") \
        .document(center_id)

    if not ref.get().exists:
        raise HTTPException(
            status_code=404,
            detail="Health Center not found"
        )

    ref.delete()

    return {
        "message": "Health Center deleted successfully"
    }