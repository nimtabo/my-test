import React from 'react'

const Main = ({ children, width }) => {
  return (
    <div className='admin_main' style={{ marginLeft: width }}>{children}</div>
  )
}

export default Main