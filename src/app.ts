import express, { Express } from "express";
import { router } from "./routes";

const add = express();

class App {
  readonly server: Express;

  constructor() {
    this.server = express();

    this.middleware();
    this.routes();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private routes() {
    this.server.use(router);
  }
}

export default new App().server;
