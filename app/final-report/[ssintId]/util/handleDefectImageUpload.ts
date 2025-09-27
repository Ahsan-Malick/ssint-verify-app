import { Dispatch, SetStateAction } from "react";
import {
  DamageAnalysis,
  CategoryDamages,
  FormData,
  DefectImage,
} from "../page";

const handleDefectImageUpload = (
  file: File,
  category: keyof DamageAnalysis,
  severity: keyof CategoryDamages,
  setFormData: Dispatch<SetStateAction<FormData>>
) => {
  const newImage: DefectImage = {
    id: Date.now().toString(),
    file,
    url: URL.createObjectURL(file),
    description: "",
  };

  setFormData((prev) => ({
    ...prev,
    damageAnalysis: {
      ...prev.damageAnalysis,
      [category]: {
        ...prev.damageAnalysis[category],
        [severity]: {
          ...prev.damageAnalysis[category][severity],
          images: [...prev.damageAnalysis[category][severity].images, newImage],
          count: prev.damageAnalysis[category][severity].images.length + 1,
        },
      },
    },
  }));
};

export default handleDefectImageUpload;
