function Modal({ loading, setLoading }) {
  return (
    <div
      className={`fixed transition-transform duration-500 ease-in-out ${
        loading ? "translate-y-0" : "translate-y-full"
      } inset-x-0 bottom-0 w-full max-w-[400px] h-[300px] rounded-t-xl bg-[#0d0d0d] text-white flex flex-col items-center justify-center`}
    >
      <div className="w-full grid place-items-center pb-5 gap-2">
        <h1 className="text-lg capitalize font-medium">
          {loading ? "loading.." : "you are in "}
        </h1>
        <h1 className="text-sm capitalize font-medium">
          give us a minue while we create your acct
        </h1>
      </div>
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
    </div>
  );
}

export default Modal;
