import {User} from './user';
import {Game} from './game';
import {WebSocket} from 'ws';
import { sockmanager } from './sockmanager';
import Redis from 'ioredis';
const sock=new sockmanager()
export class gamemanger{
    public user:User[];
    public avaluser:User|null;
    public game:Game[];
    public redis:Redis;
    constructor( redis:Redis){
        this.user=[];
        this.game=[];
        this.avaluser=null;
        this.redis=redis;
    }
    public adduser(user:User){
        //this.user.push(user);
        this.handler(user)
    }
    private handler(user:User){
        user.socket.on('message',(data)=>{
           // console.log("hiiii")
            const message=JSON.parse(data.toString());
            if(message.type=="initgame"){
           // user.socket.send("hii")
            if(this.avaluser!=null){
               // console.log("hiii")
                this.user.push(user)
                const game=new Game(user.socket , this.avaluser!.socket );
                this.avaluser=null;
                this.game.push(game);
                //user.socket.send("hi")
            }
            else {
                this.avaluser=user;
                this.user.push(user)
            }
            }
            if(message.type=="move"){
              ///  console.log("hi from the gamemanger")
              const game=this.game.find(x=>x.gameid===message.gameid)
            //  console.log(game!.gameid)
              game?.makemove(message.move,user);
              sock.sendnotification(message.gameid,message.move)
            }
            if(message.type=="joinroom"){
                const m=message.gameid;
                sock.adduser(m,user)
            
            }
        })
       
    }
    public remove(ws:User){
     
    }
}


