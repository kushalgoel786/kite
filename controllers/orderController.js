import { StatusCodes } from "http-status-codes";

export const placeOrder = async (req, res) => {
  res.status(StatusCodes.OK).json({
    message: "Order Placed Successfully",
    order_id: "151220000000000",
  });
};
