import React from 'react'
import axios from 'axios'
import SweetAlert from 'react-bootstrap-sweetalert' 

class Register extends React.Component{
    constructor(){
        super()
        this.state = {
            users : [],
            userR : '',
            name : '',
            email : '',
            phone : '',
            experience : '',
            skills : '',
            jobTitle : '',
            flagS : false,
            flagE : false   
        }
    }

    handleChange=(e)=>{
        this.setState({ [e.target.name] : e.target.value} )
    }

    handleSubmit=(e)=>{
        e.preventDefault()
   
        const formData = {
            name : this.state.name,
            email : this.state.email,
            phone : this.state.phone,
            experience : this.state.experience,
            skills : this.state.skills,
            jobTitle : this.state.jobTitle
        }
        // console.log(formData)

        if( this.state.name == "" || this.state.email == "" || this.state.phone == "" || this.state.experience == "" 
        || this.state.skills == "" || this.state.jobTitle == ""){

            this.setState({ flagE : true })
        }
        else{

            this.setState({ flagS : true })
        }

        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const users = response.data
            this.setState({ users })
            console.log(users)
        })
        .catch((err)=>{
            alert(err.message)
        })
        
        axios.post('http://dct-application-form.herokuapp.com/users/application-form',formData)
        .then((response)=>{
            const userP = response.data

            this.setState({ name : '',
                            email : '',
                            phone : '',
                            experience : '',
                            skills : '',
                            jobTitle : '' })
            console.log(userP)
            console.log(this.state.jobTitle)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    onRecieveInput=()=>{
        // console.log('Ok Clicked')
        this.setState({ flagE : false , flagS : false })

    }

    render(){
        return(
            <div > 
                <h1>Job Application</h1>
                <form onSubmit={this.handleSubmit}>
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Full Name  </b></label>
                        <div class="col-sm-4">
                            <input class="form-control form-control-sm" type="text" name="name" value={this.state.name} 
                            onChange={this.handleChange}/>
                        </div>  
                    </div><hr/>
                    {/* <Form.Group as={Row} controlId="formHorizontalName">
                       <Form.Label column sm={2}>Full Name</Form.Label>
                       <Col sm={6}>
                       <Form.Control type="text" name='name' value={this.state.name} placeholder="Enter your name" onChange={this.handleChange} />
                       </Col>
                    </Form.Group> */}
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Email address  </b></label>
                        <div class="col-sm-4">
                            <input class="form-control form-control-sm" type="text" name="email" placeholder="example@gmail.com" 
                            value={this.state.email} onChange={this.handleChange}/>
                        </div>     
                    </div><hr/>
                   
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Contact Number  </b></label>
                        <div class="col-sm-4">
                            <input class="form-control form-control-sm" type="text" name="phone" placeholder="+91 9900554344" 
                            value={this.state.phone} onChange={this.handleChange}/>
                        </div>     
                    </div><hr/>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Applying for job  </b></label>
                        <div class="col-sm-4">
                            <select class="form-control form-control-sm" name="jobTitle" onChange={this.handleChange}>
                                <option value = "">----Select----</option>
                                <option value = "Front-End Developer"> Front End Developer</option>
                                <option value = "Node.js Developer"> Node js Developer</option>
                                <option value = "MEAN Stack Developer"> MEAN Stack Developer</option>
                                <option value = "FULL Stack Developer"> FULL Stack Developer</option>
                            </select>
                        </div>        
                    </div><hr/>
                    
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Experience  </b></label>
                        <div class="col-sm-4">
                            <input class="form-control form-control-sm" type="text" name="experience" 
                            placeholder="Experience (2 years, 3 months)" 
                            value={this.state.experience} onChange={this.handleChange}/>
                        </div>
                    </div><hr/>
                    
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label"><b>Technical Skills  </b></label>
                        <div class="col-sm-4">
                            <textarea class="form-control form-control-sm" name="skills" cols="40" rows="5" 
                            value={this.state.skills} placeholder="Technical Skills"
                            onChange={this.handleChange}></textarea>
                        </div>  
                    </div>

                    <SweetAlert
                        success
                        title="Success Data!"
                        show={this.state.flagS}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Your Registration form has been submitted Succesfully !
                    </SweetAlert>

                    <SweetAlert
                        warning
                        title="Error Data!"
                        show={this.state.flagE}
                        onConfirm={(response) => this.onRecieveInput(response)}
                        // onCancel={this.onCancel}
                        >
                    Please Enter all the required fields !
                    </SweetAlert>
                     
                    <input className="btn btn-info" type="submit" value="Send Application"></input>
                </form>
            </div>
        )
    }
}
export default Register