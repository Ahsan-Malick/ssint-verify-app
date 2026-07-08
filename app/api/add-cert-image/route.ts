import { NextRequest, NextResponse } from "next/server";
import { storage, databases } from "../../appwrite/config";
import { ID, Query } from "appwrite";
import conf from "../../conf/config";

export async function POST(request: NextRequest) {
  const certDetails = await request.formData();
  const ssintId = certDetails.get("ssintId");
  const frontImage = certDetails.get("frontImage");
  const backImage = certDetails.get("backImage");

  let frontUrl;
  let backUrl;

  //find document with specific ssint id, if it doesnt exist then create else not
  const isCert = await databases.listDocuments(
    conf.databaseId, // databaseId
    conf.collectionId, // collectionId
    [Query.equal("ssintId", String(ssintId))], // queries (optional)
  );

  //Card details of the gived ssintId must exist before adding front and back images
  if (isCert.total === 1) {
    if (frontImage instanceof File) {
      const file = await storage.createFile(
        conf.bucketId, // bucketId
        ID.unique(), // fileId
        frontImage, // imagefile
        // permissions (optional)
      );

      const fileId = file.$id;

      const url = storage.getFileView(
        conf.bucketId, // bucketId
        fileId, // fileId
      );

      frontUrl = url;
    }

    if (backImage instanceof File) {
      const file = await storage.createFile(
        conf.bucketId, // bucketId
        ID.unique(), // fileId
        backImage, // file
        // permissions (optional)
      );

      const fileId = file.$id;

      const url = storage.getFileView(
        conf.bucketId, // bucketId
        fileId, // fileId
      );

      backUrl = url;
    }

    await databases.updateDocument(
      conf.databaseId,
      conf.collectionId,
      isCert.documents[0].$id,
      {
        frontImageUrl: frontUrl,
        backImageUrl: backUrl,
      },
    );

    return NextResponse.json("Added");
  } else {
    return NextResponse.json("Certificate not found", { status: 404 });
  }
}
