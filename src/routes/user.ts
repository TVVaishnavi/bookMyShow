import express, { Router, Request, Response } from 'express';
import { createUserController, loginController, refreshTokenController, getUsersController } from '../controller/user';
import cors from 'cors';
import { request } from 'http';
import { promises } from 'dns';

const router: Router = express.Router();

router.use(cors());

router.post('/register', (req:Request,res:Response):any=>createUserController);
router.post('/admin/login',(req:Request,res:Response):any=> loginController);
router.post('/user/login', (req:Request,res:Response):any=>loginController);
router.post('/refresh-token',(req:Request,res:Response):any=> refreshTokenController);
router.get('/users', (req:Request,res:Response):any=>getUsersController);

export default router;
