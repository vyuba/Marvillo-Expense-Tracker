import { X } from "lucide-react";
// import { databases, ID } from "../lib/appwrite";
import usePostTransaction from "../hooks/useForm";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
interface FormProps {
  formName: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({ formName, active, setActive }: FormProps) {
  const { loggedInUser } = useAppContext();

  const { loading, postTransaction } = usePostTransaction(formName);
  const [data, setData] = useState({
    amount: "",
    type: formName,
    category: "",
    Date: "2024-12-27",
    user_Id: loggedInUser?.$id,
    banksId: "676da5d200108e11cba1ff",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className={`w-full max-w-[500px] bg-[#0d0d0d] h-[calc(100lvh-140px)] md:h-[calc(100lvh-70px)]  rounded-l-2xl rounded-r-md absolute top-0  flex-col gap-5 p-5  ${
        active ? "right-0 visible" : "-right-full hidden "
      } transition-all`}
    >
      <div className="flex flex-row items-center justify-between capitalize">
        <span className="font-medium text-lg">{formName} form</span>
        <button
          onClick={() => setActive(!active)}
          className="p-1 bg-accent border-2 border-background rounded-lg"
        >
          <X />
        </button>
      </div>
      <form className="flex flex-col gap-3 relative h-full">
        <div className="w-full flex justify-between items-center flex-row">
          <span className="text-sm font-light bg-accent w-fit px-3 py-1 rounded-full border border-primary my-3">
            {loggedInUser?.$id}
          </span>
          <span className="capitalize p-2 ">{formName}</span>
        </div>
        <div className="bg-secondary flex p-2 focus:border-2 border-accent border rounded-sm ">
          <label className="border-r-2 pr-2 border-accent" htmlFor="amount">
            $
          </label>
          <input
            id="amount"
            className=" pl-2 bg-transparent w-full  outline-none"
            type="number"
            name="amount"
            value={data.amount}
            placeholder="how much did you spend ?"
            onChange={handleChange}
          />
        </div>
        <input
          className="bg-secondary p-2 outline-none focus:border-2 border-accent border rounded-sm"
          type="text"
          placeholder="what did you spend the money on ?"
          value={data.category}
          name="category"
          onChange={handleChange}
        />
        <button
          value="Submit"
          onClick={(e) => {
            e.preventDefault();
            const myPromise = postTransaction({
              type: data.type,
              category: data.category,
              date: null,
              user_Id: data.user_Id,
              banksId: data.banksId,
              amount: data.amount,
            });
            toast.promise(
              myPromise,
              {
                loading: "Loading",
                success: () =>
                  `Successfully added to your ${formName} transaction`,
                error: (err: string) =>
                  `This error just happened: ${err.toString()}`,
              },
              {
                style: {
                  minWidth: "150px",
                },
                success: {
                  duration: 5000,
                  icon: "🔥",
                },
                error: {
                  duration: 5000,
                  icon: "💀",
                },
              }
            );
            const interval = setInterval(() => setActive(!active), 2000);
            clearInterval(interval);
          }}
          //   type="submit"
          className="bg-accent p-2 w-full outline-none focus:border-2 border-accent border rounded-sm capitalize font-medium absolute bottom-10 "
        >
          {loading ? "submit" : "submiting"}
        </button>
      </form>
    </div>
  );
}

export default Form;

{
  /* <select
          className="bg-secondary p-2 outline-none  border-accent border rounded-sm capitalize"
          name="select bank"
          id="bank_id"
        >
          <option className="" value="access bank">
            select yout bank
          </option>
          <option value="access bank">access bank</option>
          <option value="access bank">access bank</option>
        </select>
        <label className="capitalize text-sm" htmlFor="bank_id">
          {" "}
          optional if you dont have a bank set up already
        </label> */
}
