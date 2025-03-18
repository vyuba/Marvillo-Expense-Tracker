import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Models } from "appwrite";
import { databases, Query } from "../lib/appwrite";
import { databaseID, transactionCollectionID } from "../lib/env";
import {
  ArrowDownRight,
  ArrowUpRight,
  Eye,
  EyeClosed,
  Wallet,
} from "lucide-react";
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
  const [eye, setEye] = useState<boolean>(false);
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
          databaseID,
          transactionCollectionID,
          [Query.equal("user_Id", loggedInUser?.$id)]
        );
        // console.log(response); // List of transactions
        setTransaction(response.documents);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchUserTransactions();
  }, [loggedInUser]);

  const mappedData = Array.isArray(transaction)
    ? transaction.map((data) => ({
        name: data.$createdAt.split("T")[0], // Extract date
        income: data.type === "income" ? parseFloat(data.amount) : 0,
        expense: data.type === "expense" ? parseFloat(data.amount) : 0,
        amt: parseFloat(data.amount), // Total amount
      }))
    : undefined;
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
    <div className=" w-full h-full">
      <h1 className="capitalize  text-xl font-semibold">
        accounting dashboard
      </h1>
      <div className="flex flex-col justify-between gap-2 py-7 w-full">
        <span className="text-[#4f4e4e] font-medium">Total transactions</span>
        <div className="flex flex-row items-center justify-between gap-2">
          <span className="text-2xl font-semibold flex flex-row items-center gap-2">
            <p>
              {eye
                ? transaction?.length
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(TotalExpense + TotalIncome)
                  : "--"
                : `******`}
            </p>
            <button onClick={() => setEye(!eye)}>
              {eye ? (
                <Eye className=" rounded-full size-8 p-1" />
              ) : (
                <EyeClosed className=" rounded-full size-8 p-1" />
              )}
            </button>
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
              {eye
                ? TotalExpense
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(TotalExpense)
                  : "--"
                : `******`}
            </p>
            <div className="text-sm text-[#4f4e4e] font-medium"></div>
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
              {eye
                ? TotalIncome
                  ? new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(TotalIncome)
                  : "--"
                : `******`}
            </p>
            <div className="text-sm text-[#4f4e4e] font-medium"></div>
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
