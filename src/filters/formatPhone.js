import { parsePhoneNumber } from 'libphonenumber-js'

export default (value) => {
  try {
    const phoneNumber = parsePhoneNumber(value, 'US')
    phoneNumber.formatNational()
    return phoneNumber.formatNational()
  } catch (error) {
    return value
  }
}
