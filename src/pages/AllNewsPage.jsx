import React from 'react'
import Header from '../components/layout/Header'
import AllNews from '../components/AllNews.jsx'
import Footer from '../components/layout/Footer.jsx'

const AllNewsPage = () => {
  return (
    <div><Header/>
    
    <AllNews/>
    <Footer/>
    </div>
  )
}

export default AllNewsPage