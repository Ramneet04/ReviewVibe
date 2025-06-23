const mongoose = require("mongoose");
require("dotenv").config();

const { MONGO_URI } = process.env;

const Dbconnect = () => {
	mongoose
		.connect(MONGO_URI)
		.then(console.log(`DB Connection Success`))
		.catch((err) => {
			console.log(`DB Connection Failed`);
			console.log(err);
			process.exit(1);
		});
};
module.exports = Dbconnect;
