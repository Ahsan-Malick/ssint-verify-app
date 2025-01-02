import { Client, Databases, Storage } from "appwrite";
import conf from "../conf/config"



const client = new Client()
    .setEndpoint(conf.appwriteUrl) // Your API Endpoint
    .setProject(conf.appwriteProjectId); // Your project ID

const databases = new Databases(client);
const storage = new Storage(client);

export {databases, storage}