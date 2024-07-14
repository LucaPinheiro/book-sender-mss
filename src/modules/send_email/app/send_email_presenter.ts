import express, { Request, Response } from "express";
import multer from "multer";
import { SendEmailController } from "./send_email_controller";
import { SendEmailUsecase } from "./send_email_usecase";
import { authenticateToken } from "../../../shared/middlewares/jwt_middleware";

const upload = multer({ dest: "uploads/" });

const router = express.Router();
const sendEmailUsecase = new SendEmailUsecase();
const sendEmailController = new SendEmailController(sendEmailUsecase);

router.post(
  "/send-email",
  authenticateToken,
  upload.single("pdf"),
  async (req: Request, res: Response) => {
    await sendEmailController.handle(req, res);
  }
);

export default router;
