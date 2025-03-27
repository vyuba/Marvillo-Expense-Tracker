import { useState } from "react";
import { databases, ID } from "../lib/appwrite";
import {
  transactionCollectionID,
  databaseID,
  BankCollectionID,
} from "../lib/env";
import { Models } from "appwrite";

interface Form {
  type: string;
  category: string;
  date: string | null;
  user_Id: string | undefined;
  banksId: string;
  amount: number;
}

interface BankDetails {
  response: Models.DocumentList<Models.Document> | undefined;
}
const usePostTransaction = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bankData, setBankData] = useState<BankDetails>({
    response: undefined,
  });
  const postBank = async (BankDetail: object) => {
    setLoading(true);
    try {
      const response = await databases.createDocument(
        databaseID,
        BankCollectionID,
        ID.unique(),
        BankDetail
      );
      setBankData({
        response: response?.documents || undefined, // Safe check for response and documents
      });
      console.log(bankData);
      return response;
    } catch (err) {
      setLoading(false);
      console.log(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const postTransaction = async ({
    formDetails,
    selectedBank,
  }: {
    formDetails: Form;
    selectedBank: Models.Document;
  }) => {
    setLoading(true);
    let calc;
    if (selectedBank === null) {
      setLoading(false);
      console.log("create a bank");
    }

    try {
      console.log(selectedBank);
      if (
        formDetails?.type === "expense" &&
        formDetails.amount > selectedBank.amount
      ) {
        setLoading(false);
        throw new Error("Insufficient funds.");
      }

      if (formDetails?.type === "expense") {
        calc = selectedBank.amount - formDetails.amount;
      }
      if (formDetails?.type === "income") {
        calc = selectedBank.amount + formDetails.amount;
      }

      // Update bank balance
      const bank = await databases.updateDocument(
        databaseID,
        BankCollectionID,
        selectedBank.$id,
        { amount: calc }
      );

      // Create transaction record
      const response = await databases.createDocument(
        databaseID,
        transactionCollectionID,
        ID.unique(),
        formDetails
      );
      return {
        response,
        bank,
      };
    } catch (err) {
      console.error("Transaction Error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    postTransaction,
    setLoading,
    bankData,
    setBankData,
    postBank,
  };
};

export default usePostTransaction;
