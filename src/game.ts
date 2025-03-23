import { User } from './user';
import { Chess } from 'chess.js';
import { v4 as uuidv4 } from 'uuid';
import { WebSocket } from 'ws';
interface Move{
    from: string;
    to: string;
}
export class Game{
    public gameid:string;
    public player1:WebSocket;
    public player2:WebSocket;
    public game:Chess;
    constructor(player1:WebSocket,player2:WebSocket){
        this.gameid=uuidv4()
        this.player1=player1;
        this.player2=player2;
        this.game=new Chess();
        this.player1.send(
            JSON.stringify({
                gameid:this.gameid
            })
        )
        this.player2.send(
            JSON.stringify({
                gameid:this.gameid
            })
        )
    }
    public makemove(move: Move, user: User): void {
        console.log(this.game.fen())
        console.log("this game")
       this.game.move({ from: move.from, to: move.to });
       this.player1.send(JSON.stringify({
        fen:this.game.board()
       }))
       this.player2.send(JSON.stringify({
        fen:this.game.board()
       }))
      // console.log(this.game.fen());
    }

}