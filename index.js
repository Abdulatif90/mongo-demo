import mongoose from 'mongoose';
mongoose.connect('  mongodb+srv://abdulatifsh90:lBc818c1UnaTYqFl@cluster0.1xkj2.mongodb.net/test',{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
    .then(() => { 
    console.log('MongoDB is successfully connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// bu bookSchemada qatiy belgilangan qiymatlarni berib yuboramiz.

const  bookSchema = new mongoose.Schema ({
    name : String,
    author: String,
    tags : [String], 
    data : {type: Date, default : Date.now},  // bu obyekt va uning default qiymati qandayligini bildiriladi
    isPublished : Boolean // publish qilibnganni yuqmi 
});