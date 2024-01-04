import { useEffect, useState } from 'react';
import BaseSilder from './BaseSilder';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import { FaRankingStar } from 'react-icons/fa6';
import { TiUser } from 'react-icons/ti';
import { useSelector } from "react-redux"
export default function BaseCardRating({ data, id, auth }) {
    const [pathList, setPathList] = useState([])
    const { show } = useSelector(state => state?.auth)
    useEffect(() => {
        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return (
        <div class='w-full relative bg-white  rounded  z-10  border '>
            {/* <div className="mt-10">
            <h5 class="mb-2 text-lg text-center font-bold tracking-tight  dark:text-white text-yellow-100">{data?.name || 'No Name'}</h5>
        </div> */}
            <div className='m-5 z-50'>
                {pathList.length > 0 && <img src={pathList[0]} alt="dddd" />}
            </div>
            <div class='p-5 pt-2'>
                <div className='w-full'>
                    <div className='text-xl font-semibold '> {data?.name}</div>
                    <div className='flex items-center gap-2 italic mb-2'><TiUser className='text-gray-400' /> {auth?.name}</div>
                    <p>
                        Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical
                        Latin literature
                    </p>
                    <div className=' font-bold rounded text-white text-center text-lg bg-yellow-400 mt-4 px-4 py-1 uppercase flex items-center justify-center gap-2 '> <FaRankingStar /><span >{data?.point}</span> </div>
                </div>
            </div>
            {/* <div className='absolute -top-6 left-1/2 -translate-x-2/3 bg-red-300 shadow-md border-2 border-white text-white h-14 w-14  text-center rounded-full p-2'>
            <h1 className='font-bold text-3xl z-100'>{id}</h1>
        </div> */}
        </div>
    );
}
