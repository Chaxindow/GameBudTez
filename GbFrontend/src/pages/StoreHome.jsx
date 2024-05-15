import React from 'react'
import StoreNavbar from '../components/StoreNavbar';
import Announcement from '../components/Announcement';
import Slider from '../components/Slider';

const StoreHome = () => {
  return (
    <div>
        <Announcement/>
        <StoreNavbar/>
        <Slider/>

    </div>
  )
}

export default StoreHome