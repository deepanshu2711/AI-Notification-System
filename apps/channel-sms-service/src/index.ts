import dotenv from "dotenv";
dotenv.config();

import { smsConsumer } from "./consumers/sms.consumer";

smsConsumer().catch(console.error);
