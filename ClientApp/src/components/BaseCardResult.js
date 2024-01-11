import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { TiUser } from "react-icons/ti";
import { FaRankingStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import BaseModalRating from './BaseModalRating';

export default function BaseCardResult({ ratingList, data, auth, point, rank, length }) {
    const [pathList, setPathList] = useState([])
    useEffect(() => {

        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return <div class=" relative bg-white rounded-lg border   z-10    ">
        <div className=' px-4 py-1 mt-3  font-extrabold text-center text-4xl  text-amber-500 gap-2 '>
            {/* <FaRankingStar className='animate-pulse' /> */}
            <span className=' px-2 rounded'>RANK &nbsp; {length - rank}</span></div>
        <div className='m-5 z-50'>
            {pathList.length > 0 && <img className='px-3 rounded overflow-hidden ' src={pathList[0]} alt="dddd" />}
        </div>
        <div class="p-5 pt-2">

            <div className='flex items-center justify-center gap-3 mb-3' >
                <BaseModalRating ratingList={ratingList} id={data?.id}> Vote {point?.point}</BaseModalRating>

            </div>
        </div>
        {/* <div class="p-5 pt-2">
            <a href="#d">
                <h5 class=" text-lg font-semibold tracking-tight   ">{data?.name || 'No Name'}</h5>
                <div className='flex items-center gap-2 italic mb-2'><TiUser className='text-gray-400' /> {auth?.name}</div>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature </p>
            </a>
            <div className="grid grid-cols-2 items-center justify-between gap-5 mt-5">
                <div>Rank 11</div>
                <div>{point}</div>


            </div> */}
    </div>


}