const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../model/listing.js");
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(() => {
    console.log(`Connected to DataBase`);
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async (req, res) => {
    // if data available on  database create time (1)
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({ ...obj, owner: '67eb64d2f8e09283d073bd9c' }))
    await Listing.insertMany(initData.data);
    console.log(`Data was initialized`);
};

initDB();


