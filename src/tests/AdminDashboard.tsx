import React from 'react'
import DashboardLayout from '../components/templates/DashboardLayout'
import Navigation from '../components/organism/Navigation'
import UIList from './UIList'
import SidebarAdmin from './SidebarAdmin'

const Dashboard = () => {
  return (
    <>
    <DashboardLayout Navigation={<Navigation/>} Sidebar={<SidebarAdmin className='pb-16' />} Content={<UIList />} />
    </>
  )
}

export default Dashboard