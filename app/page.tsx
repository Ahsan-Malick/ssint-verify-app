import Image from "next/image";
import CertInputPage from "./allpages/certInputPage";
import mongoose from 'mongoose';



export default function Home() {
  return (
    <>
    <main>
      <div>
        <CertInputPage></CertInputPage>
      </div>
    </main>
    </>
  );
}
