import express from "express";
import { Controller } from "./Controller";
import { exec } from "shelljs";
import { login } from "./controllers/auth.js";
import { display_image } from "./controllers/image_data.js";
import { display_container } from "./controllers/container_data.js";
import { protect } from "./middleware/auth.js";
import {
    docker_run,
    docker_stop,
    docker_start,
    docker_suspand,
    docker_unsuspand,
    docker_remove,
} from "./controllers/docker.js";
import ErrorResponse from "./utils/errorResponse.js";

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
        app.post(`/api/auth/run`, docker_run);
        app.post(`/api/auth/stop`, docker_stop);
        app.post(`/api/auth/start`, docker_start);
        app.post(`/api/auth/suspand`, docker_suspand);
        app.post(`/api/auth/unsuspand`, docker_unsuspand);
        app.post(`/api/auth/remove`, docker_remove);
        app.post(`/api/auth/login`, login);
        app.get(`/api/auth/private`, protect);
        app.post(`/api/auth/image`, display_image);
        app.post(`/api/auth/container`, display_container);
    }
}

// localhost:8085/start

// Image.create({
//     name: "ubuntu 18.04",
//     image_url: "ubuntu:18.04",
//     description: "ubuntu版本为18.04",
//     created_at: "itecgo",
// });
