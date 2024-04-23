const { default: mongoose } = require("mongoose");

const Schema = new mongoose.Schema({
    title:{
       type:String,
       require:true 
    },
    description:{
        type:String,
        require:true
    },
    isCompleted:{
        type:Boolean,
        default:false
    }
},{
    timeStamp:true
})

const TodoModel = mongoose.models.todo || mongoose.model('todo', Schema);

export default TodoModel;