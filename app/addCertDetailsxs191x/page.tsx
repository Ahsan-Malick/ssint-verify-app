"use client"

import React from 'react'

import AddCertImages from '../allpages/addImages'

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
    <AddCertImages></AddCertImages>

    </div>
  )
}
export default AddCertDetailsPage

