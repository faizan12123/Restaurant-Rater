import React from 'react'
import {useNavigate} from 'react-router-dom';
const Back = () => {
    const navigate = useNavigate();
  return (
    <button class="btn btn-info  " type="button" onClick={() => navigate(`/home`)}>Back to Home</button>
  )
}

export default Back