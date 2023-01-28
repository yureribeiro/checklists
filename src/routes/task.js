const express = require('express')

const checklistDependentRoute = express.Router() //tasks dependentes de uma Lista
const simpleRoute = express.Router() //não necessita de um ID

const Checklist = require('../models/checklist')
const Task = require('../models/task')

checklistDependentRoute.get('/:id/tasks/new', (req, res) => {
  try {
    let task = new Task()
    res.status(200).render('tasks/new', { checklistId: req.params.id, task: task})
  } catch (error) {
    res.status(422).render('pages/error', { error: 'Erro ao carregar formulário' })
  }
})

simpleRoute.delete('/:id', async (req, res) => {
  try {
    let task = await Task.findByIdAndDelete(req.params.id)
    let checklist = await Checklist.findById(task.checklist)
    let taskToRemove = checklist.tasks.indexOf(task._id)
    checklist.tasks.splice(taskToRemove, 1)
    checklist.save()
      res.redirect(`/checklists/${checklist._id}`)
  } catch (error) {
    res.status(422).render('pages/error', { error: 'Erro ao remover uma tarefa' })
  }
})

checklistDependentRoute.post('/:id/tasks', async (req, res) => {
  let { name } = req.body.task
  let task = new Task({ name, checklist: req.params.id })

    try {
      //relacione task com checklist
      await task.save()
      let checklist = await Checklist.findById(req.params.id)
      checklist.tasks.push(task)
      await checklist.save()
      res.redirect(`/checklists/${req.params.id}`)
  } catch (error) {
    let errors = error.errors
      res.status(422).render('tasks/new', { task: {...task, errors }, cheklistId: req.params.id })
  }
})



module.exports = { 
  checklistDependent: checklistDependentRoute,
  simple: simpleRoute
}