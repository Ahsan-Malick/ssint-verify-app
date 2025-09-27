  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minorDamages":
        return "bg-yellow-100 text-yellow-800"
      case "majorDamages":
        return "bg-orange-100 text-orange-800"
      case "majorPlusDamages":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  export default getSeverityColor;