import React from 'react';
import Moment from 'react-moment'; 
import {withRouter} from 'react-router-dom'
import SelectSeats from './SelectSeats';
class Buses extends React.Component{
    constructor(props){
        super(props)
        this.state={
            selectSeats:false,
        }
        this.selectSeat=this.selectSeat.bind(this);
        this.bookingSumary=this.bookingSumary.bind(this);
    }
    selectSeat(){
        //this.props.history.push('/selectSeats');
        this.setState({selectSeats:!this.state.selectSeats})
    }
    bookingSumary(bookingDetails){
        this.props.bookingSumary(bookingDetails)
    }
    render(){
        return(
            <div className="container mt-5 pr-0 container-style" >
                    <div className="d-flex justify-content-between pt-4 px-3" >
                        <div>
                            <h6 style={{fontSize:'18px'}}>{this.props.busInfo.travels}</h6>
                            <div><span style={{fontSize:'14px'}}>{this.props.busInfo.type}</span></div>
                        </div>
                        <div className="ml-5">
                            <h4>{this.props.busInfo.pickupTime}</h4>
                            <p style={{fontSize:'14px'}}>{this.props.busInfo.pickupLocation}</p>
                        </div>
                        <div className="ml-5 mt-2">
                            <p style={{fontSize:'18px', fontWeight:300}}>{this.props.busInfo.travelingTime}</p>
                        </div>
                        <div className="ml-5">
                            <h4>{this.props.busInfo.dropTime}</h4>
                            <p style={{fontSize:'14px'}}>{this.props.busInfo.dropLocation}</p>
                        </div>
                        <div className="ml-5 mt-2">
                            <p style={{fontSize:'18px', fontWeight:300}}>INR <span style={{fontSize:'24px',fontWeight:500}}>{this.props.busInfo.fare}</span></p>
                        </div>
                        <div className="ml-5">
                            <p style={{fontSize:'16px'}}><span style={{fontWeight:'bold'}}>{40-this.props.busInfo.bookedSeats.length}</span><br/>Seats available now</p>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between" >
                        <div className="ml-3"><Moment format="DD-MM-YYYY">{this.props.date}</Moment></div>
                        <div className="float-right selectSeatsBtn" style={{cursor:'pointer'}}>
                            <span onClick={this.selectSeat}>Select seats</span>
                        </div>   
                    </div>
                    {
                        (this.state.selectSeats) && <SelectSeats busInfo={this.props.busInfo} date={this.props.date} from={this.props.from} to={this.props.to} bookingSumary={this.bookingSumary} toggleseat={this.selectSeat}/>
                    }
                </div>
                
        )
    }
}
export default withRouter(Buses);