import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Ticket from './Ticket';
import {withRouter} from'react-router-dom';
import EmptyBuses from './EmptyBuses';
class ViewTicket extends React.Component{
    constructor(props){
        super(props)
        this.state={
            bookingSummary:'',
            userDetails:this.props.userDetails
        }
    }
    componentDidMount(){
        const data={
            user:this.state.userDetails.user,
            email:this.state.userDetails.email
        }
        axios.post('http://localhost:9000/tickets/ticket',data).then((res)=>{
            if(res.data!=="No tickets found"){
                this.setState({bookingSummary:res.data})
            }
        }).catch(err=>console.log(err))
    }
    render(){
        return(
            <div className="container mt-5 p-3 container-style ">
                <div className='d-flex justify-content-between'>
                <div></div>
                <h4 style={{textAlign:'center', fontWeight:'600'}}>Booked Tickets Summary</h4>
                <span className="float-right" style={{ cursor: 'pointer' }} onClick={()=>this.props.viewTicketSummary()}><i className="fa fa-times fa-lg"></i></span>
                </div>
                {
                    (this.state.bookingSummary.length>0)? this.state.bookingSummary.map((ticketInfo,index)=><Ticket ticketInfo={ticketInfo} key={index}/>):<EmptyBuses value="No Tickets Available"/>
                }
            </div>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        userDetails:state.userDetails
    }
}
export default connect(mapStateToProps)(withRouter(ViewTicket));