const express = require('express');
const mongoose = require('mongoose');
const Todos = require('./model/todos'); //modal

const app = express();
app.use(express.json());



//routes
app.get('/',(req,res)=> {
    res.send('Hello NODE API');
})

//main route
app.get('/todolist',(req,res)=> {
    res.send('To-Dos Lists');
})


//Create todos - Save data in dB

app.post('/todo', async(req, res) => {
    try {
        const todo = await Todos.create(req.body)
        res.status(200).json(todo);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})


//Read todos - Fetch data from dB

app.get('/todos', async(req, res) => {
    try {
        const todos = await Todos.find({});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Find todo - get a specific id - used in Update and Delete Operations

app.get('/todo/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todos.findById(id);
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Update todo - edit data in dB

app.put('/todo/:id', async(req, res)=> {
    try {
        const {id} = req.params;
        const todo = await Todos.findByIdAndUpdate(id, req.body);
        //if cannot find todo to update in dB
        if(!todo){
            return res.status(404).json({message: `cannot find the To-do list with this ID ${id}`})
        }
        const updatedTodo = await Todos.findById(id);
        res.status(200).json(updatedTodo);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//Delete todo - The final CRUD

app.delete('/todos/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await Todos.findByIdAndDelete(id);
        if(!todo){
            return res.status(404).json({message: `cannot find the To-do list with this ID ${id}`})
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//connect to mongo

async function connectToDb() {
    ( mongoose.connect("mongodb://localhost:27017/todolists")).then(r=>{
        console.log("connect to mongodb")
    }).catch(err=>{
        console.log(err,"---------------")
    })
}

connectToDb();

app.listen(3000, ()=>console.log('running on port 3000'));