import { X } from "lucide-react";
import usePostTransaction from "../hooks/useForm";
import { useState } from "react";
import { Models } from "appwrite";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";
import { useGetBanks } from "../hooks/getBanks";
import { useNavigate } from "react-router";
interface FormProps {
  formName: string;
  active: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

function Form({ formName, active, setActive }: FormProps) {
  const { loggedInUser } = useAppContext();
  const { Bank } = useGetBanks();
  const [selectedBank, setSelectedBank] = useState<Models.Document | null>(
    null
  );

  const { loading, postTransaction, postBank } = usePostTransaction();
  const [data, setData] = useState({
    amount: "",
    type: formName,
    category: "",
    Date: "2024-12-27",
    user_Id: loggedInUser?.$id,
    banksId: "",
  });
  const [bankFormData, setBankFormData] = useState({
    name: "",
    color: "",
    amount: "",
    user_Id: loggedInUser?.$id,
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (formName === "bank") {
      setBankFormData((prevData) => {
        if (name === "color") {
          if (/^#[0-9A-Fa-f]{6}$/.test(value)) {
            return { ...prevData, [name]: value };
          } else {
            // Optionally set an error or ignore invalid colors
            console.error("Invalid color format!");
            return prevData; // Keep the current state unchanged
          }
        }
        return { ...prevData, [name]: value };
      });
    }

    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div
      className={`w-full z-50 max-w-[500px] bg-[#0d0d0d] h-[calc(100lvh-140px)] md:h-[calc(100lvh-70px)]  rounded-l-2xl rounded-r-md absolute top-0  flex-col gap-5 p-5  ${
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

      {formName !== "bank" ? (
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
          <select
            className="bg-secondary p-2 outline-none  border-accent border rounded-sm capitalize"
            name="select bank"
            id="bank_id"
            value={data.banksId}
            onChange={(e) => {
              if (e.target.value === "create") {
                navigate("/dashboard/bank");
              }
              setData((prevData) => ({
                ...prevData,
                banksId: e.target.value,
              }));
              const filteredBank = Bank?.filteredBanks?.find(
                (bank) => bank.$id === e.target.value
              );

              setSelectedBank(filteredBank || null);
            }}
          >
            <option className="" value="default">
              select yout bank
            </option>
            {Bank?.filteredBanks &&
              Bank?.filteredBanks.map((bank) => (
                <option key={bank.$id} value={bank.$id}>
                  {bank.BankName}
                </option>
              ))}
            <option className="" value="create">
              create a bank
            </option>
          </select>
          <label className="capitalize text-sm" htmlFor="bank_id">
            optional if you dont have a bank set up already
          </label>
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
              const formDetails = {
                type: data.type,
                category: data.category,
                date: null,
                user_Id: loggedInUser?.$id,
                banksId: data.banksId,
                amount: Number(data.amount),
              };
              if (data.amount === "") {
                toast.error(`Put in your  ${data.type} amount`);
                return;
              }
              if (selectedBank) {
                const myPromise = postTransaction({
                  formDetails,
                  selectedBank,
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
                setActive(!active);
                setData({
                  amount: "",
                  type: formName,
                  category: "",
                  Date: "2024-12-27",
                  user_Id: loggedInUser?.$id,
                  banksId: "default",
                });
              } else {
                toast.error("Create a bank");
              }
            }}
            //   type="submit"
            className="bg-accent p-2 w-full outline-none focus:border-2 border-accent border rounded-sm capitalize font-medium absolute bottom-10 "
          >
            {loading ? "submiting" : "submit"}
          </button>
        </form>
      ) : (
        <div className="w-full h-full">
          <form className="flex flex-col gap-3 relative h-full">
            <div className="w-full flex justify-between items-center flex-row">
              <span className="text-sm font-light bg-accent w-fit px-3 py-1 rounded-full border border-primary my-3">
                {loggedInUser?.$id}
              </span>
              <span className="capitalize p-2 ">{formName}</span>
            </div>
            <input
              className="bg-secondary p-2 outline-none focus:border-2 border-accent border rounded-sm"
              type="text"
              placeholder="e.g Access bank"
              value={bankFormData.name}
              name="name"
              onChange={handleChange}
            />
            <div className="bg-secondary flex p-2 focus:border-2 border-accent border rounded-sm ">
              <label className="border-r-2 pr-2 border-accent" htmlFor="amount">
                $
              </label>
              <input
                id="amount"
                className=" pl-2 bg-transparent w-full  outline-none"
                type="number"
                name="amount"
                value={bankFormData.amount}
                placeholder="amount of money in wallet ?"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col">
              <label className="capitalize" htmlFor="color_picker">
                Choose your color
              </label>
              <input
                value={bankFormData.color}
                className="border-none focus:outline-none outline-none"
                type="color"
                name="color" // Match this to your state key
                id="color_picker"
                onChange={handleChange}
              />
            </div>
            <button
              value="Submit"
              onClick={(e) => {
                e.preventDefault();

                if (bankFormData.amount === "" || bankFormData.name === "") {
                  toast.error("Fill in all your details");
                  return;
                }

                if (bankFormData.color === "") {
                  toast.error("Pick a color to represent your bank");
                  return;
                }
                const myPromise = postBank({
                  BankName: bankFormData.name,
                  usersId: bankFormData.user_Id,
                  amount: Number(bankFormData.amount),
                  color: bankFormData.color,
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
                setBankFormData({
                  name: "",
                  color: "",
                  amount: "",
                  user_Id: loggedInUser?.$id,
                });
                setActive(!active);
              }}
              //   type="submit"
              className="bg-accent p-2 w-full outline-none focus:border-2 border-accent border rounded-sm capitalize font-medium absolute bottom-10 "
            >
              {loading ? "submiting" : "submit"}
            </button>
          </form>
        </div>
      )}
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
