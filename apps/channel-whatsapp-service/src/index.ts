import dotenv from "dotenv";
dotenv.config();

import { whatsappConsumer } from "./consumers/whatsapp.consumer.js";

whatsappConsumer().catch(console.error);
