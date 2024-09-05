import { Chart } from "../components";
import useWebSocket from "react-use-websocket";

const Home = () => {
  const WS_URL = "wss://tropical-helaina-kushalgoel-0361bc21.koyeb.app/";
  const { lastJsonMessage } = useWebSocket(WS_URL, {});

  return (
    <div className="h-full w-full">
      <div className="font-bold text-lg mb-7 flex space-x-12 mr-12">
        <div className="h-24 w-1/2 px-4 py-4 shadow rounded">
          <p className="mb-2">NIFTY 50</p>
          <div className="font-semibold text-3xl">
            {lastJsonMessage ? (
              <p
                className={
                  lastJsonMessage.up ? "text-green-500" : "text-red-500"
                }>
                {lastJsonMessage.nifty50}
              </p>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </div>
        </div>
        <div className="h-24 w-1/2 px-4 py-4 shadow rounded">
          <p className="mb-2">SENSEX</p>
          <div className="font-semibold text-3xl">
            {lastJsonMessage ? (
              <p
                className={
                  lastJsonMessage.up ? "text-green-500" : "text-red-500"
                }>
                {lastJsonMessage.sensex}
              </p>
            ) : (
              <p className="text-gray-400">Loading...</p>
            )}
          </div>
        </div>
      </div>
      <Chart></Chart>
    </div>
  );
};

export default Home;
