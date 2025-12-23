import dotenv from "dotenv";
dotenv.config();

import { emailConsumer } from "./consumers/email.consumer.js";

emailConsumer().catch(console.error);
