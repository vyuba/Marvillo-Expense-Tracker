// import { useState } from "react";
import { account, OAuthProvider } from "../lib/appwrite";
import { useAppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { useUser } from "../utils/script";
function Login() {
  const [loading, setLoading] = useState(false);
  const { login, handleCallback } = useUser();
  const {
    email,
    setEmail,
    password,
    loggedInUser,
    setPassword,
    checkUserIsLoggedIn,
  } = useAppContext();

  const navigate = useNavigate();
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userId = params.get("userId");
    const secret = params.get("secret");
    toast.promise(
      handleCallback(userId, secret),
      {
        loading: "Logging",
        success: () => `Successfully Logged in ${loggedInUser?.name}`,
        error: (err) => `error: ${err.toString()}`,
      },
      {
        style: {
          minWidth: "150px",
        },
        success: {
          duration: 3000,
          icon: "✅",
        },
        error: {
          duration: 3000,
          icon: "💀",
        },
      }
    );

    checkUserIsLoggedIn(navigate);
  }, [checkUserIsLoggedIn, navigate, handleCallback, loggedInUser?.name]);

  return (
    <div className=" text-white flex-1 h-full px-9 flex flex-col items-center justify-center">
      {/* <Modal /> */}
      <div className="flex flex-col py-3 w-full gap-2 items-center justify-center">
        <img className="pb-5 w-[81px]" src="/marvilo.svg" alt="" />
        <h1 className="text-xl font-medium ">Welcome back</h1>
        <h1 className="text-secondary_text font-light">
          Welcome back! Please enter your details.
        </h1>
      </div>
      <form className="flex flex-col justify-center gap-3 w-full max-w-[360px]">
        <button
          className="bg-secondary mt-5 border text-white text-base font-medium py-3 rounded-3xl capitalize flex items-center justify-center gap-3"
          type="button"
          onClick={async () => {
            await account.createOAuth2Token(
              OAuthProvider.Google,
              "https://marvillo.ayuba.me/",
              "https://marvillo.ayuba.me/Sign%20up"
            );
          }}
        >
          <img className="w-5" src="/google-icon-logo-svgrepo-com.svg" alt="" />
          login with google
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

        <Link
          to="/forgot-password"
          className="text-accent font-medium capitalize"
        >
          Forgot password?
        </Link>

        <button
          className="bg-accent text-white text-lg font-medium py-3 rounded-3xl capitalize"
          type="button"
          onClick={() => {
            const Login = login(email, password);
            toast.promise(
              Login,
              {
                loading: "Logging",
                success: () => `Successfully Logged in ${loggedInUser?.name}`,
                error: (err) => `error: ${err.toString()}`,
              },
              {
                style: {
                  minWidth: "150px",
                },
                success: {
                  duration: 3000,
                  icon: "✅",
                },
                error: {
                  duration: 3000,
                  icon: "💀",
                },
              }
            );
            setLoading(false);
          }}
        >
          {loading ? "logging" : "login"}
        </button>
      </form>
      <span className="pt-6">
        Don't have an account yet?{" "}
        <a href="/Sign up" className="text-accent font-medium capitalize">
          sign up
        </a>
      </span>
    </div>
  );
}

export default Login;
