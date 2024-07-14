import express, { Request, Response } from "express";
import { EmailRepositoryPrisma } from "../../../shared/infra/repositories/email_repository_prisma";
import { GetAllEmailsByRoleController } from "./get_all_emails_by_role_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";
import { GetAllEmailsByRoleUsecase } from "./get_all_emails_by_role_usecase";

const router = express.Router();

const emailRepository = new EmailRepositoryPrisma();
const getAllEmailsByRoleUsecase = new GetAllEmailsByRoleUsecase(emailRepository);
const getAllEmailsByRoleController = new GetAllEmailsByRoleController(getAllEmailsByRoleUsecase);

router.get(
  "/emails/role/:role",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getAllEmailsByRoleController.handle(req, res);
  }
);

export default router;
