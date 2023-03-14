import React from 'react'
import { Route, Routes } from 'react-router'
import Mainpage from '../Mainpage/Mainpage'
import Userloginpage from '../Userloginpage/Userloginpage'
import style from './Homepage.module.css'

export default function Homepage() {
  return (
    <Routes >
        <Route path={'/'} element={<Userloginpage />} />
        <Route path={'/mainPage'} element={<Mainpage />} />
    </Routes>
  )
}
