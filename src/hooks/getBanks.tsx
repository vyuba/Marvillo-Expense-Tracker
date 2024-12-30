import { useEffect, useState } from "react";
import { databases } from "../lib/appwrite";
import { Models } from "appwrite";

interface BankState {
  response: Models.DocumentList<Models.Document> | null;
  Bankresponse: Models.DocumentList<Models.Document> | null; // Replace `any` with a more specific type if you know it
}
export const useGetBanks = () => {
  const [bank, setBank] = useState<BankState | null>(null);
  const [loading, setLoading] = useState(true);
  const getBank = async () => {
    try {
      const response = await databases.listDocuments(
        "6762afef001d0296be29",
        "676377de0017b54237c7"
      );
      console.log(response);
      const Bankresponse = await databases.listDocuments(
        "6762afef001d0296be29",
        "6762b0fe003da2d7768b"
        // [Query.equal("banksId", [response.documents[0].$id])]
      );
      console.log(Bankresponse);
      setBank({ response, Bankresponse });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  useEffect(() => {
    getBank();
  }, []);
  return { bank, loading, refetchBanks: getBank };
};
