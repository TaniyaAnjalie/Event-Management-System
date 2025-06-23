import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Create() {

  const [values, setValues] = useState({
        e_name: '',
        location: '',
        max_count: '',
        // gender: '',
  })

  const navigate = useNavigate()

  function handleSubmit(e){
    e.preventDefault()
    console.log("Submitting:", values);

    axios.post('/add_event', values)
    .then((res)=>{
      navigate('/')
      console.log(res)
      })
    .catch((err)=>console.log("Axios Error:", err))
  }

  return (
    <div className='container vh-100 vw-100 bg-primary'>
      <div className='row'>
        <h3>Add Event</h3>
        <div className='d-fex justify-content-end'>
            <Link to='/' class='btn btn-success'>Home</Link>
        </div>
        <form onSubmit={handleSubmit}>
            <div className='form-group my-3'>
                <label htmlFor='name'>Event Name: </label>
                <input type='text' name='e_name' onChange={(e)=> setValues({...values, e_name: e.target.value})} />
            </div>

            <div className='form-group my-3'>
                <label htmlFor='name'>Location: </label>
                <input type='text' name='location' onChange={(e)=> setValues({...values, location: e.target.value})} />
            </div>

            <div className='form-group my-3'>
                <label htmlFor='name'>Max Count: </label>
                <input type='number' name='max_count' onChange={(e)=> setValues({...values, max_count: e.target.value})} />
            </div>

            {/* <div className='form-group my-3'>
                <label htmlFor='name'>Gender: </label>
                <input type='text' name='gender' onChange={(e)=> setValues({...values, gender: e.target.value})} />
            </div> */}

            <div className='form-group my-3'>
                <button type='submit' className='btn btn-success'>Save</button>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Create
