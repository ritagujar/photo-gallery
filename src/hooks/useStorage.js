import { useState, useEffect } from "react";
import { projectStorage } from "../firebase/config";

const useStorage = (file) => {
  const [progress, setProgrees] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    // Creating a reference if file into the default firebase storage.
    const storageRef = projectStorage.ref(file.name);

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
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
