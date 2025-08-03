// import { createClient } from 'redis';

// const client = createClient();

// client.on('error', err => console.log('Redis Client Error', err));

// (async()=>{
//     await client.connect();
// })()

// export default client

import Redis from "ioredis"

const client=new Redis()
export default client