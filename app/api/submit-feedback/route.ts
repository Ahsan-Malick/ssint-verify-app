import { type NextRequest, NextResponse } from "next/server";
import { databases } from "../../appwrite/config";
import { ID } from "appwrite";
import conf from "../../conf/config";

// This is a template API route for submitting feedback to your Appwrite database
// You'll need to configure it with your Appwrite credentials

export async function POST(request: NextRequest) {
  try {
    const { email, feedback } = await request.json();

    // Validation
    if (!email || !feedback) {
      return NextResponse.json(
        { error: "Email and feedback are required" },
        { status: 400 }
      );
    }

    // TODO: Configure your Appwrite connection
    // Replace these with your actual Appwrite credentials from environment variables
    const APPWRITE_ENDPOINT = conf.appwriteUrl;
    const APPWRITE_PROJECT_ID = conf.appwriteProjectId;
    const APPWRITE_DATABASE_ID = conf.databaseId;

    if (!APPWRITE_ENDPOINT || !APPWRITE_PROJECT_ID || !APPWRITE_DATABASE_ID) {
      console.error("[v0] Missing Appwrite environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Call Appwrite API to create a new document
    // Step 3: Add the new card with updated `population` and `popHigh`
    await databases.createDocument(
      conf.databaseId,
      "customer-feedback",
      ID.unique(),
      {
        email,
        feedback,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message: "Feedback submitted successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[v0] Error in submit-feedback:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
