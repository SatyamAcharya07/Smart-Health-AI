def delete_collection(coll_ref, batch_size=100):

    docs = coll_ref.limit(batch_size).stream()

    deleted = 0

    for doc in docs:

        # Delete subcollections first

        for sub in doc.reference.collections():
            delete_collection(sub)

        doc.reference.delete()

        deleted += 1

    if deleted >= batch_size:
        delete_collection(coll_ref, batch_size)