class CurrencyUtils {
  static formatToMG(amount: number) {
    return new Intl.NumberFormat('mg-MG', {
      style: 'currency',
      currency: 'MGA'
    }).format(amount);
  }
}

export default CurrencyUtils;