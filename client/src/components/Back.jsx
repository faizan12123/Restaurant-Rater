import React from 'react'
import {useNavigate} from 'react-router-dom';
const Back = () => {
    const navigate = useNavigate();
  return (
    <button class="btn btn-info  " type="button" onClick={() => navigate(-1)}>Back</button>
  )
}

export default Back