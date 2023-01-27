const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
  name: { type: String, required: true },
  done: { type: Boolean, default: false },
  checklist: { 
    //referencia
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Checklist',
    required: true
   }
})

module.exports = mongoose.model('Task', taskSchema)