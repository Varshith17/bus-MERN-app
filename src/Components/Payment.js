import { Button } from 'reactstrap';
import Cards from "react-credit-cards";
import 'react-credit-cards/es/styles-compiled.css';
import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios'
class Payment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            bookingDetails: this.props.bookingDetails,
            passengerDetails: [],
            passengerDetailsError: {
                name: "Name Required",
                age: "Age Required",
                gender: "Gender Required"
            },
            cardDetailsError: {
                cvc: '',
                expiry: '',
                name: '',
                number: '',
                type: ''
            },
            cardDetailsErrorValues: {
                number: "Card Number Required",
                type: "Card Type Required",
                name: 'Name Required',
                cvc: 'CVV Number Required',
                expiry: 'Expiry Month and Year Required',
            },
            cardvalidation:{
                number:/^[0-9]{16}$/,
                cvc:/^[0-9]{3}$/,
            },
            cardvalidationError:{
                number:'Enter valid 16 digit card number',
                cvc:'Enter valid 3 digit cvc number'
            },
            passengerError: '',
            paymentBtn: true,
            user: this.props.userDetails.user,
            email: this.props.userDetails.email,
            mobileNo: this.props.userDetails.mobileNo,
            debitCardDetails: {
                cvc: '',
                expiry: '',
                focus: '',
                name: '',
                number: '',
                type: ''
            }
        }

        this.updatePassengerDetails = this.updatePassengerDetails.bind(this);
        this.handleError = this.handleError.bind(this);
        this.payAmount = this.payAmount.bind(this);
        this.handlePaymentBtn = this.handlePaymentBtn.bind(this);
        this.handleInputFocus = this.handleInputFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentDidMount() {
        let passengerDetails = [];
        this.props.bookingDetails.selectedSeats.map((data) => passengerDetails.push({
            name: '', seat: data, age: '', gender: '',
            errorFields: { name: '', age: '', gender: '' }
        }));
        this.setState({ passengerDetails: passengerDetails })
    }
    handleInputFocus(e) {
        let debitCardDetails = { ...this.state.debitCardDetails }
        const { name } = e.target;
        debitCardDetails['focus'] = name
        this.setState({ debitCardDetails: debitCardDetails });
    }
    checkCardValidData(name,value,cardDetailsError){
        if(!this.state.cardvalidation[name].test(value)){
            cardDetailsError[name]=this.state.cardvalidationError[name];
        }
        else{
            cardDetailsError[name]=''
        }
    }
    handleInputChange(e) {
        let debitCardDetails = { ...this.state.debitCardDetails }
        const { name, value } = e.target;
        if(name==='expiry'){
            let expiry = value.substr(5,2) + value.substr(2,2)
            debitCardDetails[name] = expiry
        }
        else{
            debitCardDetails[name] = value
        }
        let cardDetailsError = { ...this.state.cardDetailsError }
        if (value === '') {
            cardDetailsError[name] = this.state.cardDetailsErrorValues[name]
        }
        else {
            if(name==='number'||name==='cvc'){
                this.checkCardValidData(name,value,cardDetailsError)
            }
            else{
                cardDetailsError[name] =''
            }
        }
        this.setState({ debitCardDetails: debitCardDetails, cardDetailsError: cardDetailsError });
        this.handlePaymentBtn();
    }
    handleError() {
        let passengerDetails = [...this.state.passengerDetails];
        let passengerError = false;
        passengerDetails.forEach((element) => {
            if (element.name === '') {
                passengerError = true;
                element['errorFields'].name = this.state.passengerDetailsError['name'];
            }
            if (element.age === '') {
                passengerError = true
                element['errorFields'].age = this.state.passengerDetailsError['age'];
            }
            if (element.gender === '') {
                passengerError = true
                element['errorFields'].gender = this.state.passengerDetailsError['gender'];
            }
        });
        if (passengerError) {
            this.setState({ passengerError: "Passenger Details Required", passengerDetails: passengerDetails })
            return false;
        }
        else {
            this.setState({ passengerError: "" });
            return true
        }
    }
    handlePaymentBtn() {
        if (this.state.debitCardDetails.name && this.state.debitCardDetails.type && this.state.debitCardDetails.cvc && this.state.debitCardDetails.expiry && this.state.debitCardDetails.number) {
            this.setState({ paymentBtn: false })
        }
        else {
            this.setState({ paymentBtn: true })
        }
    }
    updatePassengerDetails(e, index) {
        let passengerDetails = [...this.state.passengerDetails]
        let element = passengerDetails[index]
        element[e.target.id] = e.target.value;
        if (!e.target.value) {
            element.errorFields[e.target.id] = this.state.passengerDetailsError[e.target.id]
        }
        else {
            element.errorFields[e.target.id] = ''
        }
        this.setState({ passengerDetails: passengerDetails })
    }
    payAmount() {
        let passengererror=false
        passengererror= this.handleError();
        if(passengererror){
            console.log("120")
            const paymentInfo =
            {
                paymentInfo: this.state.debitCardDetails,
                passengerDetails: this.state.passengerDetails,
                user: this.state.user,
                email: this.state.email,
                mobileNo: this.state.mobileNo
            }
    
            const bookingDetails = Object.assign(this.state.bookingDetails, paymentInfo)
            console.log(bookingDetails.bookedSeats, bookingDetails.busId);
            axios.post('http://localhost:9000/tickets', bookingDetails).then((res) => {
                if (res.data === "Ticket Booked") {
    
                }
            }).catch(err => console.log(err));
            axios.post('http://localhost:9000/buses/seats', { busId: bookingDetails.busId, bookedSeats: bookingDetails.bookedSeats }).then((res) => {
                if (res.data === "Seats Booked") {
                    this.props.paymentSummary();
                }
            }).catch(err => console.log(err));
        }
       
    }
    render() {
        return (
            <div className="container mt-5 p-5 container-style" >
                <div className="container mb-3">
                    <h4>Enter Passenger Details:</h4>
                    {this.state.passengerDetails.map((passenger, index) =>
                        <div className='d-flex' key={passenger.seat}>
                            <div>
                                <input type="text" id="name" onChange={(e) => this.updatePassengerDetails(e, index)} placeholder="Name" />
                                <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}>{passenger.errorFields.name}</span></p>
                            </div>
                            <div>
                                <input className="ml-1" id="age" type="number" style={{ width: '50px' }} onChange={(e) => this.updatePassengerDetails(e, index)} placeholder="Age" />
                                <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}>{passenger.errorFields.age}</span></p>
                            </div>
                            <div className='ml-1'>
                                <label>
                                    <input className="ml-1" type="radio" id="gender" value="Male" onChange={(e) => this.updatePassengerDetails(e, index)} name={passenger.seat} />Male
                                </label>
                                <label>
                                    <input className="ml-1" type="radio" id="gender" value="Female" onChange={(e) => this.updatePassengerDetails(e, index)} name={passenger.seat} />Female
                                </label>
                                <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}>{passenger.errorFields.gender}</span></p>
                            </div>

                        </div>)}
                    <span className='ml-2' style={{ color: 'red', fontSize: '16px', fontWeight: 600 }}>{this.state.passengerError} </span>
                </div>
                <div className="container row">
                    <div className="col-sm-6">
                        <div className='d-flex'>
                            <h3>Payment</h3>
                            <h6 className='mt-2 ml-5' style={{ fontWeight: 600 }}>Amount: ₹ {this.state.bookingDetails.totalCharges}</h6>
                        </div>
                        <div className='debitCard'>
                            <Cards
                                className='m-0'
                                cvc={this.state.debitCardDetails.cvc}
                                expiry={this.state.debitCardDetails.expiry}
                                focused={this.state.debitCardDetails.focus}
                                name={this.state.debitCardDetails.name}
                                number={this.state.debitCardDetails.number}
                            />
                        </div>
                        <div className='ml-5 mt-4 pl-2'>
                        <Button className="mt-3" disabled={this.state.paymentBtn} onClick={() => { this.payAmount() }} color="success">Pay</Button><Button className=" mt-3 ml-3" color="danger" onClick={(e)=>this.props.paymentSummary("cancel")}>Cancel</Button>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div>
                            <input type="radio" id="type" name="type" value="Visa" onChange={this.handleInputChange} /> Visa
                        <input type="radio" className='ml-1' id="cardType" name="type" value="Master Card" onChange={this.handleInputChange} /> Master Card
                        <input type="radio" id="cardType" className='ml-1' name="type" value="Rupay" onChange={this.handleInputChange} /> Rupay
                        <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}>{this.state.cardDetailsError["type"]}</span></p>
                        </div>
                        <input
                            type="number"
                            className='cardInput'
                            name="number"
                            placeholder="Card Number"
                            onFocus={this.handleInputFocus}
                            onChange={this.handleInputChange}
                        />
                        <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}> {this.state.cardDetailsError["number"]}</span></p>
                        <input
                            type="text"
                            className='cardInput'
                            name="name"
                            placeholder="Your Name"
                            onFocus={this.handleInputFocus}
                            onChange={this.handleInputChange}
                        />
                        <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}> {this.state.cardDetailsError["name"]}</span></p>
                        <input
                            className='cardInput'
                            type="number"
                            name="cvc"
                            placeholder="CVC"
                            onFocus={this.handleInputFocus}
                            onChange={this.handleInputChange}
                        />
                        <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}> {this.state.cardDetailsError["cvc"]}</span></p>
                        <input
                            type="month"
                            className='cardInput'
                            name="expiry"
                            placeholder="Expiry Year MM/YY"
                            onFocus={this.handleInputFocus}
                            onChange={this.handleInputChange}
                        />
                        <p><span style={{ color: 'red', fontSize: '14px', fontWeight: 600 }}> {this.state.cardDetailsError["expiry"]}</span></p>
                    </div>
                </div>

            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        userDetails: state.userDetails
    }
}
export default connect(mapStateToProps)(Payment);