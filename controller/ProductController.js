import express from "express";
import bodyParser from "body-parser";
import { sitters } from '../model/index.js'

const sitterRouter = express.Router();

sitterRouter.use(bodyParser.json())

sitterRouter.get('/', (req, res) => {
    sitters.fetchSitters(req, res)
})

sitterRouter.get('/recent', (req, res) => {
    sitters.recentSitters(req, res)
})

sitterRouter.get('/:id', (req, res) => {
    sitters.fetchSitter(req, res)
})

sitterRouter.post('/addProduct', (req, res) => {
    sitters.addSitter(req, res)
})

sitterRouter.patch('/update/:id', (req, res) => {
    sitters.updateSitter(req, res)
})

sitterRouter.delete('/delete/:id', (req, res) => {
    sitters.deleteSitter(req, res)
})

export {
    sitterRouter
}