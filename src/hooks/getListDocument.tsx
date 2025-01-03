import { useState, useEffect, useCallback } from "react";
import { databases, Query } from "../lib/appwrite";
import { Models } from "appwrite";
import { useAppContext } from "../context/AppContext";
import { databaseID } from "../lib/env";

const useGetListDocument = (formName: string, collectionId: string) => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Models.Document[]>([]);
  const [error, setError] = useState<string>("");

  const { loggedInUser } = useAppContext();

  const fetchDocuments = useCallback(async () => {
    if (!loggedInUser) {
      console.error("User is not logged in");
      return;
    }
    const userId = loggedInUser.$id;
    try {
      const response = await databases.listDocuments(databaseID, collectionId, [
        Query.equal("type", formName),
        Query.equal("user_Id", userId),
      ]);
      setDocuments(response.documents);
      setLoading(false);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        console.error("Error fetching documents:", err.message);
      } else {
        setError("An unknown error occurred");
        console.error("Error fetching documents:", err);
      }
      setLoading(false);
    }
  }, [collectionId, formName, loggedInUser]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { loading, error, documents, refreshFuc: fetchDocuments };
};

export default useGetListDocument;
