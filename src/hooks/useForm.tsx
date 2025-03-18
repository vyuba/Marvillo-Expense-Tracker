import { useState } from "react";
import { databases, ID } from "../lib/appwrite";
import { transactionCollectionID, databaseID } from "../lib/env";
const usePostTransaction = () => {
  const [loading, setLoading] = useState<boolean>(true);
  // if (!loggedInUser) {
  //   console.error("User is not logged in");
  //   return;
  // }
  //   const [data, setData] = useState<any>(null);

  const postTransaction = async (data: object) => {
    try {
      const response = await databases.createDocument(
        databaseID,
        transactionCollectionID,
        ID.unique(),
        data
      );

      console.log(response);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return { loading, postTransaction, setLoading };
};

export default usePostTransaction;
