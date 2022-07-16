import { Pool } from 'pg'

export const pool = new Pool({
    host: 'ec2-3-219-52-220.compute-1.amazonaws.com',
    user: 'hjhvdgwiegsmja',
    password: 'd1cfe9f015abfc9a88096f9c1c8cb8423edd44f75e3ef42e3c9603e71d0bd67b',
    database: 'ddta0m9ls2anfi',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})