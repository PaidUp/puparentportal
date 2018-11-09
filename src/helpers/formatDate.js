import moment from 'moment'

export const formatDate = {
  unix (value) {
    return moment.unix(value).format('MM/DD/YYYY')
  }
}
