import React from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import moment from 'moment'
import 'bootstrap/dist/css/bootstrap.css' // npm install bootstrap
// import SweetAlert from 'sweetalert-react' //npm install sweetalert-react
// import 'sweetalert/dist/sweetalert.css'
import MDEmployeeTable from './MDTable'

const customStyles = {
    content : {
      position              : 'fixed',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      borderRadius          : '4px',
      transform             : 'translate(-50%, -50%)'
    },
    overlay : {
        position: 'fixed',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width:'100%',
        height: '100%',
        backgroundColor : 'rgba(0, 0, 0, 0.15)',
        padding : '50'
    }
    // overlay: {
    //     position: 'fixed',
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: 'rgba(255, 255, 255, 0.75)'
    //   }
  }

class Dashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            statusUpd : {},
            users : [],
            filter:[],
            btnL : '',
            status : '',
            id : '',
            modalIsOpen : false,
            nameM : '',
            contactM : '',
            emailM : '',
            skillsM : '',
            expM : ''
        }
    }
    handleBtn=(e)=>{
        const btnL = e.target.value
        this.setState({ btnL })
        // console.log('handle',this.state.users)
        // console.log(btnL)
        axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
        .then((response)=>{
            const users = response.data
            const filter = users.filter(ele => ele.jobTitle == btnL)
            this.setState({ users })
            this.setState({ filter })
            // console.log(filter)  
            // console.log(users)
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    // componentDidMount=()=>{
    //     axios.get('http://dct-application-form.herokuapp.com/users/application-forms')
    //     .then((response)=>{
    //         const users = response.data
    //         this.setState({ users })
    //         // console.log(users)
    //     })
    //     .catch((err)=>{
    //         alert(err.message)
    //     })
    // }

    handleStatus=(e)=>{
        const status = e.target.value
        const id = e.target.name
        this.setState({ status , id })
        const formData = {
            status : status
        }
        axios.put(`http://dct-application-form.herokuapp.com/users/application-form/update/${id}`,formData)
        .then((response)=>{
            const statusUpd = response.data
            this.setState({ statusUpd })
            // console.log(statusUpd)
            this.updateuser(statusUpd)
        })
        .catch((err)=>{
            alert(err.message)
        })  
    }

    updateuser = (updatedVal) => {
        this.setState((prevState) => {
            return {
                filter : prevState.filter.map((user) => {
                    if(user._id == updatedVal._id) {
                        return Object.assign({}, user, updatedVal)
                    } else {
                        return Object.assign({}, user)
                    }
                }),
            }
        })
        // console.log('users')
        // console.log(this.state.filter)
    }

    // openAlert=(uId)=>{
    //     axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${uId}`)
    //     .then((response)=>{
    //         const userD = response.data
    //         const display = `${userD.name} Profile \n 
    //                         Contact Number : ${userD.phone} \n 
    //                         Email : ${userD.email} \n 
    //                         Skills : ${userD.skills} \n 
    //                         Experience : ${userD.experience}`
    //         alert(display)
    //     })
    //     .catch((err)=>{
    //         alert(err.message)
    //     })
    // }

    openModal=(uId)=>{
        axios.get(`http://dct-application-form.herokuapp.com/users/application-form/${uId}`)
        .then((response)=>{
            const userD = response.data
            // console.log(userD)
            this.setState((prevState)=>{
                return{
                    modalIsOpen : true,
                    nameM : userD.name,
                    contactM : userD.phone,
                    emailM : userD.email,
                    skillsM : userD.skills,
                    expM : userD.experience
                }
            })          
        })
        .catch((err)=>{
            alert(err.message)
        })
    }

    closeModal=()=>{
        this.setState((prevState)=>{
            return{
                modalIsOpen : false
            }
        })
    }

    // afterOpenModal=()=>{
    //     subtitle.style.color = '#f00'
    // }

    render(){
        // document.body.style.backgroundColor = "#ff0066"
        return(
            <div>
                <h1>Admin Dashboard</h1>
                <button class="btn btn-outline-secondary" value="Front-End Developer" 
                onClick={this.handleBtn} > Front-End Developer </button>{' '}
                <button class="btn btn-outline-secondary" value="Node.js Developer" 
                onClick={this.handleBtn} > Node js Developer </button>{' '}
                <button class="btn btn-outline-secondary" value="MEAN Stack Developer" 
                onClick={this.handleBtn} > MEAN Stack Developer </button>{' '}
                <button class="btn btn-outline-secondary" value="FULL Stack Developer" 
                onClick={this.handleBtn} > Full Stack Developer </button><br/><br/>
                <h2>{this.state.btnL} </h2>
                <p>List of candidates applied for <b>{this.state.btnL}</b> job</p>

                {/* <MDEmployeeTable data={this.state.filter} /> */}
                <table class="table" >
                    <thead class="thead-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.filter.map((item, i)=>{
                            return(
                                <tr key={item._id}>
                                    <td>{i+1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.skills} </td>
                                    <td>{item.experience}</td>
                                    <td>{moment(item.createdAt).format('dddd MMMM Do YYYY')}</td>
                                    <td>
                                        <button className="btn btn-info" onClick={() => this.openModal(item._id)}>View Details</button>
                                        
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                        
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal">
                                    
                                            <h1>{this.state.nameM} Profile</h1><hr/>
                                            <label><b>Contact Number : </b></label>
                                            <p>{this.state.contactM}</p><br/>
                                            <label><b>Email : </b></label>
                                            <p>{this.state.emailM}</p><br/>
                                            <label><b>Skills : </b></label>
                                            <p>{this.state.skillsM}</p><br/>
                                            <label><b>Experience : </b></label>
                                            <p>{this.state.expM}</p><br/><hr/>
                                            
                                            <button onClick={this.closeModal}>close</button>
                                        </Modal>
                                       
                                    </td>
                                    <td>{item.status=="applied" ? 
                                    <div><button className="btn btn-success" name={item._id} 
                                    value="shortlisted"onClick={this.handleStatus}>Shortlist</button>
                                    <button className="btn btn-danger" name={item._id} 
                                    value="rejected" onClick={this.handleStatus}>Reject</button> </div> : 
                                    (
                                        item.status=="rejected" ? <button className="btn btn-danger">Rejected</button>:
                                        <button className="btn btn-success" >Shortlisted</button>
                                    )}</td>
                                    
                                </tr> 
                            )
                        })
                    }      
                    </tbody>
                </table>        
            </div>
        )
    }
}
export default Dashboard