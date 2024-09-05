import { ResponsiveLine } from "@nivo/line";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";

const fetchHistoricalData = async (query) => {
  try {
    const { data } = await customFetch("/historical-data", {
      params: query,
    });
    return data;
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return error;
  }
};

const Chart = () => {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState({
    symbol: "NIFTY 50",
    from_date: "2019-01-01",
    to_date: "2021-01-31",
  });

  useEffect(() => {
    fetchHistoricalData(query).then((data) => setData(data));
  }, [query]);

  return (
    <div className="flex items-stretch flex-col h-5/6 w-full">
      <div className="flex justify-start items-center">
        <div className="w-1/2">
          <p className="text-2xl font-semibold">Browse Historical Data</p>
        </div>
        <div className="flex w-1/2 justify-between">
          <select
            className="p-2 mr-8 outline outline-gray-300 border-r-8 border-transparent rounded-md focus:outline-blue-500 focus:outline-2"
            id="symbol"
            name="symbol"
            onChange={(e) => {
              setQuery((old) => ({ ...query, symbol: e.target.value }));
            }}>
            <option value="NIFTY 50">NIFTY 50</option>
            <option value="NIFTY BANK">NIFTY BANK</option>
          </select>
          <input
            className="p-2 mr-8 border border-gray-300 rounded-md"
            type="date"
            name="from_date"
            id="from_date"
            defaultValue="2019-01-01"
            onChange={(e) => {
              setQuery((old) => ({
                ...query,
                from_date: e.target.value.toString(),
              }));
            }}
          />
          <input
            className="p-2 mr-12 border border-gray-300 rounded-md"
            defaultValue="2021-01-31"
            type="date"
            name="date"
            id="date"
            onChange={(e) => {
              setQuery((old) => ({
                ...query,
                to_date: e.target.value.toString(),
              }));
            }}
          />
        </div>
      </div>
      {data && (
        <div className="h-5/6 w-full">
          <ResponsiveLine
            margin={{ top: 20, right: 50, bottom: 50, left: 50 }}
            enableGridX={false}
            enablePoints={false}
            isInteractive={true}
            xFormat="time:%Y-%m-%d"
            enableSlices="x"
            colors={{ scheme: "category10" }}
            animate={false}
            xScale={{
              type: "time",
              format: "%Y-%m-%d",
              precision: "day",
            }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
            }}
            axisLeft={{
              tickSize: 0,
              tickPadding: 20,
              tickValues: 5,
            }}
            axisBottom={{
              format: "%Y-%m-%d",
              tickValues: 5,
              tickPadding: 20,
              tickSize: 0,
            }}
            curve="natural"
            data={[{ id: data.symbol, data: data.prices }]}></ResponsiveLine>
        </div>
      )}
    </div>
  );
};

export default Chart;
