import express from "express";
import { Controller } from "./Controller";
import { exec } from "shelljs";
import { login } from "./controllers/auth.js";
import { protect } from "./middleware/auth.js";
export class LabController implements Controller {
    private async ls(lab: string): Promise<{
        out: string;
    }> {
        console.log("lab:" + lab);
        let cmd = "../../cxx/lab ls --lab " + lab;

        let { stdout } = exec(cmd);

        return {
            out: stdout,
        };
    }

    private async start(
        lab: string,
        image: string,
    ): Promise<{
        out: string;
    }> {
        let cmd = "../../cxx/lab start --lab " + lab + " --image " + image;

        let { stdout } = exec(cmd);

        return {
            out: stdout,
        };
    }

    private async stop(lab: string): Promise<{
        out: string;
    }> {
        let cmd = "../../cxx/lab stop --lab " + lab;

        let { stdout } = exec(cmd);

        return {
            out: stdout,
        };
    }

    register(app: express.Express): void {
        app.post(`/ls`, async (req, res) => {
            const { lab } = req.body;
            const result = await this.ls(lab);
            return res.send(result);
        });
        app.post(`/start`, async (req, res) => {
            const { lab, image } = req.body;
            const result = await this.start(lab, image);
            return res.send(result);
        });
        app.post(`/stop`, async (req, res) => {
            const { lab } = req.body;
            const result = await this.stop(lab);
            return res.send(result);
        });
        app.post(`/api/auth/login`, login);
        app.get(`/api/private`, protect, (req, res) => {
            res.status(200).json({
                success: true,
            });
        });
    }
}

// localhost:8085/start
