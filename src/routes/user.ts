import express, { Router, Request, Response, NextFunction } from 'express';
import { createUserController, loginController, refreshTokenController, getUsersController } from '../controller/user';
import cors from 'cors';

const router: Router = express.Router();
router.use(cors());

router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await createUserController(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/admin/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginController(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/user/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await loginController(req, res);
  } catch (error) {
    next(error);
  }
});

router.post('/refresh-token', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await refreshTokenController(req, res);
  } catch (error) {
    next(error);
  }
});

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  try {
    await getUsersController(req, res);
  } catch (error) {
    next(error);
  }
});

export default router;
