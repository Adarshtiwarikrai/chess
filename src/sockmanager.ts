import {User} from "./user"
interface Move{
    from: string;
    to: string;
}
export class sockmanager{
    public a:Map<string,User[]>;
    constructor( ){
        this.a=new Map();
    }
    public adduser(id:string,user:User){
        if(this.a.has(id)){
            this.a.get(id)!.push(user)
        }
        else {
            this.a.set(id,[user])
        }
    }
    public sendnotification(id:string,move:Move){
        if(!this.a.has(id)){
         return ;
        }
        
        this.a.get(id)!.forEach(x=>x.socket.send(JSON.stringify(move)))
    }
    
}