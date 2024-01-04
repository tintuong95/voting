import { Button, Modal } from "antd"
import { useEffect, useState } from "react";

export default function BaseResultModal({ data, auth, rank }) {
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
        console.log("Data", data)
    }, [])
    return <>
        <Button onClick={showModal} className=' text-rose-500 ' type="link">TOP {rank + 1}</Button>
        <Modal footer={false} title={<div className="font-extrabold">RANK {rank + 1}</div>} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Album :<span className="font-semibold text-blue-600"> {data?.name}</span></p>
            <p>Author : <span className="font-semibold text-blue-600">{auth?.name}</span></p>
            <p>Description : {data?.description}</p>
            <p>Some contents...</p>
        </Modal></>
}