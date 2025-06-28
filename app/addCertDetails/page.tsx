"use client"

import React from 'react'
import { useState } from 'react'
import AddCertDetails from '../allpages/addCertDetails'

const AddCertDetailsPage = () => {

  const realPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD
  const [pass, setPass] = useState("");

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  return (
    <div>
      {pass !== realPassword ?
      <div className="flex justify-center items-center h-screen">
        <input
          type="password"
          value={pass}
          onChange={handlePasswordChange}
          placeholder="Enter Admin Password"
          className="border p-2 rounded"/>
           
    </div>:
    <AddCertDetails></AddCertDetails>
}
    </div>
  )
}
export default AddCertDetailsPage

