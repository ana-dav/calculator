function getDisplayNumber(number) {
    if(number === '-') return number.toString()
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
}

export default function updateDisplay() {
    this.upperScreenPart.innerText = 
    getDisplayNumber(this.currentOperand)
    if (this.operation === 'xn') {
        this.lowerScreenPart.innerText = 
        `${getDisplayNumber(this.previousOperand)} ^`
    } else if (this.operation != null) {
        this.lowerScreenPart.innerText = 
        `${getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
        this.lowerScreenPart.innerText = ''
    }
}
