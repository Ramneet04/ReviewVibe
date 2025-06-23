const express = require('express');
const dotenv = require("dotenv");
const Dbconnect = require('./config/database');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 4000;
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
Dbconnect();

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
} )

