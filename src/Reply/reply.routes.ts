import * as express from "express";
import { collections } from "../database";

export const replyRouter = express.Router();
replyRouter.use(express.json());

// Language message registry
const messages = {
    en: {
        created: "Reply send successfully.",
        failed: "Failed to send reply.",
        badRequest: "Invalid request data.",
    },
    ja: {
        created: "返信は正常に送信されました。",
        failed: "返信を送信できませんでした。",
        badRequest: "リクエストデータが正しくありません。",
    },
};

replyRouter.post("/", async (req, res) => {
    const lang =
        typeof req.headers["accept-language"] === "string" &&
        req.headers["accept-language"].startsWith("ja")
            ? "ja"
            : "en";

    const t = messages[lang];

    try {
        const reply = req.body;
        const result = await collections?.replies?.insertOne(reply);

        if (result?.acknowledged) {
            res.status(201).send({
                success: true,
                message: t.created,
            });
        } else {
            res.status(500).send({
                success: false,
                message: t.failed,
            });
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error instanceof Error ? error.message : t.badRequest,
        });
    }
});
