import React from 'react';
import LogIn from './LogIn'
import Registration from './Registration';
class HomePage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            showLogIn:false,
            showReg:false,
        }
        this.toggleLoginModal= this.toggleLoginModal.bind(this);
        this.toggleRegModal=this.toggleRegModal.bind(this);
    }
    toggleLoginModal (){
        this.setState({showLogIn:!this.state.showLogIn})
    }
    toggleRegModal(){
        this.setState({showReg:!this.state.showReg,showLogIn:false})    
    }
    render(){
        return(
            <React.Fragment>
            <div className='container-fluid homePageContainer' >
               <h1 style={{ textAlign: 'center' }} className='homePageLogo'>Make Your Trip</h1>
                <div className="square_btn">
	                <span onClick={this.toggleLoginModal}>Book Bus Tickets</span>
                </div>
            </div>
            <LogIn show={this.state.showLogIn} hidemodal={(e)=>this.toggleLoginModal(e)} showReg={(e)=>this.toggleRegModal(e)}/> 
            <Registration showReg={this.state.showReg} hideRegmodal={this.toggleRegModal}/>
            </React.Fragment>
        )
    }
}
export default HomePage;