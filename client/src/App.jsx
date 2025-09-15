import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home';
import Footer from './components/Footer';
import Allrooms from './pages/Allrooms';
import RoomDetails from './pages/RoomDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Layout from './pages/HotelOwner/Layout';
import AddRoom from './pages/HotelOwner/AddRoom';
import ListRoom from './pages/HotelOwner/ListRoom';
import Dashboard from './pages/HotelOwner/Dashboard';

const App = () => {

  const isOwnerPath =useLocation().pathname.includes("owner") ;
  return (
    <div>
      {!isOwnerPath && <Navbar/>}
      {false && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home />} />
           <Route path='/rooms' element={<Allrooms />} />
           <Route path='/rooms/:id' element={<RoomDetails />} />
           <Route path='/my-bookings' element={<MyBookings />} />
           <Route path='/owner' element={<Layout/>}>
           <Route index element={<Dashboard/>}/>
            <Route path="add-room" element={<AddRoom/>} />
             <Route path="list-room" element={<ListRoom />} />
           </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}
export default App