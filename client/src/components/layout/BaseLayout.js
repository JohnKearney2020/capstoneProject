import React from 'react'
import Header from './Header.js'
// import Footer from './Footer.js'

const BaseLayout = (props) => {
  return (
    <>
    <Header />
    <br />
            {props.children}
      <br />

    {/* <Footer /> */}

    </>
  )
}

export default BaseLayout