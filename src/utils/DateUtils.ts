class DateUtils {
  static getFormattedDate(date: Date) {
    const days = ['Alahady', 'Alatsinainy', 'Talata', 'Alarobia', 'Alakamisy', 'Zoma', 'Sabotsy'];
    const months = ['Janoary', 'Febroary', 'Martsa', 'Aprily', 'May', 'Jona', 'Jolay', 'Aogositra', 'Septambra', 'Novambra', 'Desambra'];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName} ${day} ${month} ${year}`
  }

  static formatDateString(dateString: string) {
    if (dateString != undefined) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('mg-MG', {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }).format(date);
    }
  }
}

export default DateUtils;