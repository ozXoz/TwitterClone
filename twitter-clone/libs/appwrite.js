// Basic connection

import { Client } from 'appwrite';

const client = new Client();

client
.setEndpoint('http://localhost/v1')
.setProject('64b6561ae1fc5e249f84');

export default client;