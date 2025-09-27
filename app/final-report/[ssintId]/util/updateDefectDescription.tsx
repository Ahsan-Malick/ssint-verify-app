 import { Dispatch, SetStateAction } from "react";
import { DamageAnalysis, CategoryDamages, FormData } from "../page";


  const updateDefectDescription = (
    category: keyof DamageAnalysis,
    severity: keyof CategoryDamages,
    imageId: string,
    description: string,
    setFormData: Dispatch<SetStateAction<FormData>>

  ) => {
    setFormData((prev) => ({
      ...prev,
      damageAnalysis: {
        ...prev.damageAnalysis,
        [category]: {
          ...prev.damageAnalysis[category],
          [severity]: {
            ...prev.damageAnalysis[category][severity],
            images: prev.damageAnalysis[category][severity].images.map((img) =>
              img.id === imageId ? { ...img, description } : img
            ),
          },
        },
      },
    }));
  };

 export default updateDefectDescription 