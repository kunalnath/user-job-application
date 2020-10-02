import React from 'react' 
import { MDBDataTableV5 } from 'mdbreact';

const MDEmployeeTable = (props) => {
    const data = {
        columns: [
            {
                label: 'Name',
                field: 'name', 
                sort: 'asc'
            },
            {
                label: 'Technical Skills',
                field: 'skills'
            },
            {
                label: 'Experience',
                field: 'experience',
            },
            { 
                label: 'Applied Date', 
                field: 'createdAt'
            },
            { 
                label: 'Actions', 
                field: 'actions'
            }
        ],
        rows: props.data.map((ele)=>{
            return {
                name: ele.name,
                skills: ele.skills,
                experience: ele.experience,
                createdAt: ele.createdAt,
                actions: <button className="btn btn-danger" onClick={function(){
                    props.removeEmployee(ele.id)
                }}>remove</button> 

            }
        })
    }
    return <MDBDataTableV5 data={data} searchTop searchBottom={false}/>
}

export default MDEmployeeTable