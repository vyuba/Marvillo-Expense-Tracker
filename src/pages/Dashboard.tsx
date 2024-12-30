import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
// import { LineChart } from "@mui/x-charts/LineChart";
import { Models } from "appwrite";
import { databases } from "../lib/appwrite";
// import { useNavigate } from "react-router";
// import SideBar from "../components/Siderbar";
// import { colors } from "@mui/material";
function Dashboard() {
  const { loggedInUser } = useAppContext();

  console.log(loggedInUser);

  // const [shrink, setShrink] = useState(true);
  const [transaction, setTransaction] = useState<
    Models.Document[] | (() => Document[])
  >([]);
  // const handleSidebarShrink = () => {
  //   setShrink(!shrink);
  // };

  // const navigate = useNavigate();

  useEffect(() => {
    const fetchUserTransactions = async () => {
      try {
        const response = await databases.listDocuments(
          "6762afef001d0296be29",
          "6762b0fe003da2d7768b"
          // [Query.equal("user_Id", [userId])]
        );
        console.log(response); // List of transactions
        setTransaction(response.documents);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUserTransactions();
  }, []);
  console.log(transaction);

  const TotalExpense = Array.isArray(transaction)
    ? transaction?.reduce<number>((acc, item) => {
        if (item.type === "expense") acc += Number(item.amount);
        return acc;
      }, 0)
    : 0;
  const TotalIncome = Array.isArray(transaction)
    ? transaction?.reduce<number>((acc, item) => {
        if (item.type === "income") acc += Number(item.amount);
        return acc;
      }, 0)
    : 0;

  return (
    <div className=" h-full">
      {/* <SideBar shrink={shrink} /> */}
      <h1 className="capitalize text-xl font-semibold">accounting dashboard</h1>
      <div className="py-7 w-full flex flex-wrap gap-2">
        <span className="text-white gap-5 flex flex-col p-5 bg-[#0d0d0d] w-full flex-1 rounded-md h-fit">
          <p className="text-sm capitalize text-[#4f4e4e] font-medium">
            expence
          </p>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="font-semibold text-xl">
              {TotalExpense
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(TotalExpense)
                : "--"}
            </p>
            <div className="text-sm text-[#4f4e4e] font-medium">
              {/* {data.category} */}
            </div>
          </div>
        </span>
        <span className="text-white gap-5 flex flex-col p-5 bg-[#0d0d0d] w-full flex-1 rounded-md h-fit">
          <p className="text-sm capitalize text-[#4f4e4e] font-medium">
            income
          </p>
          <div className="w-full flex flex-row justify-between items-center">
            <p className="font-semibold text-xl">
              {TotalIncome
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(TotalIncome)
                : "--"}
            </p>
            <div className="text-sm text-[#4f4e4e] font-medium">
              {/* {data.category} */}
            </div>
          </div>
        </span>
        <div className="w-full h-[600px] bg-[#0d0d0d] rounded-lg text-white">
          {/* <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
                label: "income",
                // area: true,
                color: "#fdb462",
              },
              {
                data: [5, 1.5, 2, 8.5, 10, 5],
                label: "expenses",
                // area: true,
              },
            ]}
            // width={500}
            // height={400}
            grid={{ horizontal: true }}
            sx={{
              width: "100%",
              "& .MuiLineElement-root": {
                strokeDasharray: "",
                strokeWidth: 4,
              },
              "& .MuiChartsAxis-line": {
                color: "ButtonText",
                strokeWidth: 4,
              },
              "& .MuiChartsAxis-tickLabel": {
                color: "white",
                fontSize: "20px",
              },
              "& .MuiAreaElement-series-Germany": {
                fill: "url('#myGradient')",
              },
            }}
          /> */}
        </div>
        {/* {transaction?.map((data) => (
          <span
            className="text-white gap-5 flex flex-col p-5 bg-[#0d0d0d] w-full max-w-[400px] rounded-md h-fit"
            key={data.$id}
          >
            <p className="text-sm capitalize text-[#4f4e4e] font-medium">
              {" "}
              {data.type}
            </p>
            <div className="w-full flex flex-row justify-between items-center">
              <p className="font-semibold text-xl">${data.amount}</p>
              <div className="text-sm text-[#4f4e4e] font-medium">
                {data.category}
              </div>
            </div>
          </span>
        ))} */}
      </div>
      {/* {loggedInUser ? (
          <>
            <span>{loggedInUser?.email}</span>
            <button type="button" onClick={() => loggedInUser?.logout()}>
              Logout
            </button>
          </>
        ) : (
          <a href="/login">Login</a>
        )} */}
      {/* <button
        type="button"
        onClick={async () => {
          await account.deleteSession("current");
          setLoggedInUser(null);
          navigate("/");
        }}
      >
        Logout
      </button> */}
    </div>
  );
}

export default Dashboard;
