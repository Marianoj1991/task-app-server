import express from "express";
import router from "../routes/tasks.routes.js";
import cors from 'cors'
class Server {

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.pathRoutes = '/api/tasks';

    this.middlewares();
    this.routes();
  }

  middlewares () {
    this.app.use(express.json());
    this.app.use(express.static('public'));
    this.app.use(cors());
  }
  
  routes() {
    this.app.use(this.pathRoutes, router);
  }

  serverListen() {
    this.app.listen(this.port, () => {
      console.log(`Server listening at port ${this.port}`);
    })
  }

}

export default Server