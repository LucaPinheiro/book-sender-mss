import express, { Request, Response } from "express";
import { UserRepositoryPrisma } from "../../../shared/infra/repositories/user_repository_prisma";
import { getUserByIdUsecase } from "./get_user_by_id_usecase";
import { GetUserByIdController } from "./get_user_by_id_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();

const userRepository = new UserRepositoryPrisma();
const getUserByIdUseCase = new getUserByIdUsecase(userRepository);
const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);

router.get(
  "/user",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getUserByIdController.handle(req, res);
  }
);

export default router;
