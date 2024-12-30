import { useState } from "react";
import { databases, ID } from "../lib/appwrite";
const useUser = () => {
  const [BankDetails, setBankDetails] = useState([]);
  async function add(BankDetail) {
    try {
      const response = await databases.createDocument(
        "6762afef001d0296be29",
        "676377de0017b54237c7",
        ID.unique(),
        BankDetail
      );
      setBankDetails((BankDetails) => [response, ...BankDetails].slice(0, 10));
      console.log(BankDetails);
    } catch (err) {
      console.log(err);
    }
  }
};
