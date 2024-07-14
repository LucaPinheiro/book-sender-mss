import express, { Request, Response } from "express";
import multer from "multer";
import { SendEmailController } from "./send_email_controller";
import { SendEmailUsecase } from "./send_email_usecase";
import { UserRepositoryPrisma } from "../../../shared/infra/repositories/user_repository_prisma";

const upload = multer({ dest: "uploads/" });

const router = express.Router();
const createUserUsecase = new SendEmailUsecase();
const sendEmailController = new SendEmailController(createUserUsecase);

router.post(
  "/send-email",
  upload.single("pdf"),
  async (req: Request, res: Response) => {
    await sendEmailController.handle(req, res);
  }
);

export default router;
