const mongoose = require('mongoose');
const app = require('./app');


const PORT = process.env.PORT || 4000;


// Connect to MongoDB
const connectDb = async () => {
    try{
        await mongoose.connect('mongodb://localhost:27017');
    }
    catch(error){
        console.log(error);
        process.exit(1);
    }
}

app.listen(PORT, async () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    await connectDb();
});

