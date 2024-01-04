import 'antd/dist/reset.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './stores';
import { CustomRouter, history } from './stores/history';
import { ConfigProvider } from 'antd';
import { MittProvider, useMittOn } from 'react-mitt-wrapper';
import { gsap } from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";


gsap.registerPlugin(MotionPathPlugin);


const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <MittProvider>
    <Provider store={store} >
      <BrowserRouter basename={baseUrl}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#f43f5e',
              colorPrimaryText: '#f43f5e',
              colorLink: '#f43f5e',
              colorLinkHover: '#fb7185',
              colorPrimaryBgHover: "#fb7185",


            },
          }}>
          <App />
        </ConfigProvider>

      </BrowserRouter></Provider></MittProvider>

);




