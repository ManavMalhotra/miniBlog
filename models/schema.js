const mongoose = require('mongoose');

const articles = new mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	createdAtDate:{
		type:Date,
		default:Date.now
	},
	description:{
		type:String,
	},
	content:{
		type:String,
	}
})

module.exports = mongoose.model('Article',articles); 