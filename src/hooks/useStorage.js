import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgrees] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  // Everytime the file changes (Dependency changes) this useEffect Hook going to render again.
  useEffect(() => {
    // Creating a reference if file into the default firebase storage.
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    // Uploading the file to the ubove reference
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        // Farmula for percentage
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgrees(percentage);
      },
      (err) => {
        setError(err);
      },

      // This function will gonna fire when upload is fully complete.
      async () => {
        // This will get the URL of the image which is uploaded.
        const url = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        collectionRef.add({ url, createdAt });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
