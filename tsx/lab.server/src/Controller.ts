import express from "express";

export interface Controller {
    register(app: express.Express): void;
}
