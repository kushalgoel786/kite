import { redirect, useLoaderData } from "react-router-dom";
import customFetch from "../utils/customFetch";

export const loader = async () => {
  try {
    const { data } = await customFetch("/portfolio/holdings");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const Holdings = () => {
  const { data } = useLoaderData();
  const totalProfitLoss = data.reduce((total, holding) => {
    return total + holding.pnl;
  }, 0);

  return (
    <div>
      <div className="mb-12 px-20 pt-6 pb-4 bg-white border border-gray-200 rounded shadow-sm flex items-center justify-between">
        <div>
          <div className="font-normal text-sm text-gray-600 mb-1">Invested</div>
          <div className="text-gray-600 mb-2 text-2xl font-medium tracking-tight">
            123.67
          </div>
        </div>
        <div>
          <div className="font-normal text-sm text-gray-600 mb-1">
            Present Value
          </div>
          <div className="text-gray-600 mb-2 text-2xl font-medium tracking-tight">
            134.94
          </div>
        </div>
        <div>
          <div className="font-normal text-sm text-gray-600 mb-1">
            Total P&L
          </div>
          <div className="text-green-600 mb-2 text-2xl font-medium tracking-tight">
            {totalProfitLoss.toFixed(2)}
          </div>
        </div>
        <div>
          <div className="font-normal text-sm text-gray-600 mb-1">P&L</div>
          <div className="text-green-600 mb-2 text-2xl font-medium tracking-tight">
            9.11 <p className="inline text-sm">%</p>
          </div>
        </div>
      </div>
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase">
          <tr>
            <th>Symbol</th>
            <th>Exg.</th>
            <th>ISIN</th>
            <th>Qty.</th>
            <th>Auth. Date</th>
            <th>Avg. Price</th>
            <th>Last Price</th>
            <th>Close Price</th>
            <th>PNL</th>
            <th>Day Change</th>
            <th>Day Change %</th>
          </tr>
        </thead>
        <tbody>
          {data.map((holding, index) => (
            <tr key={index}>
              <td>{holding.tradingsymbol}</td>
              <td>{holding.exchange}</td>
              <td>{holding.isin}</td>
              <td>{holding.quantity}</td>
              <td>
                {new Date(holding.authorised_date).toDateString().slice(4)}
              </td>
              <td>{holding.average_price}</td>
              <td>{holding.last_price}</td>
              <td>{holding.close_price}</td>
              <td>{holding.pnl.toFixed(2)}</td>
              <td>{holding.day_change.toFixed(2)}</td>
              <td>{holding.day_change_percentage.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Holdings;
