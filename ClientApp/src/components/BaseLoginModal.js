import React, { useState } from 'react';
import { Button, Modal, Form, Input, notification } from 'antd';
import { Rate } from 'antd'
import { FaCircleUser } from 'react-icons/fa6';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux"
import { loginAction } from '../stores/authAction';
import { useSelector } from "react-redux"
import { BiSolidLogInCircle } from "react-icons/bi";
import { signInSuccess, signOutAction } from '../stores/authReducer';
import axios from "axios"
const BaseLoginModal = () => {
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useDispatch()
    const onFinish = (values) => {
        axios.post("/account/signin", values).then(result => {
            dispatch(signInSuccess(result.data))
        }).then(r => {
            setOpen(false)
            api.success({
                message: `Login succefully!`,
                placement: "bottom"
            });
        }).catch(error => {
            dispatch(signOutAction())
            api.error({
                message: `Login failture!`,
                placement: "bottom"
            });
        })

        // dispatch(loginAction(values))
    };
    return (
        <>

            {contextHolder}
            <button onClick={() => setOpen(true)} type="button" className='flex items-center gap-2'>
                <FaCircleUser size={25} /> </button>
            <Modal
                title={<div className='text-start text-xl px-5 mb-5 mt-5'>  Login with account .</div>}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
                footer={false}

            >
                <Form
                    // layout="vertical"
                    name="normal_login"
                    className="login-form px-5 m-auto"

                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        // label="Username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input size='large' className='border rounded border-gray-200' prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        // label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            className='border rounded border-gray-200'
                            size='large'
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Button size='large' htmlType="submit" className="login-form-button rounded w-full flex justify-center items-center gap-2 bg-rose-500 text-white uppercase">
                        Log in <BiSolidLogInCircle size={23} />

                    </Button>
                </Form>

            </Modal>
        </>
    );
};
export default BaseLoginModal