import { useState } from "react";
// import { account, ID, OAuthProvider, databases } from "./lib/appwrite";
// import Modal from "./components/Modal";
import { BrowserRouter, Route, Routes } from "react-router";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import SideBar from "./components/Siderbar";
import Bank from "./pages/Bank";
import ComingSoon from "./pages/ComingSoon";
import IncomePage from "./pages/IncomePage";
import ExpensePage from "./pages/ExpensePage";
import { InteractionProvider } from "./context/interactionContext";
import Navbar from "./components/Navbar";
// import Profile from "./pages/Profile";

const App = () => {
  // const [loggedInUser, setLoggedInUser] = useState(null);
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
                <div className="hidden md:block flex-1 h-full bg-accent"></div>
              </div>
            }
          />
          <Route
            path="Sign up"
            index
            element={
              <div className="bg-primary w-screen h-screen flex flex-row">
                <SignUp />
                <div className="hidden md:block flex-1 h-full bg-accent"></div>
              </div>
            }
          />
          <Route
            path="/dashboard/*"
            element={
              <div className="text-white w-full overflow-hidden flex flex-row h-screen bg-[#141414]">
                <SideBar
                  activeNavbar={activeNavbar}
                  setActiveNavbar={setActiveNavbar}
                />
                <div className=" pt-24 px-5 md:p-5 flex-1 w-full">
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
