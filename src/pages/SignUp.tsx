// import { useState } from "react";
import { account, ID, OAuthProvider, databases } from "../lib/appwrite";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { useState } from "react";
import toast from "react-hot-toast";
function SignUp() {
  const [loading, setLoading] = useState(false);
  const { email, setEmail, password, setPassword, setLoggedInUser } =
    useAppContext();
  const navigate = useNavigate();
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

  const createAccount = async () => {
    toast.loading("Creating account...");
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password);
      // const user = await account.get();
      const { user } = await login(email, password);
      await databases.createDocument(
        "6762afef001d0296be29",
        "6762b0c6001fed31089b",
        user.$id,
        { email: email }
      );
      setLoading(false);
    } catch (error) {
      toast.error(`An error ${error} occurred. Please try again`);
      setLoading(false);
    }
    toast.success("Account created successfully");
  };

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
              account.createOAuth2Session(
                OAuthProvider.Google,
                "http://localhost:3000/dashboard/home",
                "http://localhost:3000/Sign up"
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
        {/* <input
      type="text"
      placeholder="Name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    /> */}
        {/* 
    <button type="button" onClick={() => login(email, password)}>
      Login
    </button> */}

        <button
          className="bg-accent text-white text-lg font-medium py-3 rounded-3xl capitalize"
          type="button"
          onClick={() => {
            createAccount();
          }}
        >
          {loading ? "signing" : " sign up"}
        </button>

        {/* <button
          type="button"
          onClick={async () => {
            await account.deleteSession("current");
            setLoggedInUser(null);
          }}
        >
          Logout
        </button> */}
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
