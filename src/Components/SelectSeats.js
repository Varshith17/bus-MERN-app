import React from 'react';
import { Button } from 'reactstrap';
import Moment from 'react-moment';
class SelectSeats extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            seats: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
            bookedSeats: this.props.busInfo.bookedSeats,
            selectedSeats: []
        }
        this.bookSeats = this.bookSeats.bind(this);
    }
    bookSeats(seatNo) {
        if (seatNo === this.state.selectedSeats.find((selectedSeat) => selectedSeat === seatNo)) {
            this.setState({ selectedSeats: this.state.selectedSeats.filter((seat) => seat !== seatNo) })
        }
        else {
            this.setState({ selectedSeats: [...this.state.selectedSeats, seatNo] })
        }
    }
    continueToPayment() {
        const bookingDetails = {
            from: this.props.from,
            to: this.props.to,
            boardingTime: this.props.busInfo.pickupTime,
            boardingPoint: this.props.busInfo.pickupLocation,
            dropTime: this.props.busInfo.dropTime,
            dropLocation: this.props.busInfo.dropLocation,
            selectedSeats: this.state.selectedSeats,
            travelDate: this.props.date,
            bookedSeats: this.state.bookedSeats.concat(this.state.selectedSeats),
            ticketFare: this.props.busInfo.fare,
            busId: this.props.busInfo.id,
            totalCharges: (this.state.selectedSeats.length * this.props.busInfo.fare + this.state.selectedSeats.length * 30)
        }
        this.props.toggleseat();
        this.props.bookingSumary(bookingDetails);
    }
    render() {
        return (
            <div className="p-3" style={{ borderTop: '1px solid black' }}>
                <span className="float-right" style={{ cursor: 'pointer' }} onClick={this.props.toggleseat}><i className="fa fa-times fa-lg"></i></span>
                <div className="row mt-5">
                    <div className="col-sm-6">
                        <div className='row'>
                        <div className="col-sm-7">
                            <h2 className='ml-5' style={{ borderBottom: '2px solid black', width: '210px' }}>Book Your Seats</h2>
                            <div className="row bus-seats my-5 ml-5 pb-3">
                                <div className="col-sm-3 mt-3" >
                                    <div className="seat">
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                </div>
                                <div className="col-sm-3 mt-3" >
                                    <div className="seat "  >
                                        <i className="fa fa-chevron-circle-down" aria-hidden="true"></i>
                                    </div>
                                </div>
                                {this.state.seats.map((seat, index) =>
                                    seat === this.state.bookedSeats.find((bookseat) => bookseat === seat) ?
                                        <div className="col-sm-3 mt-3" >
                                            <div className="seat bookedSeat" id={seat} >
                                                {seat}
                                            </div>
                                        </div>
                                        : seat === this.state.selectedSeats.find((seatNumber) => seatNumber === seat) ?
                                            <div className="col-sm-3 mt-3" >
                                                <div className="seat selectedSeat" id={seat} >
                                                    <span onClick={() => this.bookSeats(seat)}>{seat}</span>
                                                </div>
                                            </div>
                                            :
                                            <div className="col-sm-3 mt-3" >
                                                <div className="seat" id={seat} >
                                                    <span onClick={() => this.bookSeats(seat)}>{seat}</span>
                                                </div>
                                            </div>
                                )}
                            </div>
                        </div>
                        <div className='col-sm-5'>
                               <div className='seatsInfo'>
                                   <div className='d-flex my-3'>
                                   <div className="seat" style={{backgroundColor:'white'}}>
                                    </div><h6 className='ml-3 mt-1'>Available</h6>
                                   </div>
                                   <div className='d-flex mb-3'>
                                   <div className="seat bookedSeat" >
                                    </div><h6 className='ml-3 mt-1'>Unavailable</h6>
                                   </div>
                                   <div className='d-flex'>
                                   <div className="seat selectedSeat">
                                    </div><h6 className='ml-3 mt-1'>Selected</h6>
                                   </div>
                                
                               </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <h2 style={{ borderBottom: '2px solid black', width: '270px' }}>Booking Summary</h2>
                        <table style={{ width: '110%' }}>
                            <tbody>
                                <tr><td style={{ width: '200px' }}>From</td><td>{this.props.from}</td></tr>
                                <tr><td>To</td><td>{this.props.to}</td></tr>
                                <tr><td>Date</td><td><Moment format="DD-MM-YYYY">{this.props.date}</Moment></td></tr>
                                <tr><td>Bus Type</td><td>{this.props.busInfo.type}</td></tr>
                                <tr><td>Boardring Point</td><td>{this.props.busInfo.pickupLocation}</td></tr>
                                <tr><td>Boarding Time</td><td>{this.props.busInfo.pickupTime}</td></tr>
                                <tr><td>Dropping Point</td><td>{this.props.busInfo.dropLocation}</td></tr>
                                <tr><td>Drop Time</td><td>{this.props.busInfo.dropTime}</td></tr>
                                <tr><td>Seat No</td><td>{this.state.selectedSeats.map((seats) => seats + ",  ")}</td></tr>
                                <tr><td>Fare</td><td>Rs {this.props.busInfo.fare * this.state.selectedSeats.length}</td></tr>
                                <tr><td>Service Charges</td><td>Rs {this.state.selectedSeats.length * 30}</td></tr>
                                <tr><td>Total Charges</td><td>Rs {this.state.selectedSeats.length * 30 + this.props.busInfo.fare * this.state.selectedSeats.length}</td></tr>
                            </tbody>
                        </table>
                        {this.state.selectedSeats.length > 0 && <Button color="success" onClick={() => this.continueToPayment()}>Continue to Payment</Button>}
                    </div>
                </div>
            </div>
        )
    }
}
export default SelectSeats;