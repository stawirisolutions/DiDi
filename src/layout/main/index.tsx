'use client'

import React, { ReactNode } from 'react'
import TopBar from './top-bar'
import Footer from './footer'

interface MAIN_LAYOUT_PROPS {
    children?: ReactNode
}

const MainLayout = ({ children }: MAIN_LAYOUT_PROPS) => {
  return (
    <>
        <TopBar />
        <main style={{ marginTop: '172px' }}>{children}</main>
        <Footer />
    </>
  )
}

export default MainLayout