import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="bg-white flex flex-col min-h-screen justify-center items-center">
      <div className="h-28 w-32">
        <img src="/kite-logo.svg" alt="" />
      </div>
      <h1 className="text-4xl font-semibold mb-2">Kite</h1>
      <div className="flex inline text-xl font-medium mb-12">
        <p>by</p>
        <p className="text-blue-600 font-semibold ml-1">Zerodha</p>
      </div>
      <Link
        to="/login"
        className="mb-3 bg-orange-600 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded">
        Login
      </Link>
      <p className="text-lg font-normal">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="transition text-orange-500 font-semibold hover:text-orange-600">
          Register
        </Link>
      </p>
    </main>
  );
};

export default Landing;
