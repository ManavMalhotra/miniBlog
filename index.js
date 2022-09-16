const express = require('express');
const path = require('path');
const articleRoute = require('./routes/article.js');
const mongoose = require('mongoose');
const articleSchema = require('./models/schema.js');
const methodOverride = require('method-override');

let port = process.env.PORT || 3000;

let url = '//MONGODB URI HERE';

mongoose.connect(url);
let db = mongoose.connection;
db.on('error', (error)=>{console.log(error)});
db.once('open', ()=>{console.log("Successfully conected to database")});

const app = express();

app.set('view engine','ejs')

app.set("views", path.join(__dirname,"views"))

app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.use('/articles',articleRoute)

app.get('/',async (req,res)=>{

	let articleData = await articleSchema.find().sort({createdAtDate:-1});

	res.render('index',{
		articles:articleData
	})

})

app.listen(port)
