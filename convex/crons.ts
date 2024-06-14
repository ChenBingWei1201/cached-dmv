import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.interval("update dmv time", { seconds: 3 }, internal.dmv.updateTime);

export default crons;
