import express from "express";
import cors from "cors";
import moment from "moment";
import { createServer } from "http";
import { Formatting } from "./Formatting";
import { LabController } from "./LabController";

export class Server {
    static listen(port: number) {
        const app = express();

        app.use(express.json({ limit: "200mb" }));
        app.use(express.urlencoded({ limit: "200mb", extended: true }));

        app.use(cors());

        const controller = new LabController();
        controller.register(app);

        const server = createServer(app);

        server.listen(port, () => {
            const now = Formatting.toFormattedDateTimeString(moment());
            console.debug(`[${now} Nesting Server] listening: port=${port}`);
        });
    }
}

Server.listen(8085);
