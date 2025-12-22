import { app } from "./app.js";
import { ConnectDb } from "./config/database.js";
import { startGrpcServer } from "./grpc.server.js";

app.listen(5004, () => {
  console.log("Management Service running on 5004 port");
  startGrpcServer();
  ConnectDb();
});
