import React from 'react'
import Navigation from '../organism/Navigation'
import DetailLayout from '../templates/DetailLayout'
import PageDescription from '../organism/PageDescription'

const Detail = () => {
  return (
    <>
    <DetailLayout Navigation={<Navigation/>} 
    Content={
    <div className='pt-16'>
        <PageDescription />
    </div>
    } 
    />
    </>
  )
}

export default Detail