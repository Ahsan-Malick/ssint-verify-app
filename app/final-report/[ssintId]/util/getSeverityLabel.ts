    const getSeverityLabel = (severity: string) => {
      switch (severity) {
        case "minorDamages":
          return "Minor"
        case "majorDamages":
          return "Major"
        case "majorPlusDamages":
          return "Major+"
        default:
          return severity
      }
    }

    export default getSeverityLabel;