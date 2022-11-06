import express from "express";
import * as homeController from '../controllers/home.controller.js'


const homeRouter = express.Router();

homeRouter.get('/all/:page/:category', homeController.getAll)
homeRouter.get('/all/:page/:category/byDate', homeController.getAllByDate)
homeRouter.get('/all/:page/:category/byId', homeController.getAllById)

export default homeRouter