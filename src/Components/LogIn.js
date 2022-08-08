import React from 'react';
import { Modal } from 'react-bootstrap'
import { FormGroup } from 'reactstrap';
import {withRouter} from'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import InputFields from  './InputFields';
class LogIn extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            email:'',
            password:'',
            name:'',
            authenticationError:false,
            userCredentials:[
                {
                    type:'email',
                    element:'input',
                    validatePattern:/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    error:{
                        requiredError:'Email is Reqiured',
                        validationError:'Enter Valid Email'
                    },
                    errorMsg:'',
                    field:'Email',
                    value:''
                },
                {
                    type:'password',
                    element:'input',
                    error:{
                        requiredError:'Password is Required',
                        validationError:''
                    },
                    errorMsg:'',
                    field:'Password',
                    value:''
                }
            ]
        }
        // const errorField='';
        
        // const Errormsg={
        //     email:"Email is Reqiured",
        //     passwordError="Password is Required"
        // }
        // const emailPattern="/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
        // const ;
        this.handleForm=this.handleForm.bind(this);
        this.authenticateUser=this.authenticateUser.bind(this);
    }
    handleForm(e,index){
        const userCredentials = [...this.state.userCredentials];
        const updatedCredentials= {...userCredentials[index]};
        updatedCredentials.value=e.target.value;
        this.checkValidity(e.target.value,updatedCredentials)
        userCredentials[index]=updatedCredentials
        this.setState({
            userCredentials:userCredentials
        })
        this.setState({userCredentials:userCredentials});
    }
    checkValidity(value,fields){
        if(value===''){
            fields.errorMsg=fields.error.requiredError
        }
        else{
            if(fields.error.validationError &&  !fields.validatePattern.test(value)){
                fields.errorMsg=fields.error.validationError
            }
            else{
                fields.errorMsg='';
            }
        }
    }
    authenticateUser(){
        const email=this.state.userCredentials[0].value;
        const password=this.state.userCredentials[1].value;
        let data={
            email:email,
            password:password    
        }
        axios.post('http://localhost:9000/users/user',data).then(res=>{
             if(res.data.user ==="User Authenticated"){
                 this.setState({authenticationError:false});
                 this.props.User({name:res.data.name, email:email,mobileNo:res.data.mobileNo})
                 this.props.history.push('/dashboard'); 
                this.props.hidemodal()
             }
             else{
                this.setState({authenticationError:true});
             }
        }).catch(err=> console.log(err))
    }
    render() {
        return (
            <Modal className='loginModal' show={this.props.show} size="md" aria-labelledby="contained-modal-title-vcenter" onHide={(e)=>this.props.hidemodal(e)} centered >
                <Modal.Header closeButton>
                    <Modal.Title>Log In</Modal.Title>
                </Modal.Header>
                <Modal.Body className="mt-3">
                    {
                        this.state.userCredentials.map((fields,index)=><InputFields fields={fields} key={index} index={index} handleForm={this.handleForm}/>)
                    }
                    {
                        this.state.authenticationError && <span className='ml-2' style={{color:'red', fontSize:'18px',fontWeight:500}}>Invalid Email Or Password </span>
                    }
                    <FormGroup>
                        <h6 className='mt-4'>No account? <span className='signUp' onClick={(e)=>this.props.showReg(e)}>Sign Up</span></h6>
                        <div className='mt-3'>
                            <button className="btn btn-success mr-3 " onClick={()=>this.authenticateUser()}>Login</button>
                            <button className="btn btn-danger " onClick={(e)=>this.props.hidemodal(e)}>Cancel</button>
                        </div>
                    </FormGroup>
                </Modal.Body>
            </Modal>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        User:(data) => dispatch({type:"userDetails",value:{user:data.name,email:data.email,mobileNo:data.mobileNo}})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(LogIn)) ;