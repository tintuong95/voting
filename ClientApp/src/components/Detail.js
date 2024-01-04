import { Image, FloatButton } from 'antd';
import axios from "axios"
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { NavLink, useParams } from "react-router-dom"
import BaseSilder from './BaseSilder';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"

export default function Detail() {
  const { id } = useParams()
  const [pathList, setPathList] = useState([])
  const [album, setAlbum] = useState({})
  const navigate = useNavigate()


  useEffect(() => {
    Promise.all([

      axios.get('/album/photos/' + id),
      axios.get('/album/' + id),
    ]).then(result => {
      const paths = _.map(result[0].data, (item) => _.slice((item), 1).join(''))
      setPathList(paths)
      setAlbum(result[1].data)
    })

  }, [pathList])
  return (
    <div className=' w-2/3 m-auto mt-4'>
      <div className='flex items-center justify-between'>
        {/* <NavLink to="/">Home</NavLink> */}
        <h1 className='font-extrabold text-center text-4xl mb-3 bg-gradient-to-r from-rose-600 to-yellow-500   
          text-transparent bg-clip-text '>{album?.name || "No Name"} </h1>
        <div></div>
      </div>
      <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {pathList?.map(item => <SwiperSlide>
          <img src={item} alt="Dasdfdsa" />
        </SwiperSlide>)}


      </Swiper>

      <FloatButton icon={<HomeOutlined />} onClick={() => navigate("/")} />
    </div>
  );
}
