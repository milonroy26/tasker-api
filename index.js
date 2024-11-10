const mongoose = require('mongoose');
const app = require('./app');


const PORT = process.env.PORT || 4000;


// Connect to MongoDB
const connectDb = async () => {
    try{
        await mongoose.connect('mongodb+srv://milonchandro35:9gvhp1qBGCaqtj33@todo.q9my8.mongodb.net/?retryWrites=true&w=majority&appName=mndb')
        console.log('Connected to MongoDB');
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

