import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';

import './custom.css';
import Layout from './components/Layout';

export default function App() {
  return <Routes>
    {AppRoutes.map((route, index) => {
      const { element, ...rest } = route;
      return <Route key={index} {...rest} element={element} />;
    })}
  </Routes>

}