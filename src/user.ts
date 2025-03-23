import {WebSocket} from 'ws';
export class User{
       public id:string;
       public name:string;
       public socket:WebSocket
       constructor(name:string,socket:WebSocket){
           this.id=Math.random().toString();
           this.name=name;
           this.socket=socket;
       }
}
