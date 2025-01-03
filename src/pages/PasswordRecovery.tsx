import { useState } from "react";
import { account } from "../lib/appwrite";
import toast from "react-hot-toast";
function PasswordRecovery() {
  const [email, setEmail] = useState("");
  const handleForgetPassword = async () => {
    try {
      toast.loading("Sending recovery email");
      const result = await account.createRecovery(
        email, // email
        "https://marvillo-expense-tracker.vercel.app/newpassword" // url
      );
      toast.dismiss();
      toast.success("Recovery email sent");
      console.log(result); // Success
    } catch (error) {
      console.log(error);
      toast.error("Error sending recovery email");
    }
  };
  return (
    <div className="text-white flex-1 h-full px-9 flex flex-col items-center justify-center">
      <form className="flex flex-col py-3 w-full gap-2 items-center justify-center max-w-[400px]">
        <img className="pb-5 w-[81px]" src="/marvilo.svg" alt="" />
        <h1 className="text-2xl font-semibold">Forgot your password?</h1>
        <p className="text-center text-sm">
          Enter your email address below and we'll send you a recovery link
        </p>
        <input
          type="email"
          placeholder="Email"
          className="input w-full bg-secondary py-3 px-3 rounded-md mb-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            handleForgetPassword();
          }}
          className="bg-accent text-white text-lg font-medium py-3 rounded-3xl capitalize w-full"
        >
          Send recovery email
        </button>
      </form>
    </div>
  );
}

export default PasswordRecovery;
