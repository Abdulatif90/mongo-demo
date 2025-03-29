import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI,{
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

const bookSchema = new mongoose.Schema({
    name: { type: String, required: true },
    author: { type: String, required: true },
    tags: [String], 
    data : {type: Date, default : Date.now},  //  Kitobga tegishli teglar ro'yxati. Bu String turlaridan iborat bo'lgan array (massiv).
    isPublished: Boolean // Kitobning chop etilgan yoki etilmaganligini bildiradi. Boolean turi, qiymati true (chop etilgan) yoki false (chop etilmagan) bo'lishi mumkin.
});

// birinchi schemedan class yaratiladi , undan kn classdan object yasab mongo dbga soxranit qilamiz
// mongoose.model ni chaqiramiz bu 2 ta oargument qabul qiladi. 1 chi argument yaratilayotgan class 2 argument bu schema 
// Book degan clas yarailyapti

const Book = mongoose.model("books",bookSchema);

async function createBook() {
    try{
    const book = new Book ({
    name: 'working on Mongodb ',
    author: 'Abdulatif',
    tags: ['MongoDb', 'work '],
    isPublished: true
});

const savedBook = await book.save();
// console.log('Saqlangan kitob',savedBook);
} 
catch(err){
    console.log(err);
}
};

createBook();

// kitonlarni bazadan olish

async function getBooks() {
    // bu kitoblarning hammasini olish uchun
    // const books = await Book.find();

    //kitoblarni malum bir criterialar orqali olish

    const books = await Book.find({
        author: 'Abdulatif', 
        isPublished: true  // bu author va isPublisher ga ko`ra kitoblarni olish
    })
        .limit(2) // faqat 2 donasini olish
        .sort({name:1})  // 1 bu name oladi, 0 esa nameni qiymatini olmaydi
        .select({name:1 , tags:1}) // name ni oladi lekin tags larni olmaydi. lekin tags ham qiymat berish orqali datalarni topish mumkin

    console.log('olingan kitoblar',books);
};
    getBooks();
















