import { NextRequest, NextResponse } from 'next/server';
import connectDB from '../../../../utils/db';
import Certificate from '../../../../models/certModel';
import { storage, databases } from "../../../appwrite/config"
import { ID, Query } from "appwrite";
import conf from "../../../conf/config";


export async function  GET(request:NextRequest, { params }:{params:{ssintId: string}}) {

    
    const {ssintId} = await params
    const certDetails = await databases.listDocuments(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        [Query.equal("ssintId", String(ssintId))] // queries (optional)
      );
    if (certDetails.total>0){ 

        console.log(certDetails.documents[0])
        

    return NextResponse.json({certDetails: certDetails.documents[0]})
    }
    else
    console.log("i am here")
    return NextResponse.json({certDetails: null})
    

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

