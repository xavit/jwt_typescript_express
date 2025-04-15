import express, { Application } from "express";
import connection from "../db/connection";
import routesProducto from "../routes/producto.routes";
import routesDefaults from "../routes/defaults.routes";
import usuarioDefaults from "../routes/usuario.routes";

class Server {
  private app: Application;
  private port: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "3000";

    this.listen();
    this.connectDB();
    this.midlewares();
    this.routes();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}`);
    });
  }

  connectDB() {
    connection
      .getConnection()
      .then((conn) => {
        console.log("Database connected");
        conn.release();
      })
      .catch((err) => {
        console.error("Database connection error", err);
      });
  }

  routes() {
    this.app.use("/", routesDefaults);
    this.app.use("/api/productos", routesProducto);
    this.app.use("/api/usuarios", usuarioDefaults);
  }

  midlewares() {
    // Middleware to parse JSON requests
    this.app.use(express.json());
    // Middleware to parse URL-encoded requests
    this.app.use(express.urlencoded({ extended: true }));
  }
}

export default Server;
