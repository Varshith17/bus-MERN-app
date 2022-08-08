import React from 'react';
import { Modal} from 'react-bootstrap'
import { Button, FormGroup } from 'reactstrap';
import {withRouter} from'react-router-dom';
import axios from 'axios';
import InputFields from  './InputFields';
import {connect} from 'react-redux';
class Registration extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            name:'',
            email:'',
            mobileNo:'',
            password:'',
            DOB:'',
            gender:'',
            disabledBtn:true,
            userCredentials:[
                {
                    type:'text',
                    element:'input',
                    validatePattern:/^[a-zA-Z ]{5,30}$/,
                    error:{
                        requiredError:'Name is Reqiured',
                        validationError:'Accepts Alphabets, space & Min 5 to Max 30 Char'
                    },
                    errorMsg:'',
                    field:'Name',
                    value:''
                },
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
                    validatePattern:/^[a-zA-z0-9]{8,32}$/,
                    error:{
                        requiredError:'Password is Required',
                        validationError:'Password must contain min 8 character'
                    },
                    errorMsg:'',
                    field:'Password',
                    value:''
                },
                {
                    type:'text',
                    element:'input',
                    validatePattern:/^[0-9]{10}$/,
                    error:{
                        requiredError:'Mobile Number is Required',
                        validationError:'Enter Valid Mobile Number'
                    },
                    errorMsg:'',
                    field:'Mobile Number',
                    value:''
                },
                {
                    type:'date',
                    element:'input',
                    validatePattern:'',
                    error:{
                        requiredError:'Date of Birth is Required',
                        validationError:''
                    },
                    errorMsg:'',
                    field:'Mobile Number',
                    value:''
                },
                {
                    type:'radio',
                    element:'radio',
                    validatePattern:'',
                    name:'gender',
                    error:{
                        requiredError:'Gender is Required',
                        validationError:''
                    },
                    value:'Male',
                    errorMsg:'',
                    numberofFields:[
                        {
                            field:'Male',
                            value:'Male',
                        },
                        {
                            field:'Female',
                            value:'Female'
                        }
                    ]
                },
            ]
        }
        
        this.handleForm=this.handleForm.bind(this);
        this.submitForm=this.submitForm.bind(this);
        this.checkValidity=this.checkValidity.bind(this);
        this.handleCreateAccount=this.handleCreateAccount.bind(this);
    }
    // handleForm(e){
    //     this.setState({[e.target.name]:e.target.value});
    // }
    handleCreateAccount(){
        let check=false
        this.state.userCredentials.forEach((fields)=>{
            if(fields.errorMsg!=='' || fields.value==='')
                 check=true;
        })
        if(check){
            this.setState({disabledBtn:true})
        }
        else{
            this.setState({disabledBtn:false})
        }
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
        this.handleCreateAccount();
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
    submitForm(){
        let data={
            name:this.state.userCredentials[0].value,
            email:this.state.userCredentials[1].value,
            password:this.state.userCredentials[2].value,
            mobileNo:this.state.userCredentials[3].value,
            DOB:this.state.userCredentials[4].value,
            gender:this.state.userCredentials[5].value,   
        }
        axios.post('http://localhost:9000/users',data).then(res=>{
            if(res.data.user ==="Account created"){ 
                this.props.User({name:data.name, email:data.email,mobileNo:data.mobileNo})
                this.props.hideRegmodal()
                this.props.history.push('/dashboard');      
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    render() {
        return (
            <Modal show={this.props.showReg} size="md" aria-labelledby="contained-modal-title-vcenter" onHide={this.props.hideRegmodal} >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Create Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.userCredentials.map((fields,index)=><InputFields fields={fields} key={index} index={index} handleForm={this.handleForm}/>)
                    }
                    <FormGroup>
                    <Button color='success' onClick={(e)=>this.submitForm()} disabled={this.state.disabledBtn} >Create Account</Button>
                    <button className='btn btn-danger float-right' onClick={this.props.hideRegmodal}>Cancel</button>
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
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Registration)) ;
//export default withRouter(Registration);