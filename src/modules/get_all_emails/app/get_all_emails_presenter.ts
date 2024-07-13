import express, { Request, Response } from "express";
import { EmailRepositoryPrisma } from "../../../shared/infra/repositories/email_repository_prisma";
import { GetAllEmailsUsecase } from "./get_all_emails_usecase";
import { GetAllEmailsController } from "./get_all_emails_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();

const userRepository = new EmailRepositoryPrisma();
const getAllEmailsUsecase = new GetAllEmailsUsecase(userRepository);
const getAllEmailsController = new GetAllEmailsController(getAllEmailsUsecase);

router.get(
  "/emails",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getAllEmailsController.handle(req, res);
  }
);

export default router;
