const mongoose = require('mongoose');


const TodosSchema= mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    
    // todos: [
    //     {title:String, description:String}
    // ]
}, {
    timestamps: true
}
);

const Todos= mongoose.model('Todos', TodosSchema);

module.exports=Todos;