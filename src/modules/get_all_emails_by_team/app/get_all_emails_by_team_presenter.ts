import express, { Request, Response } from "express";
import { EmailRepositoryPrisma } from "../../../shared/infra/repositories/email_repository_prisma";
import { GetAllEmailsByTeamUsecase } from "./get_all_emails_by_team_usecase";
import { GetAllEmailsByTeamController } from "./get_all_emails_by_team_controller";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const router = express.Router();

const userRepository = new EmailRepositoryPrisma();
const getAllEmailsUsecase = new GetAllEmailsByTeamUsecase(userRepository);
const getAllEmailsByTeamController = new GetAllEmailsByTeamController(getAllEmailsUsecase);

router.get(
  "/emails/team/:team",
  authenticateToken,
  async (req: Request, res: Response) => {
    await getAllEmailsByTeamController.handle(req, res);
  }
);

export default router;
