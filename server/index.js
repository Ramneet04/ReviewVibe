const express = require('express');
const dotenv = require("dotenv");
const Dbconnect = require('./config/database');
const router = require('./routes/review');
const cors = require('cors');
const app = express();
dotenv.config();
const PORT = process.env.PORT || 8000;
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);
app.use(express.json());
Dbconnect();

app.use('/api/v1/review', router);

app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
} )

