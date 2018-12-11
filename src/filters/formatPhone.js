import { parsePhoneNumber } from 'libphonenumber-js'

export default (value) => {
  try {
    if (!value || value.trim().length < 9) return value
    const tmpVal = value.replace(/\D/g, '').slice(-10)
    const phoneNumber = parsePhoneNumber(tmpVal, 'US')
    return phoneNumber.formatNational()
  } catch (error) {
    return value
  }
}
