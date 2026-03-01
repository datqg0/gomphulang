const app = require('./src/app');
const connectDB = require('./src/config/db');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
