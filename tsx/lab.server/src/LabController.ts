import express from "express";
import { Controller } from "./Controller";
import { exec } from "shelljs";

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

    private async start(lab: string, image: string): Promise<{ 
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
    }
}

// localhost:8085/start