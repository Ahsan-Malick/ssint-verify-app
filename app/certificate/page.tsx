"use client"

import CertificateViewer from "../allpages/certificateViewer";
import { useSearchParams } from 'next/navigation';
import CertificateNotFound from "../../components/certNotFound";
import { Suspense } from 'react'
import React from 'react'

function SearchParamsComp() {

  const searchParams = useSearchParams();
  const certDetails = searchParams.get('certDetails');
  const parsedCertDetails = certDetails ? JSON.parse(decodeURIComponent(certDetails)) : null;
  
 
  return (
    <div>
      { parsedCertDetails !==null?
      <CertificateViewer certDetails = {parsedCertDetails}></CertificateViewer>
      : <CertificateNotFound></CertificateNotFound>
}
    </div>
  )
}

const CertificatePage = () => {

  // const searchParams = useSearchParams();
  // const certDetails = searchParams.get('certDetails');
  // const parsedCertDetails = certDetails ? JSON.parse(decodeURIComponent(certDetails)) : null;

  return (
 <Suspense>
  <SearchParamsComp></SearchParamsComp>
 </Suspense>
  )
}

export default CertificatePage
