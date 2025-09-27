import conf from "@/app/conf/config";
import { DamageImagesAsFile } from "../page";
import { storage } from "@/app/appwrite/config";
import { ID } from "appwrite";
import { DamageType, DamageCategory, Side } from "../page";

const BUCKET_ID = conf.bucketId;


async function uploadAndTransform(data: DamageImagesAsFile): Promise<any> {
  const newData: any = {
    front: {},
    back: {},
  };

  for (const side of ['front', 'back'] as Side[]) {
    newData[side] = {};
    for (const section of ['corner', 'edge', 'surface'] as DamageCategory[]) {
      newData[side][section] = {};
      for (const level of ['minor', 'major', 'majorPlus'] as DamageType[]) {
        const files: File[] = data[side][section][level] || [];

        const uploadedFileIds = [];
        for (const file of files) {
          const response = await storage.createFile(BUCKET_ID, ID.unique(), file);
          uploadedFileIds.push(response.$id);
        }

        newData[side][section][level] = uploadedFileIds;
      }
    }
  }

  return newData;
}