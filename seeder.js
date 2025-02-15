const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({ path: './config/.env' });
const Book = require('./models/Book');

mongoose.connect(process.env.MONGO_URI)

const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, 'utf-8'));

const importData = async() => {
    try {
        await Book.insertMany(books);
        console.log(`DATA IMPORTED`)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deletedData = async() => {
    try {
        await Book.deleteMany();
        console.log(`DELETED Data`)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}
if(process.argv[2] === '-i'){
    importData();
}else if(process.argv[2] === '-d'){
    deletedData();
}