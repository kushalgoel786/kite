import { Form, redirect, useNavigation } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    const resp = await customFetch.post("/order/place-order", data);
    const { message, order_id } = resp.data;
    toast.success(`${message}: ${order_id}`);
    return redirect("/dashboard");
  } catch (error) {
    console.log(error);
    toast.error(error?.response?.data?.msg ?? error.message);
    return error;
  }
};

const Order = () => {
  const navigation = useNavigation();

  return (
    <div>
      <Form method="post">
        <div className="flex flex-col justify-start">
          <h3 className="text-xl font-semibold mb-4">Place an Order</h3>
          <div className="flex items-center mb-4">
            <label className="text-lg w-24" htmlFor="symbol">
              Symbol
            </label>
            <select            
              className="p-2 w-48 mr-8 outline outline-gray-300 border-r-8 border-transparent rounded focus:outline-blue-500 focus:outline-2"
              id="symbol"
              name="symbol"
              required>
              <option value="NIFTY 50">NIFTY 50</option>
              <option value="NIFTY BANK">NIFTY BANK</option>
            </select>
          </div>
          <div className="items-center flex mb-4">
            <label className="text-lg w-24" htmlFor="quantity">
              Quantity
            </label>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              defaultValue={0}
              name="quantity"
              step="1"
              id="quantity"
            />
          </div>
          <div className="items-center mb-2 flex">
            <label className="text-lg w-24" htmlFor="price">
              Price
            </label>
            <input
              className="border border-gray-300 p-2 rounded"
              type="number"
              step=".01"
              defaultValue="0.00"
              name="price"
              id="price"
            />
          </div>
          <div className="mt-4 font-medium text-lg">
            <button
              type="submit"
              className="inline w-32 mr-7 ml-1 bg-blue-500 text-white py-1 px-4 rounded-lg">
              Buy
            </button>
            <button
              type="submit"
              className="inline w-32 bg-red-500 text-white py-1 px-4 rounded-lg">
              Sell
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Order;
