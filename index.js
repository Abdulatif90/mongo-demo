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



const SizeSchema = new mongoose.Schema({
    h: Number,
    w: Number,
    uom: String
});

const inventorySchema = new mongoose.Schema({
    item : String,
    qty : Number, 
    size : SizeSchema,
    status : String ,
},{collection: 'invertory'});   // agar bu yerda collection ni nomini berilmasa database inventories deb folder ochib qo`yadi 

const Inventory = mongoose.model('invertory', inventorySchema); // bu inventorySchema ga asoslanib intentory collection yaratiladi
async function getInventoryItems(){
    return await Inventory
    .find()
    .or([
            { qty: { $lte: 50 } },
            { item: /.*l*./i } // bu yerda item ichida l harfi bor bo`lsa yoki qty 50 dan kam bo`lsa shularni chiqaradi
    ])
    .sort({qty : -1})  //  bu qty ni kamayish tartibida chiqaradi. agar qty: 1 bolsa, o`sish tartibida chiqaradi 
    .select({item: 1, qty: 1, _id: 0}) // bu 1 lar required hisoblaninb bu data olinishi kerak degan , 0 esa bizga olinishi shart emas
    
}


async function run (){
    const items = await getInventoryItems();
    console.log(items);
};
run();


    














