import { app } from "./app.js";
import { userConsumer } from "./consumers/user.consumer.js";

userConsumer().catch(console.error);

app.listen(5003, () => {
  console.log("User Service running on 5003 port");
});
