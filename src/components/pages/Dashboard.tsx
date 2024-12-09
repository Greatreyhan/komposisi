import React from 'react'
import DashboardLayout from '../templates/DashboardLayout'
import Navigation from '../organism/Navigation'
import Sidebar from '../organism/Sidebar'
import CardList from '../organism/CardList'

const Dashboard = () => {
  return (
    <>
    <DashboardLayout Navigation={<Navigation/>} Sidebar={<Sidebar className='pb-16' />} Content={<CardList />} />
    </>
  )
}

export default Dashboard