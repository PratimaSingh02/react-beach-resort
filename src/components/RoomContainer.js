import React from 'react'
import RoomFilter from './RoomFilter'
import RoomList from './RoomList'
import { withRoomConsumer } from '../context'
import Loading from './Loading'

//for functional components u cant access context
//using contextType, you will need to use Consumer
//there r 2 ways to do that or we can use usContext hook

function RoomContainer({context}){//getting context from higher order component
const {loading,sortedRooms,rooms}=context;
if(loading){
        return <Loading/>
}
return (
    <div>
        <RoomFilter rooms={rooms}/>
        <RoomList rooms={sortedRooms}/>
    </div>);
}

export default withRoomConsumer(RoomContainer)//wrapping RoomContainer inside higher order component i.e. withRoomConsumer

//if not using higher order component from context.js then
//use below alternative method 

// export default function RoomContainer() {
//     return (
//         <RoomConsumer>
//         {
//             (value)=>{
//                 const {loading,sortedRooms,rooms}=value;
//                 if(loading){
//                     return <Loading/>
//                 }
//                 return (
//                 <div>
//                     hello from rooms container
//                     <RoomFilter rooms={rooms}/>
//                     <RoomList rooms={sortedRooms}/>
//                 </div>);
//             }
//         }
//         </RoomConsumer>
//     )
// }
