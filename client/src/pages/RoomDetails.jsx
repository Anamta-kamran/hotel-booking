import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomsDummyData ,roomCommonData} from '../assets/assets'
import Starrating from '../components/Starrating'

const RoomDetails = () => {
    const {id} = useParams()
    const [room, setRoom] = useState(null)
     const [mainImage, setMainImage] = useState(null)
     useEffect(()=>{
       const room =  roomsDummyData.find(room => room._id === id)
        room && setRoom(room)
        room && setMainImage(room.images[0])
     },[])
  return room &&(
    <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>
        {/* room detals  */}
        <div className='flex flex-col md:flex-row items-start md:items-center gap-2'>
            <h1 className='text-3xl md:text-4xl font-playfair'>
                {room.hotel.name}
                 <span className='font-inter text-sm'>({room.roomType})</span></h1>
            <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20%OFF</p>
        </div>

        {/* room raiting */}
        <div className='flex items-center gap-1 mt-2'>
            <Starrating/>
            <p className='ml-2'>200+reviews</p>
        </div>
         
        {/* room address  */}
        <div className='flex items-center gap-1 text-gray-500 mt-2'>
            <img src={assets.locationIcon} alt="location-icon" />
            <span>{room.hotel.address}</span>
        </div>

        {/* room iamges  */}
        <div className='flex flex-col lg:flex-row mt-6 gap-6'>
            <div className='lg:w-1/2 w-full'>
                <img src={mainImage} alt="room image" className='w-full rounded-xl shadow-lg object-cover'/>
            </div>
            <div className='grid grid-cols-2 gap-4 lg:w-1/2 w-full'>
                {room?.images.length > 1 && room.images.map((image,index) =>(
                    <img onClick={()=> setMainImage(image)}
                    key={index} src={image} alt="room image" className={`w-full rounded-xl shadow-md object-cover cursor-pointer ${mainImage === image && 'outline-3 outline-orange-500'}`}/>
                ))}
            </div>
        </div>
        {/* room highlights */}
        <div className='flex flex-col md:flex-row md:justify-between mt-10'>
            <div className='flex flex-col'>
                <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Life Never Before</h1>
                <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                {room.amenities.map((item,index)=>(
                    <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                        <img src={facilityIcons[item]} alt={item} className='w-5 h-5'/>
                        <p className='text-xs'>{item}</p>
                    </div>
                    
                ))}
            </div>
            </div>
            {/* room price  */}
            <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
        </div>
        {/* checkin checkout form  */}
        <form className='flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl mx-auto mt-16 max-w-6xl'>
            <div className='flex flex-col flex-wrap md:flex-row items-center md:items-center gap-4 md:gap-10 text-gray-500'>

                <div className='flex flex-col'>
                    <label htmlFor="checkInDate" className='font-medium'>Check-In</label>
                    <input type="date" id='checkInDate' placeholder='Check-In'
                    className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>
                <div className='w-px h-15 bg-gray-500/70 max-md:hidden'></div>

                <div className='flex flex-col'>
                    <label htmlFor="checkOutDate" className='font-medium'>Check-Out</label>
                    <input type="date" id='checkOutDate' placeholder='Check-Out'
                    className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>
                  <div className='w-px h-15 bg-gray-500/70 max-md:hidden'></div>
                  <div className='flex flex-col'>
                    <label htmlFor="guests" className='font-medium'>Guests</label>
                    <input type="number" id='guests' placeholder='0'
                    className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                </div>

            </div>
            <button type='submit' className='bg-primary hover:bg-primary-dull active:scale-95 transition-all text-white rounded-md max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                Check Availablility
            </button>
        </form>
          {/* common specification */}
          <div className='mt-25 space-y-4'>
            {roomCommonData.map((spec,index)=>(
                <div key={index} className='flex items-start gap-2'>
                    <img src={spec.icon} alt={`${spec.title}-icon`} className='w-6.5' />
                    <div>
                        <p className='text-base'>{spec.title}</p>
                        <p className='text-gray-500'>{spec.description}</p>
                    </div>
                </div>
            ))}
          </div>
          <div className='max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500'>
            <p>Discover the personalized hospitality that awaits you. This room is managed by a dedicated team committed to ensuring your stay is nothing short of exceptional. From the moment you arrive, you'll be welcomed with a warm and professional service designed to make you feel right at home. They are available to assist you with any needs, whether it's local recommendations or a request to enhance your comfort, making sure your entire experience is seamless and unforgettable.</p>
          </div>
          {/* hosted by  */}
          <div className='flex flex-col items-start gap-4'>
            <div className='flex gap-4'>
                <img src={assets.heartIcon} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full'/>
                <div>
                    <p className='text-lg md:text-xl'>Hosted by{room.hotel.name}</p>
                    <div className='flex items-centermt-1'>
                        <Starrating/>
                        <p className='ml-2'>200+reviews</p>
                    </div>
                </div>
            </div>
            <button className='bg-primary hover:bg-primary-dull text-white rounded px-6 py-2.5 transtion-all cursor-pointer'>
                Contact now
            </button>
          </div>
    </div>
  )
}

export default RoomDetails