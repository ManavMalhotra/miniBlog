const express = require('express');
const router = express.Router();
const articleSchema = require('./../models/schema.js');

router.get('/new',(req,res)=>{
	res.render('new.ejs');
})

router.get('/:id/read', async(req,res)=>{
	let content = await articleSchema.findById(req.params.id);
	try{
		if (content==null) res.statusCode(404);
		res.render('article',{articles:content})

	}catch(e){
		console.log(e)
	}
})

router.get('/:id/edit', async(req,res)=>{
	let content = await articleSchema.findById(req.params.id);
	try{
		if (content==null) res.statusCode(404);
		res.render('edit',{articles:content})

	}catch(e){
		console.log(e)
	}
	
})


router.post('/',(req,res)=>{
	let article = new articleSchema({
			title: req.body.title,
			description:req.body.description,
			content:req.body.content
		})
	
	article.save();
	res.redirect('/');

})

router.delete("/:id",async (req,res)=>{
	console.log(req.params.id)
	await articleSchema.findByIdAndDelete(req.params.id);
	res.redirect('/')
})

router.put("/:id",async (req,res)=>{
	console.log(req.params.id)
	let article = await articleSchema.findByIdAndUpdate(req.params.id,{
			title: req.body.title,
			description:req.body.description,
			markdown:req.body.markdown
		});
	
	await article.save();
	res.redirect('/');
})

module.exports = router;