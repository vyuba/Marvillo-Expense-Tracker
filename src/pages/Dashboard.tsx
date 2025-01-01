import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Models } from "appwrite";
import { databases, Query } from "../lib/appwrite";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
function Dashboard() {
  const { loggedInUser } = useAppContext();

  // const data = [
  //   {
  //     name: "Page A",
  //     income: 4000,
  //     expense: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     income: 3000,
  //     expense: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: "Page C",
  //     income: 2000,
  //     expense: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: "Page D",
  //     income: 2780,
  //     expense: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: "Page E",
  //     income: 1890,
  //     expense: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: "Page F",
  //     income: 2390,
  //     expense: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: "Page G",
  //     income: 3490,
  //     expense: 4300,
  //     amt: 2100,
  //   },
  // ];

  console.log(loggedInUser);
  const [transaction, setTransaction] = useState<
    Models.Document[] | (() => Document[])
  >([]);

  useEffect(() => {
    const fetchUserTransactions = async () => {
      if (!loggedInUser) {
        console.error("User is not logged in");
        return;
      }
      try {
        const response = await databases.listDocuments(
          "6762afef001d0296be29",
          "6762b0fe003da2d7768b",
          [Query.equal("user_Id", loggedInUser?.$id)]
        );
        console.log(response); // List of transactions
        setTransaction(response.documents);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUserTransactions();
  }, [loggedInUser]);
  console.log(transaction);

  const mappedData = Array.isArray(transaction)
    ? transaction.map((data) => ({
        name: data.$createdAt.split("T")[0], // Extract date
        income: data.type === "income" ? parseFloat(data.amount) : 0,
        expense: data.type === "expense" ? parseFloat(data.amount) : 0,
        amt: parseFloat(data.amount), // Total amount
      }))
    : null;
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
      <h1 className="capitalize  text-xl font-semibold">
        accounting dashboard
      </h1>
      <div className="flex flex-col justify-between gap-2 py-7 w-full">
        <span className="text-[#4f4e4e] font-medium">Total transactions</span>
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="text-2xl font-semibold">
            {transaction?.length
              ? new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(TotalExpense + TotalIncome)
              : "--"}
          </span>
          <Wallet className=" rounded-full size-8 p-1" />
        </div>
      </div>
      <div className="py-2 w-full flex flex-wrap gap-2">
        <span className="text-white gap-5 flex flex-col p-5 bg-[#0d0d0d] w-full flex-1 rounded-md h-fit border border-accent">
          <span className="flex flex-row items-center justify-between gap-2">
            <ArrowDownRight className=" rounded-full size-8 p-1 bg-purple-900 text-accent bg-opacity-50" />
            <p className="text-sm capitalize text-[#4f4e4e] font-semibold">
              expence
            </p>
          </span>
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
        <span className="text-white gap-5 flex flex-col p-5 bg-[#0d0d0d] w-full flex-1 rounded-md h-fit border border-accent">
          <span className="flex flex-row items-center justify-between gap-2">
            <ArrowUpRight className=" rounded-full size-8 p-1 bg-purple-900 text-accent bg-opacity-50" />
            <p className="text-sm capitalize text-[#4f4e4e] font-semibold">
              income
            </p>
          </span>
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
        <div className="w-full h-[600px] border border-accent bg-[#0d0d0d] rounded-lg text-white">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={mappedData}
              margin={{
                top: 50,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray=""
                className="stroke-secondary"
                x={80}
              />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                wrapperStyle={{
                  backgroundColor: "green",
                  fontWeight: 700,
                  borderRadius: 10,
                }}
              />
              <Legend wrapperStyle={{ top: 20 }} />
              <Bar
                dataKey="income"
                className="stroke-accent fill-purple-400 stroke-2"
                activeBar={
                  <Rectangle className="fill-purple-600 fill-opacity-50" />
                }
              />
              <Bar
                dataKey="expense"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
              />
            </BarChart>
          </ResponsiveContainer>
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
