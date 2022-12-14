export function checkForContraindications (data) {
  for (const key in data) {
    if (data[key] === 'Yes') {
      return true
    }
  }

  return false
}
