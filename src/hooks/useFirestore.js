import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const unsub = projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")

      // This method fires a callback function everytime a change occurs inside collection.
      // and it also fires the callback function once initially as well.
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => {
          documents.push({ ...doc.data(), id: doc.id });
        });
        setDocs(documents);
      });

    // Cleanup function
    return () => unsub();
  }, [collection]);

  return { docs };
};

export default useFirestore;
