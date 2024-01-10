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
import { useMittEmit } from 'react-mitt-wrapper';

export default function BaseCardView({ data, id, auth, point, vote }) {
    const [pathList, setPathList] = useState([])

    useEffect(() => {

        axios.get('/album/photos/' + data?.id).then(result => {
            const paths = _.map(result.data, (item) => _.slice((item), 1).join(''))
            setPathList(paths)

        }).catch(e => { console.log(e) })
    }, [data?.id])
    return <div class=" relative bg-white  m-3  rounded shadow-2xl z-10 flex flex-col justify-between   ">
        <div className='m-5 z-50 h-1/2'>
            {pathList.length > 0 && <img className='h-full object-center object-cover' src={pathList[0]} alt="dddd" />}
        </div>
        <div class=" p-5 pt-2 ">

            <div className="grid grid-cols-2 items-center justify-between gap-5 mt-5">

            </div>
        </div>

    </div>
}