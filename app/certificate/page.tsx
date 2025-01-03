"use client"

import CertificateViewer from "../allpages/certificateViewer";
import { useSearchParams } from 'next/navigation';
import CertificateNotFound from "../../components/certNotFound";

import React from 'react'

const CertificatePage = () => {

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

export default CertificatePage
