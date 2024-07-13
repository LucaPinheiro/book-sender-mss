import express, { Request, Response } from "express";
import { EmailRepositoryPrisma } from "../../../shared/infra/repositories/email_repository_prisma";
import { CreateEmailUsecase } from "./create_email_usecase";
import { CreateEmailController } from "./create_email_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();
const emailRepository = new EmailRepositoryPrisma();
const createUserUsecase = new CreateEmailUsecase(emailRepository);
const createEmailController = new CreateEmailController(createUserUsecase);

router.post(
  "/create-email",
  authenticateToken,
  async (req: Request, res: Response) => {
    await createEmailController.createEmail(req, res);
  }
);

export default router;
