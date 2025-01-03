import React, { useEffect, useState } from "react";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
const NewPassword: React.FC = () => {
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState("");
  const [secret, setSecret] = useState("");
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userId = params.get("userId");
    const secret = params.get("secret");
    setUserId(userId || "");
    setSecret(secret || "");
  }, []);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      toast.loading("Updating password...");
      const result = await account.updateRecovery(
        userId, // userId
        secret, // secret
        password
      );
      console.log("New password submitted:", result);
      toast.dismiss();
      toast.success("Password updated successfully");
      navigate("/");
    } catch (error: unknown) {
      toast.error(`Error: ${error}`);
    }
  };

  return (
    <div className="text-white flex-1 h-full px-9 flex flex-col items-center justify-center ">
      <img className="pb-5 w-[81px]" src="/marvilo.svg" alt="" />
      <h2 className="text-lg font-medium">Set New Password</h2>
      <form
        onSubmit={handleSubmit}
        className="max-w-[400px] w-full py-5 grid gap-3"
      >
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm" htmlFor="newPassword">
            New Password:
          </label>
          <input
            type="password"
            id="newPassword"
            className="input w-full bg-secondary py-3 px-3 rounded-md mb-2"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-accent text-white text-lg font-medium py-3 rounded-3xl capitalize w-full"
          type="submit"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default NewPassword;
