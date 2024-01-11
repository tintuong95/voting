import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { FaHeart } from 'react-icons/fa6'
import { Button, Modal } from 'antd';
import axios from 'axios';
import { Divider, Space, Tag } from 'antd';
import { Avatar } from 'antd';
function BaseModalRating({ children, id, ratingList }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {


    }, [id])
    return (
        <div>
            <Modal width={200} footer={false} title="Point Detail" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {ratingList?.map((item, index) => {
                    return <p className='flex gap-2 items-center mt-3'>   <span>{index + 1}.</span><Tag color="green">{item?.accountId} </Tag><Tag color="red">{item?.point} point</Tag> </p>
                })}
            </Modal>
            <div onClick={showModal} className='bg-rose-500 px-4 py-1 rounded-md shadow-2xl font-semibold text-white flex justify-center items-center gap-2 '>
                <FaHeart className='animate-pulse' />{children}</div>
        </div>
    )
}

BaseModalRating.propTypes = {}

export default BaseModalRating
