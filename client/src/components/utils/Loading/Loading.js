import React from 'react'
import ReactLoading from 'react-loading';
import './loading.css'

const Loading = ({ type, color }) => {
  return (
    <div className='loading'>
      <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
    </div>
  )
}

export default Loading