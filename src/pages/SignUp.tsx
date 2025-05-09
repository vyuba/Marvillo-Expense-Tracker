// import { useState } from "react";
import { account, OAuthProvider } from "../lib/appwrite";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useUser } from "../utils/script";
import { apiUrl } from "../lib/env";
import toast from "react-hot-toast";
function SignUp() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    checkUserIsLoggedIn,
    loggedInUser,
  } = useAppContext();
  const navigate = useNavigate();
  const { createAccount, loading } = useUser();

  useEffect(() => {
    checkUserIsLoggedIn(navigate);
  }, [checkUserIsLoggedIn, navigate, loggedInUser?.name]);

  return (
    <div className=" text-white flex-1 h-full px-9 flex flex-col items-center justify-center">
      <div className="flex flex-col py-3 w-full gap-2 items-center justify-center">
        <img className="pb-5 w-[81px]" src="/marvilo.svg" alt="" />
        <h1 className="text-xl font-medium ">Nice to meet you</h1>
        <h1 className="text-secondary_text font-light">
          Before we begin, we need some details.
        </h1>
      </div>
      <form className="flex flex-col justify-center gap-3 w-full max-w-[360px]">
        <button
          className="bg-secondary mt-5 border text-white text-base font-medium py-3 rounded-3xl capitalize flex items-center justify-center gap-3"
          type="button"
          onClick={async () => {
            try {
              await account.createOAuth2Token(
                OAuthProvider.Google,
                `${apiUrl}/callbackSuccess`,
                `${apiUrl}/Sign%20up`
              );
            } catch (error) {
              toast.error(`An error ${error} occurred. Please try again`);
            }
          }}
        >
          <img className="w-5" src="/google-icon-logo-svgrepo-com.svg" alt="" />
          sign up with google
        </button>
        <span className="h-[1px] w-full my-5 bg-[#C8BED4]"></span>
        <input
          className="bg-secondary py-3 px-3 rounded-md mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="bg-secondary py-3 px-3 rounded-md mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="bg-accent text-white text-lg font-medium py-3 rounded-3xl capitalize"
          type="button"
          onClick={async () => {
            await createAccount(email, password);
          }}
        >
          {loading ? "signing" : " sign up"}
        </button>
      </form>
      <span className="pt-6">
        Already have an account?{" "}
        <a href="/" className="text-accent font-medium capitalize">
          login
        </a>
      </span>
    </div>
  );
}

export default SignUp;
