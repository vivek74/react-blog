const express = require("express");
const router = express.Router();
// Load Blog model
const Blog = require("../../models/Blog");


//adding blog
router.post("/newBlog", (req, res) => {
    Blog.create(req.body, (err, data)=>{
		if(err){
			res.status(404).json({ err: "Error adding blog" });
		} else{
			Blog.find({}).then((data,err) =>{
				if(err){
					res.status(404).json({ err: "Something went wrong" });
				} else{
					res.status(200).json(data);
				}
			})
		}
	});
});

//Show all blogs
router.get("/blogs",(req,res)=>{
    Blog.find({}).then((data,err) =>{
        if(err){
            console.log(err);
			res.status(404).json({ err: "Something went wrong" });
		} else{
			res.status(200).json(data);
		}
    })
})

//One blog
router.get("/:id", (req, res)=>{
	Blog.findById(req.params.id, (err, data) => {
		if(err){
			res.status(404).json({ err: "Something went wrong" });
		} else {
			res.status(200).json(data);
		}
    });
});

//update blog
router.put("/blogs/:id",(req, res) => {
	Blog.findByIdAndUpdate(req.params.id, req.body, (err, data) => {
		if(err){
			res.status(404).json({ err: "Something went wrong" });
		} else{
            Blog.findById(req.params.id, (err, data) => {
                if(err){
                    res.status(404).json({ err: "Something went wrong" });
                } else {
                    res.status(200).json(data);
                }
            });
		}
	});
});

//delete blog
router.delete("/blogs/:id", (req, res) => {
	Blog.findByIdAndRemove(req.params.id, (err) => {
		if(err){
			res.status(404).json({ err: "Something went wrong in deleting" });
		} else {
            Blog.find({}).then((data) =>{
                res.status(200).json(data);
            })
		}
	})
});

module.exports = router;