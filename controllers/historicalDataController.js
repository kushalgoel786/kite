import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import { HistoricalData } from "../server.js";

export const getHistoricalData = async (req, res) => {
  const historicalData = await HistoricalData.findAll({
    where: {
      symbol: req.query.symbol,
      date: {
        [Op.gte]: req.query.from_date,
        [Op.lte]: req.query.to_date,
      },
    },
  });

  const formattedData = historicalData.map((data) => {
    return {
      x: data.date,
      y: data.price,
    };
  });

  res
    .status(StatusCodes.OK)
    .json({ symbol: req.query.symbol, prices: formattedData });
};
