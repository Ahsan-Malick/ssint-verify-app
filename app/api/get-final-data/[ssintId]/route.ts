import { NextRequest, NextResponse } from "next/server";
import { databases } from "../../../appwrite/config";
import { Query } from "appwrite";
import conf from "../../../conf/config";


export async function GET(_request: NextRequest, { params }: any) {
  const { ssintId } = await params;

  const certDetails = await databases.listDocuments(
    conf.databaseId, // databaseId
    conf.collectionId, // collectionId
    [Query.equal("ssint_id", String(ssintId))] // queries (optional)
  );
  if (certDetails.total > 0) {
    return NextResponse.json({ certDetails: certDetails.documents[0] });
  } else return NextResponse.json({ certDetails: null}, { status: 404 });
}
