import React, { Component } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaCircleUser } from 'react-icons/fa6';
import BaseTimer from './BaseTimer';
import BaseLoginModal from './BaseLoginModal';
import { AiOutlineMenu } from 'react-icons/ai';
import { Dropdown } from 'antd';
import { signOutAction } from '../stores/authReducer';
const time = new Date();
time.setSeconds(time.getSeconds() + 600); // 10 minutes timer

export default function NavMenu() {
  const dispatch = useDispatch()
  const { username, isLoggedIn } = useSelector((state) => state?.auth);
  const items = [
    {
      key: '1',
      label: (
        <button rel='noopener noreferrer' >
          {username || "No Name"}
        </button>
      ),
    },
    {
      key: '2',
      label: (
        <button onClick={() => dispatch(signOutAction())} rel='noopener noreferrer' >
          Sign out
        </button>
      ),
    },
  ];

  return (
    <header className='flex flex-col bg-gradient-to-t to-yellow-200 from-yellow-500 justify-center  shadow-xl  sticky h-16'>
      <div className='grid grid-cols-3 justify-between w-full items-center px-5'>
        <div className='col-span-1 flex justify-start'>
          <BaseLoginModal />
        </div>
        <div className='col-span-1 flex justify-center'>
          {/* <BaseTimer expiryTimestamp={time} /> */}
          <di className='font-bold text-2xl text-gray-800'>FRIWO</di>
        </div>
        <div className='col-span-1 flex justify-end' >
          <Dropdown
            menu={{
              items,
            }}
          >
            <AiOutlineMenu />
          </Dropdown>
        </div>
      </div>
    </header>
  );
}
