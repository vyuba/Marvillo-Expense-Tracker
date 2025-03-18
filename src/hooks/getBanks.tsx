import { useCallback, useEffect, useState } from "react";
import { databases, Query } from "../lib/appwrite";
import { Models } from "appwrite";
import {
  databaseID,
  BankCollectionID,
  transactionCollectionID,
} from "../lib/env";
import { useAppContext } from "../context/AppContext";

interface BankState {
  filteredBanks: Models.Document[] | null;
  Bankresponse: Models.DocumentList<Models.Document> | null; // Replace `any` with a more specific type if you know it
}
export const useGetBanks = () => {
  const { loggedInUser } = useAppContext();
  const [Bank, setBank] = useState<BankState | null>(null);
  const [loading, setLoading] = useState(true);
  const getBank = useCallback(async () => {
    if (!loggedInUser) {
      console.error("User is not logged in");
      return;
    }
    try {
      const response = await databases.listDocuments(
        databaseID,
        BankCollectionID,
        [Query.equal("usersId", loggedInUser.$id)]
      );

      console.log(response);
      // Filter or resolve relationships manually
      // const filteredBanks = response.documents.filter(
      //   (bank) => bank.usersId === loggedInUser.$id
      // );
      const Bankresponse = await databases.listDocuments(
        databaseID,
        transactionCollectionID
      );
      console.log(Bankresponse);
      setBank({ filteredBanks: response.documents, Bankresponse });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banks", error);
    }
  }, [loggedInUser]);
  useEffect(() => {
    getBank();
  }, [getBank]);
  return { Bank, loading, refetchBanks: getBank };
};
