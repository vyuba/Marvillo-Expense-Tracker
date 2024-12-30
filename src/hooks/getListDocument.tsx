import { useState, useEffect, useCallback } from "react";
import { databases, Query } from "../lib/appwrite";
import { Models } from "appwrite";

const useGetListDocument = (formName: string, collectionId: string) => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState<Models.Document[]>([]);
  const [error, setError] = useState<string>("");

  const fetchDocuments = useCallback(async () => {
    try {
      const response = await databases.listDocuments(
        "6762afef001d0296be29",
        collectionId,
        [Query.equal("type", formName)]
      );
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
  }, [collectionId, formName]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return { loading, error, documents, refreshFuc: fetchDocuments };
};

export default useGetListDocument;
