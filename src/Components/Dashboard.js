import React from 'react';
import Buses from './Buses';
import Payment from './Payment';
import {Input} from 'reactstrap';
import axios from 'axios';
import ViewTicket from './ViewTicket';
import EmptyBuses from './EmptyBuses';
import {connect} from 'react-redux';
class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            busses:"",
            from:'',
            to:'',
            errmsg:'',
            dateOfJourney:'',
            dateOfReturn:'',
            bookingDetails:'',
            showBuses:false,
            showPayment:false,
            noBusFound:false,
            showTicket:this.props.ticket,
            showTicketConfirmation:false,
            userDetails:this.props.userDetails,
            errorMessage:''
        }
        this.handleFormChange=this.handleFormChange.bind(this);
        this.searchBuses=this.searchBuses.bind(this);
        this.bookingSumary=this.bookingSumary.bind(this);
        this.paymentSummary=this.paymentSummary.bind(this);
        this.viewTicketSummary=this.viewTicketSummary.bind(this);
    }
    handleFormChange(e){
        this.setState({[e.target.id]:e.target.value})
    }
    componentDidUpdate(prevProps){
        if(this.props.ticket!==prevProps.ticket){
            this.setState({showTicket:this.props.ticket,showPayment:false,showBuses:false,noBusFound:false})
        }
    }
    searchBuses(){
        this.props.viewTicket(false)
        if(this.state.from==='' || this.state.to===''||this.state.dateOfJourney===''){
            if(this.state.from===''){
                this.setState({errorMessage:'Please Select Origin'})
            }
            else if(this.state.to===''){
                this.setState({errorMessage:'Please Select Destination'})
            }
            else if(this.state.dateOfJourney===''){
                this.setState({errorMessage:'Please Select Date of Journey'})
            }
        }
        else{
            this.setState({errorMessage:''})
            const data={
                from:this.state.from,
                to:this.state.to
            }
            axios.post('http://localhost:9000/buses/routes',data).then(res=>{
               if(res.data.length>0){
                   this.setState({busses:res.data,showBuses:true,errmsg:'',noBusFound:false,showPayment:false})
               }
               else{
                   this.setState({noBusFound:true,showBuses:false})
               }
            }).catch(err=>console.log(err));
        }      
    }
    bookingSumary(bookingDetails){
       this.setState({bookingDetails:bookingDetails,showBuses:false,showPayment:true})
    }
    paymentSummary(value){
        this.setState({showPayment:false})
        if(value!=="cancel"){
            this.props.viewTicket(true)
        }   
    }
    viewTicketSummary(){
        this.props.viewTicket(false)
    }
    render() {
        return ( 
            <div className='dashboardContainer'>
            <div className="container-fluid ">
                <h1 style={{ textAlign: 'center' }} className='logo'>Make Your Trip</h1>
                <h2 style={{ textAlign: 'center' }} className='mt-3'>Book Bus Tickets</h2>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-sm-2">
                            <h6 style={{ fontSize: '20px' }}>Leaving From</h6>
                            <Input list="fromData" name="from" id="from" placeholder="Leaving From" value={this.state.from} onChange={(e)=>this.handleFormChange(e)}/>
                            <datalist id="fromData">
                                <option value="Mysore" />
                                <option value="Chennai" />
                                <option value="Banglore" />
                                <option value="Hyderabad" />
                                <option value="Pune" />
                                <option value="Manglore" />
                            </datalist>

                        </div>
                        <div className="col-sm-2">
                            <h6 style={{ fontSize: '20px' }}>Going To</h6>
                            <Input list="toData" name="to" id="to" placeholder="Going To" value={this.state.to} onChange={(e)=>this.handleFormChange(e)}/>
                            <datalist id="toData">
                                <option value="Mysore" />
                                <option value="Chennai" />
                                <option value="Banglore" />
                                <option value="Hyderabad" />
                                <option value="Pune" />
                                <option value="Manglore" />
                            </datalist>
                        </div>
                        <div className="col-sm-3">
                            <h6 style={{ fontSize: '20px' }}>Date of Journey</h6>
                            <Input type="date" id="dateOfJourney" name="dateOfJourney" onChange={(e)=>this.handleFormChange(e)}/>
                        </div>
                        <div className="col-sm-3">
                            <h6 style={{ fontSize: '20px' }}>Date of Return (Optional)</h6>
                            <Input type="date" id="dateOfReturn" name="dateOfReturn" onChange={(e)=>this.handleFormChange(e)} />
                        </div>
                        <div className="col-sm-2">
                            <button className="searchBtn" onClick={()=>this.searchBuses()}>Search</button>
                        </div>
                    </div>
                    <p className='mt-3' style={{textAlign:'center'}}><span className='ml-2' style={{color:'red', fontSize:'18px',fontWeight:600}}>{this.state.errorMessage}</span></p>
                </div>
                {
                    (this.state.busses.length>0 && this.state.showBuses) ? this.state.busses.map((busInfo,index)=><Buses busInfo={busInfo} from={this.state.from} to={this.state.to} key={index} date={this.state.dateOfJourney}  bookingSumary={this.bookingSumary} />) :  this.state.noBusFound && <EmptyBuses value="No Buses found in this route"/>
                }
                {
                    (this.state.showPayment)? <Payment bookingDetails={this.state.bookingDetails} paymentSummary={this.paymentSummary}/>:''
                }
                {
                    (this.state.showTicket) ? <ViewTicket viewTicketSummary={this.viewTicketSummary}/>:''
                }         
            </div>
            </div>)
    }
}
const mapStateToProps = (state) =>{
    return {
        userDetails:state.userDetails,
        ticket:state.viewTicket
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        viewTicket:(value) => dispatch({type:"viewTickets",value:value})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Dashboard);