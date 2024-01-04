import { QrScanner } from '@yudiel/react-qr-scanner';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { HiOutlineQrCode } from "react-icons/hi2";
import { useMittEmit } from 'react-mitt-wrapper';
import { useNavigate, useSearchParams } from "react-router-dom"
const previewStyle = {
    height: 240,
    width: 320,
};
export default function BaseScan() {

    const mitt = useMittEmit()
    const naviage = useNavigate()
    let [searchParams, setSearchParams] = useSearchParams();



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
        return () => {
            setIsModalOpen(false);
            console.log("DSAfds")
        }
    }, [])
    return (
        <div>

            <button
                onClick={showModal}
                // onClick={() => { mitt.emit("SHOW_DETAIL_BY_ID_1") }}
                className='bg-yellow-400 p-2 hover:scale-110 transition-all duration-150 ease-in-out hover:shadow-2xl   px-5  mt-6 rounded shadow-2xl text-center shadow-yellow-100 font-bold m-auto text-white flex items-center justify-center gap-1'
            >
                <HiOutlineQrCode size={23} className='animate-pulse' />
                SCAN VOTE
            </button>

            <Modal footer={false} destroyOnClose={true} afterClose={() => { console.log("Dd") }}
                title="QRCODE" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <QrScanner onDecode={(result) => {
                    let params = new URLSearchParams(String(result).split("?")[1]);
                    handleCancel()
                    params.forEach((item, index) => {

                        if (index == "id") {

                            if (item == searchParams.get(("id"))) {
                                setTimeout(() => {
                                    mitt.emit('SHOW_DETAIL_BY_ID_' + item);

                                }, 1200);
                            }
                            else {
                                naviage("?id=" + item)
                            }
                        }
                    })

                }} onError={(error) => console.log(error?.message)} />

            </Modal>


        </div>
    );
}
