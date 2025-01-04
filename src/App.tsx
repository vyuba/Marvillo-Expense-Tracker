import { useState } from "react";
// import { account, ID, OAuthProvider, databases } from "./lib/appwrite";
// import Modal from "./components/Modal";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/Siderbar";
import Bank from "./pages/Bank";
// import ComingSoon from "./pages/ComingSoon";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import { InteractionProvider } from "./context/interactionContext";
import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";
import PasswordRecovery from "./pages/PasswordRecovery";
import NewPassword from "./pages/NewPassword";
import ComingSoon from "./pages/ComingSoon";
// import { account } from "./lib/appwrite";
// import Profile from "./pages/Profile";
// import { useAppContext } from "./context/AppContext";

const App = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [name, setName] = useState("");

  // async function login(email, password) {
  //   await account.createEmailPasswordSession(email, password);

  //   setLoggedInUser(await account.get());
  // }

  const [activeNavbar, setActiveNavbar] = useState(false);

  return (
    <div className=" w-full bg-primary">
      <BrowserRouter>
        <Routes>
          <Route
            index
            element={
              <div className="bg-primary w-screen h-screen flex flex-row">
                <Login />
                <div className="hidden md:block flex-1 h-full bg-accent relative overflow-hidden">
                  <div className="absolute inset-0 z-10 capitalize text-white text-4xl font-bold flex flex-col items-center justify-center gap-4">
                    <img className="w-20" src="/marvilo.svg" alt="" />
                    <p>marvillo</p>
                  </div>
                  <img
                    className="absolute -top-[300px] -left-[200px]"
                    src="/Frame 4.png"
                    alt="marvillo banner"
                  />
                  <img
                    className="absolute bottom-0 -right-[250px]"
                    src="/Frame 1.png"
                    alt="marvillo banner"
                  />
                  <img
                    className="absolute bottom-40 -left-[250px] "
                    src="/Untitled - Copy@8-1721x983 (2) 3.png"
                    alt="marvillo banner"
                  />
                </div>
              </div>
            }
          />
          <Route
            path="Sign up"
            index
            element={
              <div className="bg-primary w-screen h-screen flex flex-row">
                <SignUp />
                <div className="hidden md:block flex-1 h-full bg-accent relative overflow-hidden">
                  <div className="absolute inset-0 z-10 capitalize text-white text-4xl font-bold flex flex-col items-center justify-center gap-4">
                    <img className="w-20" src="/marvilo.svg" alt="" />
                    <p>marvillo</p>
                  </div>
                  <img
                    className="absolute -top-[300px] -left-[200px]"
                    src="/Frame 4.png"
                    alt="marvillo banner"
                  />
                  <img
                    className="absolute bottom-0 -right-[250px]"
                    src="/Frame 1.png"
                    alt="marvillo banner"
                  />
                  <img
                    className="absolute bottom-40 -left-[250px] "
                    src="/Untitled - Copy@8-1721x983 (2) 3.png"
                    alt="marvillo banner"
                  />
                </div>
              </div>
            }
          />
          <Route
            path="/forgot-password"
            index
            element={
              <div className="bg-primary w-screen h-screen flex flex-row">
                <PasswordRecovery />
                <div className="hidden md:block flex-1 h-full bg-accent"></div>
              </div>
            }
          />
          <Route
            path="/newpassword"
            index
            element={
              <div className="bg-primary w-screen h-screen flex flex-row">
                <NewPassword />
                <div className="hidden md:block flex-1 h-full bg-accent"></div>
              </div>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <div className="text-white w-full overflow-y-auto md:overflow-hidden flex flex-row h-screen bg-[#141414]">
                <SideBar
                  activeNavbar={activeNavbar}
                  setActiveNavbar={setActiveNavbar}
                />
                <div className=" pt-24 px-5 md:p-5 flex-1 w-full overflow-x-auto  h-full">
                  <Navbar
                    activeNavbar={activeNavbar}
                    setActiveNavbar={setActiveNavbar}
                  />
                  <InteractionProvider>
                    <Routes>
                      <Route path="home" element={<Dashboard />} />
                      <Route path="bank" element={<Bank />} />
                      <Route path="/income" element={<IncomePage />} />
                      <Route path="/expense" element={<ExpensePage />} />
                      <Route path="/profile" element={<ComingSoon />} />
                    </Routes>
                  </InteractionProvider>
                </div>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <p>
        {loggedInUser ? `Logged in as ${loggedInUser.name}` : "Not logged in"}
      </p>
      <Modal />

      <form className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button type="button" onClick={() => login(email, password)}>
          Login
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.create(ID.unique(), email, password, name);
            const promise = databases.createDocument(
              "676216b30006327da4d3",
              "6762170700215222202c",
              ID.unique(),
              { userEmail: email }
            );

            promise.then(
              function (response) {
                console.log(response);
              },
              function (error) {
                console.log(error);
              }
            );
            login(email, password);
          }}
        >
          Register
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.createOAuth2Session(
              OAuthProvider.Google,
              "http://localhost:3000",
              "http://localhost:3000/fail"
            );
          }}
        >
          Register with google
        </button>

        <button
          type="button"
          onClick={async () => {
            await account.deleteSession("current");
            setLoggedInUser(null);
          }}
        >
          Logout
        </button>
      </form> */}
    </div>
  );
};

export default App;
