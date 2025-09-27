
  
   const getGradeShadowColor = (grade: number) => {
    if (grade >= 9) return "shadow-sm shadow-green-500";
    if (grade >= 7) return "shadow-sm shadow-yellow-500";
    if (grade >= 5) return "shadow-sm shadow-orange-500";
    return "bg-red-100 text-red-800";
  };

export { getGradeShadowColor };
  
  
  const getGradeColor = (grade: number) => {
    if (grade >= 9) return "bg-green-100 text-green-800";
    if (grade >= 7) return "bg-yellow-100 text-yellow-800";
    if (grade >= 5) return "bg-orange-100 text-orange-800";
    return "bg-red-100 text-red-800";
  };

export default getGradeColor;

 