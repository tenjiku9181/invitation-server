import * as mongodb from "mongodb";
import { ReplyFormat } from "./Reply/ReplyFormat";

export const collections: {
    replies?: mongodb.Collection<ReplyFormat>;
} = {};

export async function connectToDatabase(uri: string) {
    const client = new mongodb.MongoClient(uri);
    await client.connect();

    const db = client.db("invitation");
    await applySchemaValidation(db);

    const repliesCollection = db.collection<ReplyFormat>("replies");
    collections.replies = repliesCollection;
}

async function applySchemaValidation(db: mongodb.Db) {
    await db.command({
        collMod: "replies"
    }).catch(async (error: mongodb.MongoServerError) => {
        if (error.codeName === "NamespaceNotFound") {
            await db.createCollection("replies");
        }
    });
}
