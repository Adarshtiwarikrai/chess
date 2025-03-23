import {WebSocketServer,WebSocket} from 'isomorphic-ws';
import { User } from './user';
import { gamemanger,  } from './gamemanger'
import { v4 as uuidv4 } from 'uuid';
import redis from './redis'
const wss = new WebSocketServer({ port: 3000 });
const user:User[]=[];
const gamemanger1=new gamemanger(redis)
wss.on('connection', (ws,req ) => {
    const b=new User(uuidv4(),ws )
    const a=   gamemanger1.adduser(b);
    
});

// setInterval(()=>{
//   console.log(gamemanger1.user.length,gamemanger1.game.length);
// },1000)