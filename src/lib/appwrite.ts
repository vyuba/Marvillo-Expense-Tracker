import { Client, Account, OAuthProvider, Databases, Query } from "appwrite";
import { projectId } from "./env";

export const client = new Client();

client.setEndpoint("https://cloud.appwrite.io/v1").setProject(projectId); // Replace with your project ID
const databases = new Databases(client);

export const account = new Account(client);
export { OAuthProvider };

export { databases, Query };

export { ID } from "appwrite";
