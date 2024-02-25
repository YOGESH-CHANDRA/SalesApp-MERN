const SalesData = require("../Modals/salesDataModal");

const getData = async (req, res) => {
  try {
    console.log("geting data");
    const salesDatas = await SalesData.find({user:req.user._id});
    // const salesDatas = await SalesData.find();
    return res.status(200).json(salesDatas);
  } catch (error) {
    // console.log("Sales Record not found ", error);
    return res.status(500).send("Internal Server Error");
  }
};

//  Add data in sales app
const addData = async (req, res) => {
  const { salesId, productName, quantity, salesAmount } = req.body;
  // console.log(req.user._id);

  try {
    if (!salesId || !productName || !quantity || !salesAmount) {
      res.status(400).send("All field required");
    }
    const salesDataAdded = await SalesData.create({
      salesId,
      productName,
      quantity,
      salesAmount,
      userId:req.user._id
    });

    salesDataAdded.save();
    // console.log(salesDataAdded);
    return res.status(201).json("Data inserted");
  } catch (error) {
    console.log(error);
   return res
      .status(500)
      .send("Internal server error");
  }
};

// top5salesData
const top5sales = async (req, res) => {
  try {
    console.log("geting data");
    const top5sales = await SalesData.find({userId:req.user._id})
      .sort({ salesAmount: -1 })
      .limit(5);
    
   return res.status(200).send(top5sales);
  } catch (error) {
    return res.status(500).send("Internal Server Error")
  }
};

// total revenue...
const totalRevenue = async (req, res) => {
  try {
    const salesDatas = await SalesData.find({userId:req.user._id});
    if (!salesDatas) {
     return res.status(400).json({ message: "Data not found" });
    }
    const Revenue = salesDatas.reduce((acc, currentData) => {
      return acc + Number(currentData.salesAmount);
    }, 0);
    res.status(200).json({ Revenue });
  } catch (error) {
   return res.status(500).json("Internal server error");
  }
};

module.exports = { getData, addData, top5sales, totalRevenue };
