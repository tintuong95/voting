import axios from 'axios';
import _ from 'lodash';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, FloatButton } from 'antd';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import { VscDebugStart } from "react-icons/vsc";
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

// import required modules
import { FaStar } from 'react-icons/fa6';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import BaseCardResult from './BaseCardResult';
import { useNavigate } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons"

import ReactCanvasConfetti from "react-canvas-confetti";
import { NavLink } from 'react-router-dom';
function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};
function getAnimationSettings(originXA, originXB) {
    return {
        startVelocity: 30,
        spread: 360,
        ticks: 60,
        zIndex: 0,
        particleCount: 150,
        origin: {
            x: randomInRange(originXA, originXB),
            y: Math.random() - 0.2
        }
    };
}
export default function ShowResult() {
    const refAnimationInstance = useRef(null);
    const [intervalId, setIntervalId] = useState();
    const navigate = useNavigate()

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    const nextTickAnimation = useCallback(() => {
        if (refAnimationInstance.current) {
            refAnimationInstance.current(getAnimationSettings(0.1, 0.3));
            refAnimationInstance.current(getAnimationSettings(0.7, 0.9));
        }
    }, []);

    const startAnimation = useCallback(() => {
        if (!intervalId) {
            setIntervalId(setInterval(nextTickAnimation, 400));
        }
    }, [intervalId, nextTickAnimation]);

    const pauseAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
    }, [intervalId]);

    const stopAnimation = useCallback(() => {
        clearInterval(intervalId);
        setIntervalId(null);
        refAnimationInstance.current && refAnimationInstance.current.reset();
    }, [intervalId]);


    const [albums, setAlbums] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [key, setKey] = useState()
    const swiperRef = useRef()
    const { id } = useSelector((state) => state?.auth);
    const [my_swiper, set_my_swiper] = useState({});
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

    const fetchAllData = () => {
        Promise.all([axios.get('/album'), axios.get('/author'), axios.get('/rating'), axios.get('/account')])
            .then((r) => {
                setAlbums(r[0].data);
                setAuthors(r[1].data);
                setRatings(r[2].data);
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
    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        };
    }, [intervalId]);
    useEffect(() => {
        window.addEventListener("keydown", (e) => {

            if (e.key == "ArrowRight" ||
                e.key == "ArrowUp" ||
                e.key == "ArrowDown" ||
                e.key == "ArrowLeft") {
                setKey(e.key + new Date().getMilliseconds())
            }

        });

    }, []);
    useEffect(() => {

        if (String(key).includes("ArrowRight") || String(key).includes("ArrowUp")) {
            key && my_swiper.slideNext()
        } else if (String(key).includes("ArrowLeft") || String(key).includes("ArrowDown")) {
            key && my_swiper.slidePrev()
        }

    }, [key]);
    return (
        <div className='flex h-screen bg-result bg-cover bg-center justify-center items-center'>
            {/* <div className='fixed top-2 left-2'>  <NavLink to="/">Home</NavLink></div> */}
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />

            <div className='flex gap-5 items-center justify-center'></div>
            <div className='py-4 w-10/12 m-auto friwo-flag  '>
                <Swiper
                    slidesPerView={"auto"}
                    onInit={(ev) => {
                        set_my_swiper(ev)
                    }}
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}

                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={true}
                    onSlideChange={(swiperCore) => {


                        startAnimation()
                        setTimeout(() => { pauseAnimation() }, 1200)
                    }}
                    modules={[EffectCoverflow, Pagination]}
                    className='mySwiper p-4 pb-20'
                >
                    <SwiperSlide className='bg-sky-400 bg-opacity-25 rounded-md shadow-md flex justify-center items-center'>
                        <div onClick={() => { my_swiper.slideTo(1); }} className='text-center text-2xl font-extrabold p-10 animate-pulse  text-yellow-500 flex flex-col  items-center gap-2 justify-center'>
                            <VscDebugStart />

                            START
                        </div>{' '}
                    </SwiperSlide>
                    {_(mapAlbumPoint())
                        .reverse()
                        .map((item, index) => {
                            return (
                                <SwiperSlide>
                                    <div className='w-full'>
                                        <BaseCardResult
                                            ratingList={_.filter(ratings, o => o?.albumId == item?.id)}
                                            length={mapAlbumPoint()?.length}
                                            ratings={ratings}
                                            key={index}
                                            rank={index}
                                            point={_.find(mapAlbumPoint(), (o) => o.id == item.id)}
                                            data={item}
                                            auth={_.find(authors, (i) => i?.id == item?.authorId)}
                                        />
                                    </div>
                                </SwiperSlide>
                            );
                        })
                        .value()}
                </Swiper>
            </div>
            <FloatButton icon={<HomeOutlined />} onClick={() => navigate("/")} />
        </div>
    );
}
