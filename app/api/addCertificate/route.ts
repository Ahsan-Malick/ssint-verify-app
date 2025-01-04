import { NextRequest, NextResponse } from "next/server";
import { storage, databases } from "../../appwrite/config";
import { ID, Query } from "appwrite";
import conf from "../../conf/config";

 export async function POST(request: NextRequest) {
 
  const certDetails = await request.formData();
  const ssintId = certDetails.get("ssintId");
  const cardName = certDetails.get("cardName");
  const cardNumber = certDetails.get("cardNumber");
  const cardSet = certDetails.get("cardSet");
  const cardYear = certDetails.get("cardYear");
  const grade = certDetails.get("grade");
  const additionalInfo = certDetails.get("additionalInfo") || "";
  const frontImage = certDetails.get("frontImage");
  const backImage = certDetails.get("backImage");
  const creationDate = new Date

  let frontUrl;
  let backUrl;
  // let population;
  // let popHigh;

  const cardImages = {
    frontImage,
    backImage,
  };

  // Fetch current card details using ssintId
  const currentCard = await databases.getDocument(conf.databaseId, conf.collectionId, String(cardName));
  const serialNumber = currentCard.cardNumber
  const name = currentCard.cardNumber
  const year = currentCard.cardYear
  const set = currentCard.cardSet
  const gradeVal = currentCard.grade


  // Query to get all cards with the same name, serial number, year and set
  const population = await databases.listDocuments(conf.databaseId, conf.collectionId, [
    Query.equal('cardName', name),
    Query.equal('cardNumber', serialNumber),
    Query.equal('cardSet', set),
    Query.equal('cardYear', year),
  ]);

   // Query to find cards with the same name, serial number, and grade higher than the current card
   const popHigher = await databases.listDocuments(conf.databaseId, conf.collectionId, [
    Query.equal('name', name),
    Query.equal('serialNumber', serialNumber),
    Query.greaterThan('grade', Number(gradeVal)),
  ]);
  

  
  //find document with specific ssint id, if it doesnt exist then create else not

  const isCert = await databases.listDocuments(
    conf.databaseId, // databaseId
    conf.collectionId, // collectionId
    [Query.equal("ssintId", String(ssintId))] // queries (optional)
  );


  if (isCert.total===0) {

    if (frontImage instanceof File) {
        const file = await storage.createFile(
          conf.bucketId, // bucketId
          ID.unique(), // fileId
          frontImage // file
          // permissions (optional)
        );
    
        const fileId = file.$id;
    
        const url = storage.getFileView(
          conf.bucketId, // bucketId
          fileId // fileId
        );
    
    
        frontUrl = url;
      }
    
      if (backImage instanceof File) {
        const file = await storage.createFile(
          conf.bucketId, // bucketId
          ID.unique(), // fileId
          backImage // file
          // permissions (optional)
        );
    
        const fileId = file.$id;
    
        const url = storage.getFileView(
          conf.bucketId, // bucketId
          fileId // fileId
        );
    
        backUrl = url;
      }

      const certData = {
        ssintId,
        cardName,
        cardNumber,
        cardSet,
        cardYear,
        grade,
        additionalInfo,
        frontImageUrl: frontUrl,
        backImageUrl: backUrl,
        population,
        popHigher
      };


    await databases.createDocument(
      conf.databaseId, // databaseId
      conf.collectionId, // collectionId
      ID.unique(), // documentId
      certData // data
      // permissions (optional)
    );

    return NextResponse.json("Certificate Added Successfully");
  }


  return NextResponse.json("Certificate Already Exist");
}
