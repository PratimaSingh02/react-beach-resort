import React, { Component } from 'react'
import items from './data'

const RoomContext=React.createContext();

class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
        type:'all',
        capacity:1,
        price:0,
        minPrice:0,
        maxPrice:0,
        minSize:0,
        maxSize:0,
        breakfast:false,
        pets:false
    }

    componentDidMount(){
        let rooms=this.formatData(items);
        //get featuredRooms from rooms array
        let featuredRooms=rooms.filter(room=>room.featured===true)
        //get max price out of all rooms
        let maxPrice=Math.max(...rooms.map(item=>item.price))
        let maxSize=Math.max(...rooms.map(item=>item.size))
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms:rooms,
            loading:false,
            price:maxPrice,
            maxPrice,
            maxSize
        })
    }

    formatData(items){
        let tempItems=items.map(item=>{
            //build single room & return
            let id=item.sys.id
            let images=item.fields.images.map(image=>image.fields.file.url)
            let room={...item.fields,id,images}//copy all props of fields to room obj
            return room;
        })
        return tempItems
    }

    getRoom=(slug)=>{
        let tempRooms=[...this.state.rooms]//copy array
        const room=tempRooms.find(room=>room.slug===slug)
        return room;
    }

    handleChange=event=>{
        const target=event.target
        const value=target.type==='checkbox'?target.checked:target.value
        const name=event.target.name;
        //set sate to selected type & value
        this.setState({
            [name]:value//name is replaceable therefore inside []
        },this.filterRooms)//filterRooms is callback function here
    }

    filterRooms=()=>{
        let {rooms,type,capacity,price,minSize,maxSize,breakfast,pets}=this.state;
        //all the rooms
        let tempRooms=[...rooms]
        capacity=parseInt(capacity)
        price=parseInt(price)

        //filter by 'type'
        if(type!=='all'){
            tempRooms=tempRooms.filter(room=>room.type===type)
        }

        //filter by 'capacity'
        if(capacity!==1){
            tempRooms=tempRooms.filter(room=>room.capacity>=capacity)
        }

        //filter by 'price'
        tempRooms=tempRooms.filter(room=>room.price<=price)

        //filter by size
        tempRooms=tempRooms.filter(room=>room.size>=minSize && room.size<=maxSize)

        //filter by breakfast
        if(breakfast)
            tempRooms=tempRooms.filter(room=>room.breakfast===true)
        
        //filter by pets
        if(pets)
        tempRooms=tempRooms.filter(room=>room.pets===true)

        //finally update sortedRooms
        this.setState({
            sortedRooms:tempRooms
        })
    }

    render() {
        return (
            <RoomContext.Provider value={{...this.state,getRoom:this.getRoom,handleChange:this.handleChange}}>
                {this.props.children}
            </RoomContext.Provider>
        )
    }
}

const RoomConsumer=RoomContext.Consumer;
export function withRoomConsumer(Component){
    //this is a higher order component because it returns a component

    return function ConsumerWrapper(props){
        return <RoomConsumer>
            {value=> <Component {...props} context={value}/>}
        </RoomConsumer>
    }
}

export {RoomProvider,RoomConsumer,RoomContext}