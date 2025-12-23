import dotenv from "dotenv";
dotenv.config();

import { startGrpcServer } from "./grpc.server.js";

startGrpcServer();
