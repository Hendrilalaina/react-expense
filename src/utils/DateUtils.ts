class DateUtils {
  static _months = ['Janoary', 'Febroary', 'Martsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septambra', 'Novambra', 'Desambra'];
  static getFormattedDate(date: Date) {
    const days = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = this._months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName} ${day} ${month} ${year}`
  }

  static formatDateString(dateString: string) {
    if (dateString != undefined) {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = this._months[date.getMonth()];
      const year = date.getFullYear();

      return `${month} ${day}, ${year}`
    }
  }
}

export default DateUtils;