// import { useState } from "react";
import { account, ID, OAuthProvider, databases } from "../lib/appwrite";
import Modal from "../components/Modal";
import { useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router";
import { useState } from "react";
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
  }
  return (
    <div className=" text-white flex-1 h-full px-9 flex flex-col items-center justify-center">
      <Modal loading={loading} setLoading={setLoading} />
      <div className="flex flex-col py-3 w-full gap-2 items-center justify-center">
        <img className="pb-5 w-[81px]" src="/marvilo.svg" alt="" />
        <h1 className="text-xl font-medium ">Nice to meet you</h1>
        <h1 className="text-secondary_text font-light">
          Before we begin, we need some details.
        </h1>
      </div>
      <form className="flex flex-col justify-center gap-3 w-full max-w-[360px]">
        <button
          className="bg-secondary mt-5 border text-white text-base font-medium py-3 rounded-3xl capitalize"
          type="button"
          onClick={async () => {
            await account.createOAuth2Session(
              OAuthProvider.Google,
              "http://localhost:3000/dashboard/home",
              "http://localhost:3000/fail"
            );
          }}
        >
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
          onClick={async () => {
            setLoading(true);
            await account.create(ID.unique(), email, password);
            const promise = databases.createDocument(
              "6762afef001d0296be29",
              "6762b0c6001fed31089b",
              ID.unique(),
              { email: email }
            );

            promise.then(
              function (response) {
                console.log(response);
              },
              function (error) {
                console.log(error);
              }
            );
            setLoading(false);
            login(email, password);
          }}
        >
          sign up
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
        <a href="/login" className="text-accent font-medium capitalize">
          login
        </a>
      </span>
    </div>
  );
}

export default SignUp;
