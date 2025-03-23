const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const Book = require('./models/Book');
const User = require('./models/User');
const bcrypt = require("bcrypt");
mongoose.connect(process.env.MONGO_URI)

const books = JSON.parse(fs.readFileSync(`${__dirname}/_data/books.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

const importData = async () => {
    try {
        const salt = await bcrypt.genSalt(10);
        for (let user of users) {
            user.password = await bcrypt.hash(user.password, salt);
        }
        await Book.insertMany(books);
        await User.insertMany(users);
        console.log(`DATA IMPORTED`)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}

const deletedData = async () => {
    try {
        await Book.deleteMany();
        await User.deleteMany();
        console.log(`DELETED Data`)
        process.exit()
    } catch (error) {
        console.log(error)
    }
}
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deletedData();
}