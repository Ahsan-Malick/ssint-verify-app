  import { Dispatch, SetStateAction } from "react";
  import { DamageAnalysis, CategoryDamages, FormData } from "../page";
  
  
  const removeDefectImage = (
    category: keyof DamageAnalysis,
    severity: keyof CategoryDamages,
    imageId: string,
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
            images: prev.damageAnalysis[category][severity].images.filter(
              (img) => img.id !== imageId
            ),
            count: prev.damageAnalysis[category][severity].images.filter(
              (img) => img.id !== imageId
            ).length,
          },
        },
      },
    }));
  };

  export default removeDefectImage;