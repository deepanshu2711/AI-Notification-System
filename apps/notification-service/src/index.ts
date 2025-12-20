import { app } from "./app.js";
import { connectDB } from "./config/db.js";

app.listen(5006, () => {
  console.log("Notification Service running on 5006 port");
  connectDB();
});
