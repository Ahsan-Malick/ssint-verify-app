import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../utils/db';
import Certificate from "../../../models/certModel"


export async function  POST(request: NextRequest) {

    await connectDB();
    const certDetails = await request.json()
    const newCert = new Certificate(certDetails)
    await newCert.save()
  
    return NextResponse.json("Success")


}