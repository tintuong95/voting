import { Carousel, Button } from 'antd';
import BaseSilder from './BaseSilder';
import { GrLike } from "react-icons/gr";
import { IoMdShareAlt } from "react-icons/io";
import { LuVote } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import BaseModal from './BaseModal';
import BaseDrawer from './BaseDrawer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { TiUser } from "react-icons/ti";

export default function BaseCard({ data, id, auth, point, vote }) {
    const [pathList, setPathList] = useState([])
    useEffect(() => {

        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return <div onClick={() => { }} class=" relative bg-white  rounded shadow-2xl z-10    ">
        <div className='m-5 z-50'>
            <BaseSilder data={pathList} />
        </div>
        <div class="p-5 pt-2">
            <a href="#d">
                <h5 class=" text-lg font-semibold tracking-tight   ">{data?.name || 'No Name'}</h5>
                <div className='flex items-center gap-2 italic mb-2'><TiUser className='text-gray-400' /> {auth?.name}</div>
                <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature </p>
            </a>
            <div className="grid grid-cols-2 items-center justify-between gap-5 mt-5">
                <BaseModal vote={vote} data={data} />
                <BaseDrawer vote={vote} point={point} data={data} auth={auth}></BaseDrawer>

                {/* <div className='col-span-1   grid grid-cols-2 gap-2 rounded  divide-x'>
                    <div className='col-span-1   py-1 text-white cursor-pointer  flex items-center  justify-center gap-2 text-sm'>
                        <GrLike />{data?.like}
                    </div>
                    <div className='col-span-1  py-1  text-white  cursor-pointer flex items-center  justify-center gap-2 text-sm'>
                        <IoMdShareAlt />{data?.share}
                    </div>
                </div> */}
            </div>
        </div>
        {/* <div className='absolute -top-6 left-1/2 -translate-x-2/3 bg-red-300 shadow-md border-2 border-white text-white h-14 w-14  text-center rounded-full p-2'>
            <h1 className='font-bold text-3xl z-100'>{id}</h1>
        </div> */}
    </div>
}