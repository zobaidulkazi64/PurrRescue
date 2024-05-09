import { Express, Request, Response } from "express";
import config from "@/config.json";
import axios from "axios";

export const createHandler = (
  hostname: string,
  path: string,
  method: string
) => {
  return async (req: Request, res: Response) => {
    try {
      let url = `${hostname}${path}`;
      req.params &&
        Object.keys(req.params).forEach((key) => {
          url = url.replace(`:${key}`, req.params[key]);
        });
      // console.log(url);
      const { data } = await axios({
        method,
        url,
        data: req.body,
        headers: {
          origin: "http://localhost:8080",
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      res.status(200).json({
        success: true,
        data,
      });
    } catch (error) {
      // console.log(error);
      if (error instanceof axios.AxiosError) {
        res.status(error.response?.status || 500).json({
          success: false,
          error: error.response?.data?.message || error.message,
        });
      }
      return res.status(500).json({
        success: false,
        messages: "Something went wrong",
      });
    }
  };
};

// export const getMiddlewares = (names: string[]) => {
//   return names.map((name) => middlewares[name]);
// };

export const configureRoutes = (app: Express) => {
  Object.entries(config.services).forEach(([_name, services]) => {
    const hostname = services.url;

    // console.log(hostname);

    services.routes.forEach((route) => {
      route.methods.forEach((method) => {
        // console.log(route.path);
        const endpoint = `${route.path}`;

        // console.log(endpoint);

        const handler = createHandler(hostname, route.path, method);
        app[method](endpoint, handler);

        // console.log(`[${method}] ${hostname}${endpoint}`);
      });
    });
  });
};
