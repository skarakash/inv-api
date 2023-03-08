import express from 'express'
import mongoose from "mongoose";
import {config} from "./config/config";
import Logging from "./lib/Logging";
import * as http from "http";
import invoiceRoutes from "./routes/invoice"

const router = express();
Logging.log(config.mongo.url)
mongoose.connect(config.mongo.url, {
  w: 'majority',
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
    .then(() => {
      Logging.info('Connected to mongoDB')
      startServer()
    })
    .catch(error => {
      Logging.error('Unable to connect')
      Logging.error(error)
    })

const startServer = () => {
  router.use((req, res, next) => {
    Logging.info(`Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

    res.on('finish', () => {
      Logging.info(`Outgoing -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`);
    });

    next();
  });

  router.use(express.urlencoded({extended: true}));
  router.use(express.json());

  router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }

    next();
  })

  router.use('/invoices', invoiceRoutes)

  router.get('/ping', (req, res, next) => {
    res.status(200).json({message: 'pong'})
  })

  router.use((req, res, next) => {
    const error = new Error('not found');
    Logging.error(error)

    return res.status(404).json({message: error.message})
  })

  http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}.`));
}