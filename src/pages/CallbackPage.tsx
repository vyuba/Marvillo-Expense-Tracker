import { useEffect } from "react";
import { useUser } from "../utils/script";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

function CallbackPage() {
  const { handleCallback } = useUser();
  const { loggedInUser } = useAppContext();
  useEffect(() => {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const userId = params.get("userId");
    const secret = params.get("secret");
    toast.promise(
      handleCallback(userId, secret),
      {
        loading: "Logging",
        success: () => `Successfully Logged in ${loggedInUser?.name}`,
        error: (err) => `error: ${err.toString()}`,
      },
      {
        style: {
          minWidth: "150px",
        },
        success: {
          duration: 3000,
          icon: "✅",
        },
        error: {
          duration: 3000,
          icon: "💀",
        },
      }
    );
  }, [loggedInUser, handleCallback]);
  return (
    <div className="w-full h-screen bg-background flex items-center justify-center flex-col gap-5">
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
      <span className="text-lg capitalize text-white">
        you will be redirected to the app in a few seconds
      </span>
    </div>
  );
}

export default CallbackPage;
