import { Client, Account, OAuthProvider, Databases, Query } from "appwrite";

export const client = new Client();
const projectId = import.meta.env.VITE_PROJECT_ID;

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId); // Replace with your project ID
const databases = new Databases(client);

export const account = new Account(client);
export { OAuthProvider };

export { databases, Query };

export { ID } from "appwrite";
