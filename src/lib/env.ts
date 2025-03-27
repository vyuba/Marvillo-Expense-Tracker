const projectId = import.meta.env.VITE_PROJECT_ID;
const databaseID = import.meta.env.VITE_DATABASE_ID;
const BankCollectionID = import.meta.env.VITE_BANKS_COLLECTION_ID;
const userCollectionID = import.meta.env.VITE_USERS_COLLECTION_ID;
const transactionCollectionID = import.meta.env.VITE_TRANSACTION_COLLECTION_ID;
const apiUrl = "https://marvillo.ayuba.me";
// const apiUrl = import.meta.env.VITE_API_KEY;

export {
  databaseID,
  BankCollectionID,
  userCollectionID,
  transactionCollectionID,
  apiUrl,
  projectId,
};
