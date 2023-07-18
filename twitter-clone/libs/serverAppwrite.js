// Same thing what we did for sappwrite this one is more server version .
// Client connection

const sdk = require('node-appwrite');
const client = new sdk.Client();
export const users = new sdk.Users(client);

client
.setEndpoint('http://localhost/v1')
.setProject('64b6561ae1fc5e249f84')
.setKey('dd14ab36a42e11b5b80a3fc8f4276a67086b53aee28e1ee1919163294b1d6f2df31afcd6898936ee67fdc4213238cf467884207b51dd4431011accf37e4ef73325355910b89cad6e9b56dbe52aab193aff5cc337d9648dbfd3c8890f15525cc19299417b14eabf7c7f3c18d91e47e137f1ec8048aec1c0d01e54f68264766879')