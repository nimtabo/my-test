const Product = require('../models/productModel')
const Car = require('../models/carModel')

const carCtrl = {
  addCar: async (req, res) => {
    try {
      const {
        make, model, year, engine, category, parts
      } = req.body;

      if (!make || !model || !year || !engine || !category || !parts)
        return res.status(400).json({ msg: "Please fill in all fields." })

      const newCar = new Car({
        make, model, year, engine, category, parts
      });
      const savedCar = await newCar.save();
      res.json({ msg: "Car Created Successfully!", car: savedCar })
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  getAllCars: async (req, res) => {
    try {
      const cars = await Car.find({});
      if (!cars) {
        return res.status(400).json({
          message: "No Car exist!",
        });
      }
      res.json(cars);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCar: async (req, res) => {
    try {
      const car = await Car.find({ _id: req.params.id });
      if (!car) {
        return res.status(400).json({
          message: "Car doesn't exist!",
        });
      }
      res.json(car);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  updatCar: async (req, res) => {
    try {
      const {
        make, model, years, engine, category, parts
      } = req.body;

      if (!make || !model || !years || !engine || !category || !parts)
        return res.status(400).json({ msg: "Please fill in all fields." })

      const updatedCar = await Car.findOneAndUpdate({ _id: req.params.id }, {
        make, model, years, engine, category, parts
      })
      res.json({ msg: "Car Update Success!", car: updatedCar })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  deleteCar: async (req, res) => {
    try {
      await Car.findOneAndDelete({ _id: req.params.id })

      res.json({ msg: "Car Deleted Success!" })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getMakes: async (req, res) => {
    try {
      const makes = await Car.distinct("make");
      if (!makes) {
        return res.status(400).json({
          message: "No Make exist!",
        });
      }
      res.status(200).json(makes);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getModels: async (req, res) => {
    try {
      const { make } = req.params;
      const models = await Car.distinct("model", { make })
      if (!models) {
        return res.status(400).json({
          message: "No Model exist!",
        });
      }
      res.status(200).json(models);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getYears: async (req, res) => {
    try {
      const { make, model } = req.params;
      const years = await Car.distinct("year", { make: make, model: model })
      if (!years) {
        return res.status(400).json({
          message: "No Years exist!",
        });
      }
      res.status(200).json(years);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getEngine: async (req, res) => {
    try {
      const { make, model, year } = req.params;
      const engine = await Car.distinct("engine", { make: make, model: model, year: year })
      if (!engine) {
        return res.status(400).json({
          message: "No Engine exist!",
        });
      }
      res.status(200).json(engine);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getCategory: async (req, res) => {
    try {
      const { make, model, year, engine } = req.params;
      const category = await Car.distinct("partcategory", { make: make, model: model, year: year, engine: engine })
      if (!category) {
        return res.status(400).json({
          message: "No Category exist!",
        });
      }
      res.status(200).json(category);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getParts: async (req, res) => {
    try {
      const { make, model, year, engine, category } = req.params;
      const parts = await Car.find({ make: make, model: model, year: year, engine: engine, partcategory: category }, { parts: 1, _id: 0 })
      if (!parts) {
        return res.status(400).json({
          message: "No Parts exist!",
        });
      }
      res.status(200).json(parts[0]);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
  getPartsMin: async (req, res) => {
    try {
      const { make, model, year } = req.params;
      const parts = await Car.distinct('parts', { make: make, model: model, year: year });
      // const parts = await Car.find({ make: make, model: model, year: year }, { parts: 1, _id: 0 })
      if (!parts) {
        return res.status(400).json({
          message: "No Parts exist!",
        });
      }
      return res.status(200).json(parts);
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  }

}

module.exports = carCtrl;