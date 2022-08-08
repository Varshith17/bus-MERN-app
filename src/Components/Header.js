import React from'react';
import {withRouter} from'react-router-dom';
import LogIn from './LogIn'
import Registration from './Registration';
import {connect} from 'react-redux';
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showLogIn:false,
            showReg:false,
            logoutModal:false,
        }
        this.toggleLoginModal= this.toggleLoginModal.bind(this);
        this.toggleRegModal=this.toggleRegModal.bind(this);
        this.toggleLogOutModal=this.toggleLogOutModal.bind(this);
        this.logOut=this.logOut.bind(this);
        this.viewTicket=this.viewTicket.bind(this);
    }
    toggleLoginModal (){
        this.setState({showLogIn:!this.state.showLogIn})
    }
    toggleRegModal(){
        this.setState({showReg:!this.state.showReg,showLogIn:false})    
    }
    toggleLogOutModal(){
        this.setState({logoutModal:!this.state.logoutModal})
    }
    logOut(){
        this.toggleLogOutModal()
        this.props.history.push('/');  
    }
    viewTicket(){
        this.props.viewTicket(true);
    }
    render(){
        return(
            <React.Fragment>
            <div className='header'>
                 <span>Make Your Trip</span>
                <div className="navlinks"> 
                <div>
                <ul>
                    <li>Offers</li>
                    <li>Help</li>
                    <li>About Us</li>
                  </ul>
                </div>
                    <span className='pl-3' style={{cursor:'pointer'}} onClick={(this.props.location.pathname==='/dashboard')?this.toggleLogOutModal:this.toggleLoginModal}><i className="fa fa-user-circle-o" aria-hidden="true"></i></span>
                </div>     
            </div>
            { this.state.logoutModal && <div className='logOutModal'>
                <div className='pt-1 logOutModalContent'><span onClick={this.logOut}>Logout</span></div>
                <div className='pt-1 logOutModalContent'><span onClick={(e)=>this.viewTicket()}> View Tickets</span></div>
            </div>}
            <LogIn show={this.state.showLogIn} hidemodal={(e)=>this.toggleLoginModal(e)} showReg={(e)=>this.toggleRegModal(e)}/> 
            <Registration showReg={this.state.showReg} hideRegmodal={this.toggleRegModal}/>
            </React.Fragment>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        viewTicket:(value) => dispatch({type:"viewTickets",value:value})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Header));
//export default Header;