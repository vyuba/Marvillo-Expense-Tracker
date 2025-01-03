import Bolt from "../assets/bolt.svg";

function ComingSoon() {
  return (
    <div className="w-full h-screen flex gap-3 items-center flex-col justify-center">
      <img className="w-52 md:w-64" src={Bolt} alt="" />
      <span className="capitalize font-medium text-lg">
        currently working on this Feature{" "}
      </span>
    </div>
  );
}

export default ComingSoon;
