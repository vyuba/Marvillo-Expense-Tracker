import { useGetBanks } from "../hooks/getBanks";
import { DeleteIcon, Search } from "lucide-react";
import bankIcon from "../assets/bank.svg";
import Form from "../components/Form";
import { useInteract } from "../context/interactionContext";
import { useEffect } from "react";
import { client } from "../lib/appwrite";
import { BankCollectionID, databaseID } from "../lib/env";
import { Models } from "appwrite";
import toast from "react-hot-toast";

function Bank() {
  const { Bank, loading, setBank, deleteBank } = useGetBanks();
  // const { loggedInUser } = useAppContext();
  // const [acctNo, setAcctNo] = useState<string>();
  // const [BankName, setBankName] = useState<string>();
  const { active, setActive } = useInteract();
  useEffect(() => {
    const unsubscribe = client.subscribe(
      `databases.${databaseID}.collections.${BankCollectionID}.documents`,
      (response) => {
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.create"
          )
        ) {
          setBank((prev) => ({
            ...(prev || { filteredBanks: [], Bankresponse: null }),
            filteredBanks: [
              ...(prev?.filteredBanks || []),
              response.payload as Models.Document,
            ],
          }));
        }
        if (
          response.events.includes(
            "databases.*.collections.*.documents.*.delete"
          )
        ) {
          setBank((prev) => ({
            ...(prev || { filteredBanks: [], Bankresponse: null }),
            filteredBanks:
              prev?.filteredBanks?.filter(
                (bank) =>
                  bank?.$id !== (response.payload as Models.Document)?.$id
              ) || [],
          }));
        }
      }
    );

    return () => unsubscribe();
  }, [setBank]);

  if (loading) {
    return (
      <div className="w-full h-[calc(100lvh-80px)] flex items-center justify-center flex-col gap-5">
        <span className="w-[100px]">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <radialGradient
              id="a12"
              cx=".66"
              fx=".66"
              cy=".3125"
              fy=".3125"
              gradientTransform="scale(1.5)"
            >
              <stop offset="0" stopColor="#9E56FF"></stop>
              <stop offset=".3" stopColor="#9E56FF" stopOpacity=".9"></stop>
              <stop offset=".6" stopColor="#9E56FF" stopOpacity=".6"></stop>
              <stop offset=".8" stopColor="#9E56FF" stopOpacity=".3"></stop>
              <stop offset="1" stopColor="#9E56FF" stopOpacity="0"></stop>
            </radialGradient>
            <circle
              transform-origin="center"
              fill="none"
              stroke="url(#a12)"
              strokeWidth="15"
              strokeLinecap="round"
              strokeDasharray="200 1000"
              strokeDashoffset="0"
              cx="100"
              cy="100"
              r="70"
            >
              <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="2"
                values="360;0"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
              ></animateTransform>
            </circle>
            <circle
              transform-origin="center"
              fill="none"
              opacity=".2"
              stroke="#9E56FF"
              strokeWidth="15"
              strokeLinecap="round"
              cx="100"
              cy="100"
              r="70"
            ></circle>
          </svg>
        </span>
        <span className="text-lg capitalize">
          wait while we fetch your data
        </span>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-x-hidden relative">
      <Form active={active} setActive={setActive} formName={"bank"} />
      <div className="w-full flex flex-row justify-between pb-4 items-center">
        <span className="text-xl font-medium">Banks</span>
        <button
          onClick={() => setActive(!active)}
          className="bg-accent rounded-full flex flex-row items-center text-sm capitalize font-medium  py-3 px-4"
        >
          <div className="">
            <svg
              width="30"
              height="30"
              viewBox="0 0 103 122"
              fill="#9e56ff"
              xmlns="http://www.w3.org/2000/svg"
              strokeWidth="3px"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M80.5803 101.32V112.55C80.5803 115.63 79.6203 117.73 77.7003 118.82C75.7903 119.91 73.4803 119.68 70.7903 118.13L12.0703 84.2199C9.37028 82.6699 7.07027 80.2399 5.15027 76.9299C3.24027 73.6299 2.28027 70.4299 2.28027 67.3399V56.1099C2.28027 54.5199 2.75028 53.4599 3.69028 52.9199L3.97028 52.7799C4.86028 52.4199 5.93029 52.5999 7.17029 53.3199C8.56029 54.1199 9.72025 55.3299 10.6602 56.9499C11.6002 58.5599 12.0703 60.1699 12.0703 61.7599V72.9899L70.7903 106.9V95.6599C70.7903 94.0699 71.2603 93.0099 72.2003 92.4799L72.4903 92.3399C73.3703 91.9699 74.4403 92.1499 75.6803 92.8699C77.0703 93.6799 78.2303 94.8799 79.1703 96.4999C80.1103 98.1199 80.5803 99.7199 80.5803 101.32Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M63.8804 52.3699C63.8404 53.8399 63.3704 54.8799 62.4704 55.4799C61.4904 56.0399 60.3304 55.9599 58.9804 55.2299C58.0804 54.7399 57.2604 54.0299 56.5304 53.1099C56.1704 52.6599 55.8204 52.1599 55.5004 51.5999L46.3204 35.7699V75.9199C46.3204 77.5099 45.8504 78.5799 44.9104 79.1099C43.9804 79.6499 42.8104 79.5099 41.4304 78.7099C40.0404 77.9099 38.8804 76.6999 37.9404 75.0799C37.0004 73.4699 36.5304 71.8599 36.5304 70.2699V30.1199L27.3604 35.3499C26.3804 35.9099 25.2204 35.7799 23.8704 34.9499C22.5304 34.1299 21.3604 32.8699 20.3804 31.1899C19.4904 29.5399 19.0204 27.9599 18.9804 26.4399C18.9404 24.9199 19.4104 23.8799 20.3804 23.3199L38.0004 13.2799L38.2804 13.1399C38.6904 12.9699 39.1304 12.9299 39.5904 12.9999C39.8804 13.0499 40.1804 13.1399 40.4904 13.2599C40.7904 13.3799 41.1104 13.5299 41.4304 13.7099C42.0804 14.0899 42.6904 14.5599 43.2604 15.1199C43.8304 15.6899 44.3604 16.3899 44.8504 17.2399L49.0104 24.4099L56.5304 37.3799L62.4704 47.6199C63.4504 49.3099 63.9204 50.8899 63.8804 52.3699Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M32.0702 51.7599V62.9899L24.9402 66.5599L12.0702 72.9899V61.7599C12.0702 60.1699 11.6002 58.5599 10.6602 56.9499C9.72019 55.3299 8.56023 54.1199 7.17023 53.3199C5.93023 52.5999 4.86021 52.4199 3.97021 52.7799L23.6902 42.9199C24.6202 42.3899 25.7902 42.5199 27.1702 43.3199C28.5602 44.1199 29.7202 45.3299 30.6602 46.9499C31.6002 48.5599 32.0702 50.1699 32.0702 51.7599Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M78.0603 89.5499L72.4903 92.3399L72.2003 92.4799C71.2603 93.0099 70.7903 94.0699 70.7903 95.6599V106.9L12.0703 72.9899L24.9403 66.5599L32.0703 62.9899L36.5303 65.5699V70.2699C36.5303 71.8599 37.0003 73.4699 37.9403 75.0799C38.8803 76.6999 40.0403 77.9099 41.4303 78.7099C42.8103 79.5099 43.9803 79.6499 44.9103 79.1099L52.9903 75.0699L78.0603 89.5499Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M83.8802 42.3699C83.8402 43.8399 83.3702 44.8799 82.4702 45.4799L82.1403 45.6399L66.3203 53.5599L62.4702 55.4799C63.3702 54.8799 63.8402 53.8399 63.8802 52.3699C63.9202 50.8899 63.4502 49.3099 62.4702 47.6199L56.5303 37.3799L49.0103 24.4099L44.8502 17.2399C44.3602 16.3899 43.8303 15.6899 43.2603 15.1199C42.6903 14.5599 42.0802 14.0899 41.4302 13.7099C41.1102 13.5299 40.7902 13.3799 40.4902 13.2599C40.1802 13.1399 39.8803 13.0499 39.5903 12.9999C39.1303 12.9299 38.6903 12.9699 38.2803 13.1399L58.0002 3.2799C58.4902 2.9999 59.0203 2.9099 59.5903 2.9999C60.1603 3.0999 60.7802 3.3399 61.4302 3.7099C62.0802 4.0899 62.6903 4.5599 63.2603 5.1199C63.8303 5.6899 64.3602 6.3899 64.8502 7.2399L82.4702 37.6199C83.4502 39.3099 83.9202 40.8899 83.8802 42.3699Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M66.3202 53.5599V65.9199C66.3202 67.5099 65.8502 68.5799 64.9102 69.1099L44.9102 79.1099C45.8502 78.5799 46.3202 77.5099 46.3202 75.9199V35.7699L55.5002 51.5999C55.8202 52.1599 56.1702 52.6599 56.5302 53.1099C57.2602 54.0299 58.0802 54.7399 58.9802 55.2299C60.3302 55.9599 61.4902 56.0399 62.4702 55.4799L66.3202 53.5599Z"
                stroke="white"
                strokeLinejoin="round"
              />
              <path
                d="M100.58 91.3199V102.55C100.58 105.63 99.6203 107.73 97.7003 108.82L97.0903 109.12L77.7003 118.82C79.6203 117.73 80.5803 115.63 80.5803 112.55V101.32C80.5803 99.7199 80.1102 98.1199 79.1702 96.4999C78.2302 94.8799 77.0702 93.6799 75.6802 92.8699C74.4402 92.1499 73.3702 91.9699 72.4902 92.3399L78.0602 89.5499L92.2003 82.4799C93.1303 81.9399 94.3002 82.0699 95.6802 82.8699C97.0702 83.6799 98.2302 84.8799 99.1702 86.4999C100.11 88.1199 100.58 89.7199 100.58 91.3199Z"
                stroke="white"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>upload bank </span>
        </button>
      </div>
      {Bank?.filteredBanks && Bank?.filteredBanks?.length > 0 ? (
        <>
          <div className="w-full rounded-md flex px-2 py-3 my-5 bg-[#0D0D0D]">
            <Search className="pr-2" />
            <input
              className="w-full bg-transparent placeholder:capitalize outline-none"
              type="search"
              placeholder="search for Bank"
            />
          </div>
          <ul className="w-full relative  flex flex-col border-b-4 border-[#0D0D0D] py-3 gap-3 capitalize">
            {Bank?.filteredBanks &&
              Bank?.filteredBanks.map((bank) => (
                <li
                  className={` cursor-pointer bg-secondary rounded-md hover:text-accent border-2 border-primary transition-[color]  relative flex flex-row items-center justify-between overflow-hidden`}
                  key={bank.$id}
                >
                  <span
                    style={{ backgroundColor: bank.color }}
                    className={`absolute left-0 h-full w-2 bg-[${bank.color}]`}
                  ></span>
                  <div className="w-full p-4 h-full">
                    <p>{bank.BankName}</p>
                    <p>
                      {" "}
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(bank.amount)}
                    </p>
                  </div>
                  <div
                    onClick={() => {
                      toast.promise(
                        deleteBank(bank.$id),
                        {
                          loading: "Loading",
                          success: () =>
                            `Successfully deleted ${bank.$id} bank`,
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
                    }}
                    className="bg-accent w-fit h-full py-7 px-4"
                  >
                    <DeleteIcon />
                  </div>
                </li>
              ))}
          </ul>
          <div className="w-full">
            {/* <div className="bg-[#0D0D0D] p-4 rounded-md w-full">
              <div className="overflow-x-auto">
                <table className="w-full border-4 border-[#121212]">
                  <thead className="capitalize bg-[#121212]">
                    <tr>
                      <th className="p-4 text-left text-[#4f4e4e]">Merchant</th>
                      <th className="p-4 text-left text-[#4f4e4e]">Type</th>
                      <th className="p-4 text-left text-[#4f4e4e]">Category</th>
                      <th className="p-4 text-left text-[#4f4e4e]">Date</th>
                      <th className="p-4 text-left text-[#4f4e4e]">Amount</th>
                      <th className="p-4 text-left text-[#4f4e4e]">delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bank?.Bankresponse?.documents
                      .filter((item) => item?.banksId?.$id === targetId)
                      .map((row) => (
                        <tr
                          key={row.$id}
                          className="border-t-4 py-3 border-[#121212]"
                        >
                          <td className="px-4 py-2 ">{row.$id}</td>
                          <td className="px-4 py-2 ">{row.type}</td>
                          <td className="px-4 py-2 ">{row.category}</td>
                          <td className="px-4 py-2 ">{row.Date}</td>
                          <td className="px-4 py-2 ">{row.amount}</td>
                          <td
                            onClick={() => handleDelete(row.$id)}
                            className="px-4 py-2 text-accent cursor-pointer "
                          >
                            delete
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div> */}
          </div>
        </>
      ) : (
        <div className="w-full h-[calc(100lvh-200px)] flex items-center justify-center flex-col gap-5">
          <img className="w-64" src={bankIcon} alt="" />
          <span className="capitalize font-medium text-lg">
            you dont have any bank details yet
          </span>
        </div>
      )}
    </div>
  );
}

export default Bank;
