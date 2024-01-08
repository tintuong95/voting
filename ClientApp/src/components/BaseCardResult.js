import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { TiUser } from "react-icons/ti";
import { FaRankingStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

export default function BaseCardResult({ data, auth, point, rank, length }) {
    const [pathList, setPathList] = useState([])
    useEffect(() => {

        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return <div class=" relative bg-white rounded-md border  z-10    ">

        <div className='m-5 z-50'>
            {pathList.length > 0 && <img src={pathList[1]} alt="dddd" />}
        </div>
        <div class="p-5 pt-2">
            <h5 class=" text-lg font-semibold tracking-tight  text-center   ">{data?.name || 'No Name'}</h5>
            <div className='flex items-center gap-2 italic justify-center mb-4'><TiUser className='text-gray-400' /> {auth?.name}</div>
            <div className='flex items-center justify-center gap-3 mb-10' >
                <div className='bg-yellow-400 px-4 py-1 rounded-md shadow-2xl font-semibold flex justify-center items-center gap-2 '> <FaRankingStar className='animate-pulse' />
                    RANK {length - rank}</div>
                <div className='bg-rose-500 px-4 py-1 rounded-md shadow-2xl font-semibold text-white flex justify-center items-center gap-2 '> <FaHeart className='animate-pulse' />
                    Vote {point?.point}</div>
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