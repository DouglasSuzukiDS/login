import { Router } from "express";
import * as pingController from '../controllers/ping'
import * as authController from '../controllers/auth'
import * as userController from '../controllers/user'
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router()

mainRouter.get('/ping', pingController.ping)
mainRouter.get('/private-ping', verifyJWT, pingController.privatePing)

mainRouter.post('/auth/signup', authController.signup)
mainRouter.post('/auth/signin', authController.signin)

mainRouter.get('/users', verifyJWT, userController.users)
mainRouter.get('/user/:id', verifyJWT, userController.userById)
mainRouter.get('/user/find-by-login', verifyJWT, userController.findUserLogin)
mainRouter.post('/user', verifyJWT, userController.newUser)
mainRouter.put('/user/:id', verifyJWT, userController.updateUserData)
mainRouter.delete('/user/:id', verifyJWT, userController.removeUser)