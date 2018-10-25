import moment from 'moment'

class DateUtils {
  static compensateUtcOffset (date) {
    if (moment.isMoment(date)) {
      // Creeaza o noua data UTC din data initiala care are offset info
      // Pe urma adauga la ea offset infoul datei de input
      // E un hack: practic creezi o noua data UTC care sa aibe valoare datei non UTC
      // Exemplu
      // 2000-01-01 ora 18:00+1:00 (non UTC) devine
      // 2000-01-01 ora 18:00 (UTC)
      date = moment(date).utc().add(date.utcOffset(), 'm')
    }

    return date
  }
}

export default DateUtils
