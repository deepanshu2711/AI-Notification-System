import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";

app.listen(5001, () => {
  console.log("Api Gateway running on 5001 port");
});
