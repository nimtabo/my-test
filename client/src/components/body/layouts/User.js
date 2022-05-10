import React from 'react'
import Footer from '../../footer/Footer'
import Header from '../../header/Header'

const UserLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}

export default UserLayout