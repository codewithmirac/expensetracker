import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon("postgresql://Expense-Tracker_owner:rtvx5JoHs1Vf@ep-winter-rain-a5babvte.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require");
const db = drizzle(sql,{schema});