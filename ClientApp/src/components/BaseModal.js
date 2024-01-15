
import { Button, Modal, Slider, notification } from 'antd';
import { FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
import { Rate } from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { votingAction } from '../stores/authAction';
import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import axios from "axios"
import { FaHeart } from 'react-icons/fa6';
import { AiOutlineCheck } from "react-icons/ai";
import { useMittEmit } from 'react-mitt-wrapper';

const canvasStyles = {
    position: "fixed",
    pointerEvents: "none",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0
};
const customIcons = {
    1: <FrownOutlined style={{ fontSize: 50 }} />,
    2: <FrownOutlined style={{ fontSize: 50 }} />,
    3: <MehOutlined style={{ fontSize: 50 }} />,
    4: <SmileOutlined style={{ fontSize: 50 }} />,
    5: <SmileOutlined style={{ fontSize: 50 }} />,
};

const BaseModal = ({ data, vote }) => {
    const [api, contextHolder] = notification.useNotification();
    const mitt = useMittEmit()
    const { id, username } = useSelector(state => state.auth)
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(3)
    const [point, setPoint] = useState(50)
    const refAnimationInstance = useRef(null);

    const getInstance = useCallback((instance) => {
        refAnimationInstance.current = instance;
    }, []);

    console.log("data, vote ", data, vote)

    const CreatePoint = () => {
        if (!id) {
            return api.warning({
                message: `User login voting!`,
                placement: "bottom"
            });
        }
        const payload = {
            accountId: username,
            albumId: data.id,
            point: point
        }
        axios.post("/rating/create", payload).then(r => {
            api.success({
                message: `Vote succefully!`,
                placement: "bottom"
            });
        }).then(r => {
            mitt.emit("loadAllData")
        })
            .then(r => {
                mitt.emit("fire")
            })
            //.then(r => {
            //    mitt.emit("HIDE_DETAIL_BY_ID_" + data.id)
            //})
            .catch(e => {
                api.error({
                    message: `Vote failture!`,
                    placement: "bottom"
                });
            }).finally(() => {
                setOpen(false)
            })
        // dispatch(votingAction(payload))
    }

    useEffect(() => {

        if (point <= 20) {
            setRating(1)
        } else if (point > 20 && point <= 40) {
            setRating(2)
        } else if (point > 40 && point <= 60) {
            setRating(3)
        }
        else if (point > 60 && point <= 80) {
            setRating(4)
        }
        else if (point > 80 && point <= 100) {
            setRating(5)
        }

    }, [point])
    return (
        <>
            {contextHolder}
            {!vote && <button onClick={(e) => {
                e.stopPropagation()
                setOpen(true)
            }} className='col-span-1 
            text-center cursor-pointer bg-rose-500 hover:scale-105 transition-all duration-150 ease-in-out py-1 text-white rounded  
            flex items-center justify-center gap-2 text-sm'>
                <FaHeart />

                VOTE</button>}
            {vote && <button className='col-span-1 
            text-center cursor-pointer bg-green-500 py-1 text-white rounded  
            flex items-center justify-center gap-2 text-sm'> <AiOutlineCheck />
                Success</button>}
            <Modal
                title={<div className='text-center'>RATING</div>}
                centered
                open={open}
                destroyOnClose={true}
                onOk={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                }}
                onCancel={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                }}
                footer={<div className='text-center px-7'>
                    <button className='bg-rose-500  mb-4 text-white w-full text-lg  py-2 rounded-md flex items-center justify-center gap-2' onClick={(e) => {
                        e.stopPropagation()
                        CreatePoint()
                    }}><FaHeart /> VOTING</button>
                </div>}

            >
                <Rate disabled onChange={(e) => { setPoint(e) }} value={rating} className='text-center mt-4 w-full' character={({ index = 0 }) => customIcons[index + 1]} />
                <Slider defaultValue={point} onChange={(e) => {

                    setPoint(e)
                }} className='my-8  w-4/5 m-auto' />
            </Modal>
            <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
        </>
    );
};
export default BaseModal