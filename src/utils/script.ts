import { useCallback, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { account, databases, ID } from "../lib/appwrite";
import toast from "react-hot-toast";
import { databaseID, userCollectionID } from "../lib/env";
import { useNavigate } from "react-router";
const useUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { updateLoggedInUser, setLoggedInUser } = useAppContext();
  const getUser = useCallback(async () => {
    const user = await account.get();
    updateLoggedInUser({
      isActive: true,
      $id: user.$id,
      $createdAt: user.$createdAt,
      $updatedAt: user.$updatedAt,
      name: user.name,
      email: user.email,
      password: user.password,
      hash: user.hash,
      hashOptions: user.hashOptions,
      registration: user.registration,
      status: user.status,
      labels: user.labels,
      passwordUpdate: user.passwordUpdate,
      phone: user.phone,
      emailVerification: user.emailVerification,
      phoneVerification: user.phoneVerification,
      mfa: user.mfa,
      prefs: user.prefs,
      targets: user.targets,
      accessedAt: user.accessedAt,
    });
  }, [updateLoggedInUser]);

  const createAccount = async (email: string, password: string) => {
    setLoading(true);
    try {
      toast.loading("Creating account...");
      await account.create(ID.unique(), email, password);
      // const user = await account.get();
      const { user } = await login(email, password);
      await databases.createDocument(databaseID, userCollectionID, user.$id, {
        email: email,
      });
      setLoading(false);
      toast.dismiss();
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(`An error ${error} occurred. Please try again`);
      setLoading(false);
    }
  };

  async function login(email: string, password: string) {
    await account.createEmailPasswordSession(email, password);
    navigate("/dashboard/home");
    const user = await account.get();
    setLoggedInUser({
      isActive: true,
      acct: null,
      data: null,
      $id: user.$id,
      $createdAt: user.$createdAt,
      $updatedAt: user.$updatedAt,
      name: user.name,
      email: user.email,
      password: user.password,
      hash: user.hash,
      hashOptions: user.hashOptions,
      registration: user.registration,
      status: user.status,
      labels: user.labels,
      passwordUpdate: user.passwordUpdate,
      phone: user.phone,
      emailVerification: user.emailVerification,
      phoneVerification: user.phoneVerification,
      mfa: user.mfa,
      prefs: user.prefs,
      targets: user.targets,
      accessedAt: user.accessedAt,
    });

    return { user };
  }
  useEffect(() => {
    getUser();
  }, []);

  return { getUser, createAccount, login, loading };
};

export { useUser };
