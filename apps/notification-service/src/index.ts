import { app } from "./app.js";
import { connectDB } from "./config/db.js";
import { consumeMessageEvents } from "./consumers/messageEvent.consumner.js";

consumeMessageEvents().catch(console.error);

app.listen(5006, () => {
  console.log("Notification Service running on 5006 port");
  connectDB();
});
