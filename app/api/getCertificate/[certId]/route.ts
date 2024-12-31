import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/db';
import Certificate from '../../../../models/certModel';


export async function  GET({ params }: { params: { certId: string } }) {

    await connectDB();
    
    const {certId} = await params
    const certDetails = await Certificate.findOne({ssintId: certId })
    console.log(certDetails)
    return NextResponse.json({data: certDetails})

}

// The parameter { params }: { params: { certId: string } } is a destructuring
// syntax with type annotation in TypeScript. Here's what it means:
// 
// 1. `{ params }`: This extracts the `params` property from the second argument
//    passed to the function (usually the dynamic route parameters in Next.js).
//
// 2. `: { params: { certId: string } }`: This specifies the type of the second
//    argument, ensuring that it is an object containing a `params` property,
//    where `params` is an object with a `certId` key that must be a `string`.
//
//
// Example: If the route is `/api/getCertificate/123`, `params` will contain
// `{ certId: "123" }`, and `certId` can be directly accessed in the function.

