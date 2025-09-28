"use client"

import React from 'react'

import AddCertImages from '../allpages/addImages'
import AddCertDetails from '../allpages/addCertDetailsO'

const AddCertDetailsPage = () => {


  return (
    <div>
      {/* {pass !== realPassword ?
      <div className="flex justify-center items-center h-screen">
        <input
          type="password"
          value={pass}
          onChange={handlePasswordChange}
          placeholder="Enter Admin Password"
          className="border p-2 rounded"/>
           
    </div>: */}
    {/* <AddCertImages></AddCertImages> */}
    <AddCertDetails></AddCertDetails>

    </div>
  )
}
export default AddCertDetailsPage

