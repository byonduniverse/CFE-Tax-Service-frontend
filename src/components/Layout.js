import React from 'react'

import Header from './Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <div>{children}</div>
    </>
  )
}

export default Layout
