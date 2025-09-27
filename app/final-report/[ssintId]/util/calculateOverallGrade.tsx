
import { FormData } from "../page";
import { Dispatch, SetStateAction } from "react";


  const calculateOverallGrade = (formData: FormData, setFormData: Dispatch<SetStateAction<FormData>>) => {
    const { frontGrade, backGrade, frontRatio, backRatio } =
      formData.gradeBreakdown;
    const overall = frontGrade * frontRatio + backGrade * backRatio;
    setFormData((prev) => ({
      ...prev,
      card: { ...prev.card, overallGrade: Math.round(overall * 10) / 10 },
    }));
  };

  export default calculateOverallGrade;