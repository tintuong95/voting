import React, { Component, useCallback, useRef, useState } from 'react';
import { Container } from 'reactstrap';
import Footer from './Footer';
import NavMenu from './NavMenu';
import { useMittOn } from 'react-mitt-wrapper';

export default function Layout({ children }) {
  const [loading, setLoading] = useState(false)


  // useMittOn("HELLO", () => {
  //   console.log('Hello1 Event Received')
  // })



  return (

    <>
      {loading && <div className='fixed w-full flex justify-center items-center z-50 bg-gray-500 bg-opacity-35 ' style={{ height: "100vh" }}> <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>}
      <div >
        <NavMenu />
        <div>{children}</div>
        <Footer />
      </div></>
  );
}
