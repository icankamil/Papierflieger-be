const { Flight } = require('../models');

const getFlight = async (req, res) => {
  try {
    const dataFlight = await Flight.findAll();
    res.status(200).json({
      dataFlight,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const getFlightById = async (req, res) => {
  try {
    const { flightNumber } = req.params;
    const flight = await Flight.findOne({ where: { flightNumber } });
    res.status(200).json({
      flight,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const addFlight = async (req, res) => {
  try {
    console.log(req.body);
    const {
      flightNumber,
      airplaneCode,
      flightFrom,
      flightTo,
      depatureTime,
      arrivalTime,
      totalTransit,
      transitPoint,
      transitDuration,
    } = req.body;
    const newFlight = await Flight.create({
      flightNumber,
      airplaneCode,
      flightFrom,
      flightTo,
      depatureTime,
      arrivalTime,
      totalTransit,
      transitPoint,
      transitDuration,
    });
    res.status(200).json({
      message: 'data berhasil ditambahkan',
      newFlight,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const updateflight = async (req, res) => {
  try {
    const { flightNumber } = req.params;
    await Flight.update(req.body, { where: { flightNumber } });
    res.status(200).json({
      message: 'data berhasil diubah',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

const deleteFlight = async (req, res) => {
  try {
    const { flightNumber } = req.params;
    await Flight.delete({ where: { flightNumber } });
    res.status(200).json({
      message: 'data berhasil dihapus',
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getFlight,
  getFlightById,
  addFlight,
  updateflight,
  deleteFlight,
};