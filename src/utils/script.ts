import { useCallback, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { account } from "../lib/appwrite";

const useUser = () => {
  const { updateLoggedInUser } = useAppContext();
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
  useEffect(() => {
    getUser();
  }, [getUser]);
  return { getUser };
};

export { useUser };
