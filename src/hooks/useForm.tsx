import { useState } from "react";
import { databases, ID } from "../lib/appwrite";
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
        "6762afef001d0296be29",
        "6762b0fe003da2d7768b",
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
