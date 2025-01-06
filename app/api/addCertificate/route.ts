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
  const grade = Number(certDetails.get("grade"));
  const cardPublisher = certDetails.get("cardPublisher")
  const additionalInfo = certDetails.get("additionalInfo") || "";
  const frontImage = certDetails.get("frontImage");
  const backImage = certDetails.get("backImage");

  let frontUrl;
  let backUrl;
  let population;
  let popHigher;

  //find document with specific ssint id, if it doesnt exist then create else not
  const isCert = await databases.listDocuments(
    conf.databaseId, // databaseId
    conf.collectionId, // collectionId
    [Query.equal("ssintId", String(ssintId))] // queries (optional)
  );

  if (isCert.total === 0) {
    // Fetch current card details using ssintId
    const currentCardResponse = await databases.listDocuments(
      conf.databaseId,
      conf.collectionId,
      [Query.equal("cardName", String(cardName))]
    );

    if (currentCardResponse.total > 0) {
      const currentCard = currentCardResponse.documents[0];
      const serialNumber = currentCard.cardNumber;
      const name = currentCard.cardName;
      const year = currentCard.cardYear;
      const set = currentCard.cardSet;

      // Step 1: Query for similar cards
      const similarCardsResponse = await databases.listDocuments(
        conf.databaseId,
        conf.collectionId,
        [
          Query.equal("cardName", name),
          Query.equal("cardSet", set),
          Query.equal("cardYear", year),
          Query.equal("cardNumber", serialNumber),
        ]
      );

      const similarCards = similarCardsResponse.documents;

      // Calculate the new population value (current similar cards + 1)
      const newPopulation = similarCards.length + 1;

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
        cardPublisher,
        frontImageUrl: frontUrl,
        backImageUrl: backUrl,
        population,
        popHigher,
      };

      const newCardPopHigher = similarCards.filter(
        (c) => c.grade > (certData.grade ?? 0)
      ).length;

      // Step 3: Add the new card with updated `population` and `popHigh`
      await databases.createDocument(
        conf.databaseId,
        conf.collectionId,
        ID.unique(),
        {
          ...certData,
          population: newPopulation, // Population is all similar cards + 1 (including the new card)
          popHigher: newCardPopHigher,
        }
      );

      for (const similarCard of similarCards) {
        await databases.updateDocument(
          conf.databaseId,
          conf.collectionId,
          similarCard.$id,
          {
            population: newPopulation,
          }
        );
        if (
          similarCard.grade > 1 &&
          similarCard.grade < (certData.grade ?? 0)
        ) {
          // Increment popHigh for cards with grade > 1 and grade < new card's grade
          await databases.updateDocument(
            conf.databaseId,
            conf.collectionId,
            similarCard.$id,
            {
              popHigher: (similarCard.popHigher || 0) + 1,
            }
          );
        }
      }

    } else {
      console.log("I am else");

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
        popHigher,
      };

      await databases.createDocument(
        conf.databaseId, // databaseId
        conf.collectionId, // collectionId
        ID.unique(), // documentId
        certData // data
        // permissions (optional)
      );

      return NextResponse.json("Added");
    }
  }


  return NextResponse.json("Exist");
}
