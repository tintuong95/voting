import React, { useEffect, useState } from 'react';
import { Button, Drawer, Radio, Image } from 'antd';
import { IoPlayOutline } from 'react-icons/io5';

import axios from 'axios';
import _ from 'lodash';
import { FaRankingStar } from 'react-icons/fa6';
import { useMittOn } from 'react-mitt-wrapper';
import { NavLink } from 'react-router-dom';
import BaseModal from './BaseModal';

const BaseDrawer = ({ data, auth, point, vote }) => {
    const [open, setOpen] = useState(false);
    const [pathList, setPathList] = useState([]);
    useMittOn('SHOW_DETAIL_BY_ID_' + data?.id, () => {

        setOpen(true);
    });
    useMittOn('HIDE_DETAIL_BY_ID_' + data?.id, () => {

        setOpen(false);
    });
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        axios
            .get('/album/photos/' + data?.id)
            .then((result) => {
                const paths = _.map(result.data, (item) => _.slice(item, 1).join(''));
                setPathList(paths);
            })
            .catch((e) => {
                console.log(e);
            });
    }, [data?.id]);

    useEffect(() => {
        console.log("hello")
    }, [])
    return (
        <>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    showDrawer();
                }}
                className='text-rose-500 hover:text-sky-500'
            >
                Learn more
            </button>

            <Drawer
                destroyOnClose={true}
                title={
                    <div className='grid grid-cols-2 gap-4'>
                        <BaseModal vote={vote} data={data} />

                        {/* <NavLink
              to={'/detail/' + data?.id}
              className='bg-green-500 rounded-md text-center cursor-pointer text-white font-bold text-xl py-1 flex justify-center items-center gap-2'
            >
              <IoPlayOutline />
              Slider
            </NavLink> */}
                        <div
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose()
                            }}
                            className='bg-white border rounded-md text-center  cursor-pointer text-xl py-1'
                        >
                            Close
                        </div>
                    </div>
                }
                placement={'bottom'}
                closable={false}
                onClose={onClose}
                open={open}
                height={'80vh'}
            >
                <div className='mb-3 font-semibold italic'>{auth?.name} </div>
                <div className='text-lg font-semibold'>{data?.name} </div>
                <div className='mb-5'>{data?.description} </div>

                <div className='grid grid-cols-2 gap-5'>
                    {/* {pathList?.map((item) => (
                        <Image src={item} />
                    ))} */}
                    <Image src={pathList[0]} />
                </div>
            </Drawer>
        </>
    );
};
export default BaseDrawer;
