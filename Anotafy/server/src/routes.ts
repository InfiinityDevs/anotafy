import { Router } from "express";
import fs from "fs";
import path from "path";
import { IController } from "./Contracts/IController";

const cRouter = Router();

const controllersPath = path.join(__dirname, "Controllers");

fs.readdirSync(controllersPath).forEach((fileOrDir) => {
    const fullPath = path.join(controllersPath, fileOrDir);

    const isFile = fs.statSync(fullPath).isFile();

    const isController =
        fileOrDir.endsWith(".controller.ts") ||
        fileOrDir.endsWith(".controller.js");

    if (isFile && isController) {
        const controllerModule = require(fullPath);
        if (controllerModule.default) {
            const controller: IController = new controllerModule.default();
            cRouter.use(controller.path, controller.router);
            console.log(`➡️ - Rotas para ${controller.path} registadas.`);
        }
    }
});

export default cRouter;
