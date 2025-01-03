// import { useState } from "react";
import { account, OAuthProvider } from "../lib/appwrite";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
function Login() {
  const [loading, setLoading] = useState(false);
  const {
    email,
    setEmail,
    password,
    loggedInUser,
    setPassword,
    updateLoggedInUser,
    checkUserIsLoggedIn,
  } = useAppContext();

  const navigate = useNavigate();
  async function login(email: string, password: string) {
    setLoading(true);
    const loggedIn = await account.createEmailPasswordSession(email, password);
    console.log(loggedIn);
    const user = await account.get();
    updateLoggedInUser({
      acct: loggedIn,
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
    navigate("/dashboard/home");
    setLoading(false);
  }

  useEffect(() => {
    checkUserIsLoggedIn(navigate);
  }, [checkUserIsLoggedIn, navigate]);

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
            await account.createOAuth2Session(
              OAuthProvider.Google,
              "https://marvillo-expense-tracker.vercel.app/dashboard/home",
              "https://marvillo-expense-tracker.vercel.app/Sign up"
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
