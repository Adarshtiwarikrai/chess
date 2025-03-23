import { useEffect,useState } from "react"
import { useLocation } from "react-router-dom"
import { Chess } from "chess.js"
import {useWebSocket} from "./usestate"

export function Game(){
    
    const location=useLocation()
    const [gameid,setgameid]=useState("")
    const {socket,sendMessage,message}=useWebSocket('ws://localhost:3000/')
     const[chess,setchess]=useState(null)
     const [board,setboard]=useState([])
    const [loading,setloading]=useState(true)
    const [count,setcount]=useState(0)
    const [move,setmove]=useState({
        from:null,
        to:null
    })
    const [time,settime]=useState(0)
    useEffect(()=>{
        const newchess=new Chess()
     setchess(newchess);
     setboard(newchess.board());
     console.log(board)
    setloading(false)
    },[])

   useEffect(()=>{
    const a=message.gameid
    console.log("hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii",a)
    if(message.gameid!==undefined){
    setgameid(a)
    }
    console.log(gameid)
    if(message.fen){
      console.log("hiii")
    setboard(message.fen)
    }
    
   },[message])
  
    const handleonclick=(i,j)=>{
        if(move.from!==null){
            let b=i.toString()+j.toString()
            console.log(b)
            const updatevalue=move
            updatevalue.to=b
            console.log(updatevalue)
            setmove((prevMove) => ({
              ...prevMove,
              to: b, //     Replace 'b' with your desired value
          }));
          console.log(move)
            sendMessage(JSON.stringify({
                type:'move',
                gameid:gameid,
                move:updatevalue
               }))
               console.log("hiiiiiiiiiiiiiiiii",{
                type:'move',
                gameid:gameid,
                move:updatevalue
               })
               setmove({
                from:null,
                to:null
               })
              // setmove(move.to=null)
        }
        else{
            let b=i.toString()+j.toString()
            console.log(b)
            setmove((prevMove) => ({
              ...prevMove,
              from: b, // Replace 'b' with your desired value
          }));
        }
       
           console.log("kkk")
    }
    const handleplay=()=>{
        sendMessage(JSON.stringify({
             "type":"initgame"
           }))
    }
    
    const arr=['a','b','c','d','e','f','g','h']
    if(loading===true){
        return (
            <div> loading</div>
        )
    }
    if(!socket){
        return (
            <div> connectiong</div>
        )
    }
    
    return (

        <div className="bg-slate-500 flex justify-center space-x-5">
            <h1>this is hii from client</h1>
            <h1>{count}</h1>
            <button onClick={()=>{setcount(count+1)}}> button</button>
            <div className="flex flex-col">
                {board.map((row,i)=>(
                    <div key={i} className="flex">
                    {row.map((col,j)=>(
                        <div key={j} onClick={()=>handleonclick(arr[j],8-i)}className ={`w-14 h-14 ${(i+j)%2==0? 'bg-green-700':'bg-red-100'} `}>
                       {col==null?"":col.type}

                        </div>
                    ))}
                    </div>
                )) }
            </div>
            <div className="box-border h-72 w-32 p-5 border-5 bg-white flex justify-center ">

             <button className="bg-red-700 flex-col max-h-14" onClick={()=>handleplay()}>
                play
             </button>
            </div>
        </div>
    )
}
// {"from":"66","to":"64"} why does the board rerender when we change the value of usestate board