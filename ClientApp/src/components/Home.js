import { Collapse, Statistic } from 'antd';
import axios from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactCanvasConfetti from 'react-canvas-confetti';
import { useMittEmit, useMittOn } from 'react-mitt-wrapper';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import BaseCard from './BaseCard';
import BaseCardRating from './BaseCardRating';
import BaseScan from './BaseScan';
import BaseTable from './BaseTable';
import BaseTitle from './BaseTitle';
import Footer from './Footer';
import NavMenu from './NavMenu';
import { FloatButton } from 'antd';
import { useNavigate } from "react-router-dom";
import { FaRegFaceGrinStars } from 'react-icons/fa6';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { CommentOutlined, CustomerServiceOutlined } from '@ant-design/icons';
import { HomeOutlined } from "@ant-design/icons"

const { Countdown } = Statistic;
const deadline = Date.now() + 10010 * 60 * 60 * 24 * 2 + 1000 * 30; // Dayjs is also OK

const canvasStyles = {
    position: 'fixed',
    pointerEvents: 'none',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
};
export default function Home() {
    useMittOn('loadAllData', (eventData) => {
        fetchAllData();
    });
    const container = useRef();
    const navigate = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();
    const mitt = useMittEmit();
    const [albums, setAlbums] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const { id, show } = useSelector((state) => state?.auth);
    const [open, set] = useState(true);
    const refAnimationInstance = useRef(null);
    const dispatch = useDispatch()

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const makeShot = useCallback((particleRatio, opts) => {
        refAnimationInstance.current &&
            refAnimationInstance.current({
                ...opts,
                origin: { y: 0.7 },
                particleCount: Math.floor(200 * particleRatio),
            });
    }, []);

    const fire = useCallback(() => {
        makeShot(0.25, {
            spread: 26,
            startVelocity: 55,
        });

        makeShot(0.2, {
            spread: 60,
        });

        makeShot(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2,
        });

        makeShot(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, [makeShot]);
    const sumPointTotal = () => {
        const groupedData = _.groupBy(ratings, 'albumId');
        const result = _.mapValues(groupedData, (group) => _.sumBy(group, 'point'));

        return _.map(result, (item, index) => ({ albumId: +index, point: item }));
    };

    const mapAlbumPoint = () => {
        const result = _.map(albums, (item1) => ({
            ...item1,
            point: _.find(sumPointTotal(), { albumId: item1.id })?.point || 0,
        }));
        return result.sort((a, b) => b?.point - a?.point);
    };

    const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
    const items = [
        {
            key: '1',
            label: 'This is panel header 1',
            children: <p>{text}</p>,
        },
        {
            key: '2',
            label: 'This is panel header 2',
            children: <p>{text}</p>,
        },
        {
            key: '3',
            label: 'This is panel header 3',
            children: <p>{text}</p>,
        },
    ];

    const fetchAllData = () => {
        Promise.all([axios.get('/album'), axios.get('/author'), axios.get('/rating'), axios.get('/account')])
            .then((r) => {
                setAlbums(r[0].data);
                setAuthors(r[1].data);
                setRatings(r[2].data);
                setAccounts(r[3].data);
            })
            .then((r) => {
                console.log(mapAlbumPoint());
            })
            .catch((e) => {
                console.log(e);
            })
            .finally(() => { });
    };
    useEffect(() => {
        // mitt.emit("HELLO")
        fetchAllData();
    }, []);
    useMittOn('fire', (eventData) => {
        fire();
    });

    useEffect(() => {
        setTimeout(() => {
            mitt.emit('SHOW_DETAIL_BY_ID_' + searchParams.get('id'));
            console.log('SHOW_DETAIL_BY_ID_' + searchParams.get('id'));
        }, 1200);
    }, [searchParams.get('id')]);

    return (
        <>
            {/* <button id="test" className='bg-red-600'>Hello</button> */}
            <NavMenu />
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
            <div className='bg-photo bg-center bg-no-repeat   pb-16 pt-10 shadow-lg ' style={{ height: '560px', backgroundColor: "#5e7d41" }}>
                {/* style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 52% 100%, 0 92%)' }} */}
                <div className='px-5  py-10 text-center' onClick={() => set((state) => !state)}>
                    <BaseTitle open={open}>
                        <span>FRIWO   </span>
                        <span>Costume </span>
                        <span>Competition </span>
                    </BaseTitle>
                </div>
                <div className='flex justify-start md:justify-center'>
                    <div className='relative m-auto  h-20 flex justify-center'>
                        <div className=''>
                            {/* <button className='bg-yellow-300 bg-opacity-50 p-2 absolute top-0  -left-7 -translate-x-1/2 animate-ping mt-6 text-center rounded shadow-lg   font-bold m-auto text-white'>
                VOTING
              </button> */}
                            <BaseScan />
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
            <div className='text-center text-4xl font-extrabold   mt-16 bg-gradient-to-r from-rose-600 to-yellow-500   text-transparent bg-clip-text'>
                Overview
            </div>
            <div className='text-center  px-4 mb-3 mt-3 max-w-96 m-auto'>
                We challenge the fashion talents within the company to imagine and create outfits that embody vitality and relentless innovation.
            </div>
            <div className='text-center'>
                <div className='flex'>
                    <NavLink
                        to={"/result"}
                        className='rounded  bg-yellow-400  px-9 py-1 hover:shadow-lg text-white flex items-center m-auto gap-2 font-semibold mt-3'>
                        <FaRegFaceGrinStars />

                        RESULT</NavLink>
                </div>
            </div>
            <div className='text-center flex items-center gap-2 justify-center'>
                {/* {mapAlbumPoint().map((item, index) => <BaseResultModal rank={index} />)} */}

                {/* <Countdown format='DD:HH:mm:ss' value={deadline} /> */}
            </div>
            <div className='w-2/3 my-2' />
            {/* <div className='text-center  px-4 '>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </div> */}
            <div className='mt-10 m-auto'>
                <div className=' hidden max-lg:grid m-auto'>
                    {<Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        // autoplay={{
                        //     delay: 3400,
                        //     disableOnInteraction: false,

                        // }}
                        modules={[Pagination, Navigation]} //Autoplay, 
                        pagination={{
                            clickable: true,
                        }}
                        className='mySwiper w-10/12 m-auto pb-10'
                    >
                        {_(mapAlbumPoint())
                            .map((item, index) => (
                                <SwiperSlide>
                                    <div className='w-full'>
                                        {/* <div className={`font-extrabold text-2xl text-gray-500 text-center mb-2 ${show ? "" : "blur-sm"}`}>
                      TOP {index + 1}
                    </div> */}
                                        <div className='w-full'>
                                            <BaseCardRating data={item} auth={_.find(authors, (i) => i?.id == item?.authorId)} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                            .shuffle()
                            .value()}{' '}
                    </Swiper>}
                </div>

                <div className=' hidden   lg:grid  m-auto'>
                    {<Swiper
                        slidesPerView={3}
                        spaceBetween={30}
                        // autoplay={{
                        //     delay: 3400,
                        //     disableOnInteraction: false,
                        // }}
                        modules={[Pagination, Navigation]}
                        pagination={{
                            clickable: true,
                        }}
                        className='mySwiper w-2/3 m-auto py-10 px-3'
                    >
                        {_(mapAlbumPoint())
                            .map((item, index) => (
                                <SwiperSlide>
                                    <div className='w-full h-full'>
                                        {/* <div className={`font-extrabold text-2xl text-gray-500 text-center mb-2 ${show ? "" : "blur-sm"}`}>
                      TOP {index + 1}
                    </div> */}
                                        <div className='w-full h-full'>
                                            <BaseCardRating data={item} auth={_.find(authors, (i) => i?.id == item?.authorId)} />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                            .shuffle()
                            .value()}{' '}
                    </Swiper>}
                </div>
                <div className='px-10 my-16 md:w-6/12 lg:w-6/12 2xl:w-6/12 m-auto'>
                    {/* <div className='text-center text-4xl font-extrabold  mt-10 bg-gradient-to-r from-rose-600 to-yellow-500 mb-3 text-transparent bg-clip-text'>
            {' '}
            Table
          </div>
          <div className='text-center  px-4 mb-7'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </div>
          <BaseTable data={show ? mapAlbumPoint() : _.shuffle(mapAlbumPoint())} /> */}
                </div>
                <div
                    id='list'
                    className='text-center text-4xl font-extrabold my-5 mt-16 
          bg-gradient-to-r from-rose-600 to-yellow-500   
          text-transparent bg-clip-text'
                >
                    List of participating products
                </div>
                <div className='text-center  px-4 max-w-96 m-auto '>
                    The contest has received enthusiastic participation from talented employees within the company, and we are delighted to share the unique and sophisticated works from the participating fashion collections.
                </div>

                <div className='grid grid-cols-1 gap-14 md:px-28 lg:grid lg:grid-cols-3 lg:gap-10 lg:w-11/12 2xl:w-10/12  rounded  p-10  m-auto'>
                    {albums?.map((item, index) => {
                        return (
                            <BaseCard
                                vote={_.find(ratings, (o) => o?.accountId == id && o?.albumId == item.id)}
                                point={_.find(mapAlbumPoint(), (o) => o.id == item.id)}
                                key={index}
                                data={item}
                                id={++index}
                                auth={_.find(authors, (i) => i?.id == item?.authorId)}
                            />
                        );
                    })}
                </div>
                {/* <div className='px-10 m-auto md:w-10/12 lg:w-6/12 2xl:w-6/12 mb-16'>
          <div id='list' className='text-center text-4xl font-extrabold my-5 mt-10'>
            Policy
          </div>
          <Collapse items={items} />
        </div> */}
            </div>
            <Footer />

            <FloatButton icon={<HomeOutlined />} onClick={() => navigate("/")} />

        </>
    );
}
