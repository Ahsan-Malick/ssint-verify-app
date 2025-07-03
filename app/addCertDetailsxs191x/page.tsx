"use client"

import React from 'react'
import { useState } from 'react'
import AddCertDetails from '../allpages/addCertDetails'

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
    <AddCertDetails></AddCertDetails>

    </div>
  )
}
export default AddCertDetailsPage

