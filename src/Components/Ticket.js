import React from 'react';
import Moment from 'react-moment';
class Ticket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            ticketInfo:this.props.ticketInfo
        }
    }
    render(){
        return(
            <div className="container pb-5 mb-5  viewTicket" >
                    <h1 style={{ textAlign: 'center' }} className='mt-3 ticketLogo'>Make Your Trip</h1>
                    <table className="ticketTable">
                        <tbody>
                            <tr>
                                <td colSpan='2'>Ticket No: {Math.floor((Math.random() * 1000) + 10)}</td>
                                <td>Date: {<Moment format="DD-MM-YYYY">{this.state.ticketInfo.travelDate}</Moment>}</td>
                            </tr>
                            <tr>
                                <td>{this.state.ticketInfo.user}</td>
                                <td>{this.state.ticketInfo.email}</td>
                                <td>{this.state.ticketInfo.mobileNo}</td>
                            </tr>
                            <tr>
                                <td>From: {this.state.ticketInfo.from}</td>
                                <td></td>
                                <td >To: {this.state.ticketInfo.to}</td>
                            </tr>
                            <tr>
                                <td >Bording Point: {this.state.ticketInfo.boardingPoint}</td>
                                <td></td>
                                <td>Departs on: {<Moment format="DD-MM-YYYY">{this.state.ticketInfo.travelDate}</Moment>} {this.state.ticketInfo.boardingTime}</td>
                            </tr>
                            <tr>
                                <td>Drop Point: {this.state.ticketInfo.dropLocation}</td>
                                <td></td>
                                <td>Arrival On: {this.state.ticketInfo.dropTime}</td>
                            </tr>
                            <tr>
                                <td >No of Seats: {this.state.ticketInfo.selectedSeats.length} </td>
                                <td></td>
                                <td>Seat Number: {this.state.ticketInfo.selectedSeats}</td>
                            </tr>
                            <tr>
                                <td >Basic Fare: {this.state.ticketInfo.ticketFare} x {this.state.ticketInfo.selectedSeats.length}</td>
                                <td></td>
                                <td>Service Fare: 60 X {this.state.ticketInfo.selectedSeats.length}</td>
                            </tr>
                            <tr>
                                <td colSpan='3' >
                                    Toatal Fare: ₹ {this.state.ticketInfo.totalCharges}
                                </td>
                            </tr>
                        </tbody>
                        
                    </table>
                    <h6 className='ml-5 pl-2 mt-3' style={{fontWeight:600}}>Passenger Details</h6>
                    <table className="ticketTable">
                            <tbody>
                            <tr><th>Passenger Name:</th><th>Age</th><th>Gender</th><th>Seat No</th></tr>
                            {
                                this.state.ticketInfo.passengerDetails.map((passenger)=><tr key={passenger.seat}><td>{passenger.name}</td><td>{passenger.age}</td><td>{passenger.gender}</td><td>{passenger.seat}</td></tr>)
                            }
                            </tbody>
                        </table>
                </div>
        )
    }
}
export default Ticket;