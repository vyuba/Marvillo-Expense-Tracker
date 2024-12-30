import { Client, Account, OAuthProvider, Databases, Query } from "appwrite";

export const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6761fd07002bd09d48d9"); // Replace with your project ID

const databases = new Databases(client);

export const account = new Account(client);
export { OAuthProvider };

export { databases, Query };

export { ID } from "appwrite";
