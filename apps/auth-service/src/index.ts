import { app } from "./app.js";
import { ConnectDb } from "./config/database.js";

app.listen(5002, () => {
  console.log("Auth Service running on 5002 port");
  ConnectDb();
});
