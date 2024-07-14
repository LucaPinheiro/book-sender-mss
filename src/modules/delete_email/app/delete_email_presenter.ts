import express, { Request, Response } from "express";
import { EmailRepositoryPrisma } from "../../../shared/infra/repositories/email_repository_prisma";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";
import { DeleteEmailUsecase } from "./delete_email_usecase";
import { DeleteEmailController } from "./delete_email_controller";

const router = express.Router();
const emailRepository = new EmailRepositoryPrisma();
const deleteEmailUsecase = new DeleteEmailUsecase(emailRepository);
const deleteEmailController = new DeleteEmailController(deleteEmailUsecase);

router.delete(
  "/delete-email/:email",
  authenticateToken,
  async (req: Request, res: Response) => {
    await deleteEmailController.handle(req, res);
  }
);

export default router;
