const conf = {
    appwriteUrl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECTID),
    databaseId: String(process.env.NEXT_DATABASE_ID),
    collectionId: String(process.env.NEXT_COLLECTION_ID),
    collectionIdCert: String(process.env.NEXT_COLLECTION_ID_CERT),
    bucketId: String(process.env.NEXT_BUCKET_ID)
}

export default conf