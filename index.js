const express = require("express");
const app = express();
const {v4: uuidv4 } =require('uuid');
const methodOverride = require('method-override');

const port = 8585;

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));

let post = [
    {
        id : uuidv4(),
        username : "Apna college",
        content : "I love coding"
    },
        {
        id : uuidv4(),
        username : "Akshat Sohani",
        content : "I am IRON-MAN"
    },
        {
        id : uuidv4(),
        username : "Tony Stark",
        content : "YES, He is IRON-MAN"
    }
];

app.get("/",(req,res)=>{
    res.render("index.ejs",{post})
});

app.listen(port,()=>{
    console.log("listning on port")
});

app.set("view engine","ejs");

app.get("/new/post",(req,res)=>{
    res.render("new.ejs");
});


app.post("/post",(req,res)=>{
    let {username,content} = req.body;
    let id = uuidv4();
    let a = {id,username,content};
    post.push(a);
    res.redirect("/");
    console.log(post);
});

app.get("/post/:id",(req,res)=>{
    let {id} = req.params;
    let posts = post.find((p)=>id===p.id);
    res.render("showid.ejs",{posts});
});

app.get("/edit/post/:id",(req,res)=>{
    let {id}= req.params;
    let posts =post.find((p)=>id===p.id);
    res.render("editform.ejs",{posts });
});

app.patch("/posts/:id",(req,res)=>{
    let {id}= req.params;
    let newcontent = req.body;
    let posts = post.find((p)=>id===p.id);
    posts.content = newcontent.content;
    console.log(posts);
    res.redirect("/");
});

app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
    posts = post.find((p)=>id=== p.id);
    post.pop(posts);
    res.redirect("/");
});