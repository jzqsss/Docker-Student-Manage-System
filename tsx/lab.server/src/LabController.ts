import express from "express";
import { Controller } from "./Controller";
import { exec } from "shelljs";
import { login } from "./controllers/auth.js";
import { display_image } from "./controllers/image_data.js";
import { display_container } from "./controllers/container_data.js";
import { protect } from "./middleware/auth.js";
import { docker_start } from "./controllers/docker.js";
import ErrorResponse from "./utils/errorResponse.js";
import Image from "./models/Image.js";
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
        app.post(`/api/auth/start`, docker_start);
        app.post(`/stop`, async (req, res) => {
            const { lab } = req.body;
            const result = await this.stop(lab);
            return res.send(result);
        });
        app.post(`/api/auth/login`, login);
        app.get(`/api/auth/private`, protect, (req, res) => {
            res.status(200).json({
                success: true,
            });
        });
        app.post(`/api/auth/image`, display_image);
        app.post(`/api/auth/container`, display_container);
    }
}

// localhost:8085/start

// Image.create({
//     name: "ubuntu 20.04",
//     image_url: "ubuntu:20.04",
//     description: "ubuntu版本为20.04",
//     created_at: "itecgo",
// });
