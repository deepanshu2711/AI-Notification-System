import { startGrpcServer } from "./grpc.server.js";
import { app } from "./app.js";
import { ConnectDb } from "./config/database.js";

app.listen(5007, () => {
  console.log("Template service running on 5007 port");
  startGrpcServer();
  ConnectDb();
});
