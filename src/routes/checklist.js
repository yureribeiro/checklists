const express = require('express')
const checklist = require('../models/checklist')
const router = express.Router()
const Checklist = require('../models/checklist')

//get
router.get('/', async (req, res) => {
  try {
    let checklists = await Checklist.find({})
     res.status(200).render('checklists/index', { checklists: checklists})
  } catch (error) {
     res.status(500).render('pages/error', { error: 'Erro ao exibir Lista de Tarefas' })
  }
})

router.get('/new', async (req, res) => {
  try {
    let checklist = new Checklist()
     res.status(200).render('checklists/new', { checklist: checklist })
  } catch (error) {
     res.status(500).render('pages/error', { error: 'Erro ao carregar formulário' })
  }
})

//buscar uma checklist para EDIÇÃO
router.get('/:id/edit', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id)
     res.status(200).render('checklists/edit', { checklist: checklist})
  } catch (error) {
     res.status(500).render('pages/error', { error: 'Erro a edição de Lista de Tarefas' })
  }
})

//post
router.post('/', async (req, res) => {
  let {name} = req.body.checklist
  let checklist = new Checklist({ name })

  try {
    await checklist.save()
     res.redirect('/checklists')
  } catch (error){
     res.status(422).render('checklists/new', { checklist: {...checklist, error} })
  }
})

//get (id)
router.get('/:id', async (req, res) => {
  try {
    let checklist = await Checklist.findById(req.params.id).populate('tasks')
     res.status(200).render('checklists/show', { checklist: checklist})
  } catch (error) {
     res.status(500).render('pages/error', { error: 'Erro ao exibir Lista de Tarefas'})
  }
})

//Editar Uma checklist
router.put('/:id', async (req, res) => {
 let { name } = req.body.checklist
 
  try {
     await Checklist.findByIdAndUpdate(req.params.id, {name})
     res.redirect('/checklists')
  } catch (error) {
    let errors = error.errors
     res.status(422).render(`checklists/edit`, { checklist: {...checklist, errors}})
  }
})

//delete (id)
router.delete('/:id', async (req, res) => {
 try {
    await Checklist.findByIdAndRemove(req.params.id)
     res.redirect('/checklists')
 } catch (error) {
     res.status(500).render('pages/error', { error: 'Erro ao deletar Lista de Tarefas' })
 }
})

module.exports = router