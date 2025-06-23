import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

function Read() {
    const [data, setData] = useState([])
    const {id} = useParams();

    useEffect(()=>{
        axios
            .get(`/get_event/${id}`)
            .then((res)=>{
                setData(res.data)
            })
            .catch((err)=>
                console.log(err)
            );
    }, [id])
  return (
    <div className='container-fluid bg-primary vh-100 vm-100'>
      <h3>Event {id}</h3>
      <Link className='btn btn-success' to='/'>Back</Link>

        {data && (
            <ul className='list-group'>
                <li className='list-group-item'>
                    <b>ID:</b> {data.id}
                </li>
                <li className='list-group-item'>
                    <b>Event Name:</b> {data.e_name}
                </li>
                <li className='list-group-item'>
                    <b>Location:</b> {data.location}
                </li>
                <li className='list-group-item'>
                    <b>Max Count:</b> {data.max_count}
                </li>
            </ul>
        )}

    </div>
  )
}

export default Read
