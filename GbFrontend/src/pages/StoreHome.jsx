import React from 'react'
import StoreNavbar from '../components/StoreNavbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';
import Categories from '../components/Categories';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';


const StoreHome = () => {
  return (
    <div>
        <Announcement/>
        <StoreNavbar/>
        <Slider/>
        <Categories/>
        <Products/>
        <Newsletter/>
        <Footer/>
    </div>
  )
}

export default StoreHome