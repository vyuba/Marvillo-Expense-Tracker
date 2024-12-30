import { useState } from "react";
import { databases, ID } from "../lib/appwrite";

const usePostTransaction = () => {
  //   const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const postTransaction = async (data: object) => {
    try {
      const response = await databases.createDocument(
        "6762afef001d0296be29",
        "6762b0fe003da2d7768b",
        ID.unique(),
        data
      );

      console.log(response);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, postTransaction };
};

export default usePostTransaction;
