class Calculator {
    constructor(upperScreenPart, lowerScreenPart) {
        this.upperScreenPart = upperScreenPart
        this.lowerScreenPart = lowerScreenPart
        this.readyToReset = false
        this.clear()
    }

    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
        this.readyToReset = false
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }
    
    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')
            || number === '-' && this.currentOperand.includes('-')) return
        //if(this.currentOperand === '-' && this.number === '') return
        //console.log(number)
        this.currentOperand = this.currentOperand.toString() + number.toString()
        //console.log(this.currentOperand, this.operation, this.previousOperand)
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.currentOperand !== '' && this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    

    compute() {
        let computation
        const previousToNum = parseFloat(this.previousOperand)
        const currentToNum = parseFloat(this.currentOperand)
        if (isNaN(previousToNum) || isNaN(currentToNum)) return
        switch (this.operation) {
        case '+': 
            computation = previousToNum + currentToNum
            break
        case '-':
            if (previousToNum < 0 || currentToNum < 0) {
                    computation = previousToNum + currentToNum
                } else if (previousToNum < 0 && currentToNum < 0) {
                    computation = previousToNum + currentToNum
                    console.log(computation.toString())
                } else {
                    computation = previousToNum - currentToNum
                }
            break
        case '/':
            computation = previousToNum / currentToNum
            break
        case '×':
            computation = previousToNum * currentToNum
            break
        case 'xn':
            computation = Math.pow(previousToNum, currentToNum)
            break
        default:
            return
        }
               
        this.readyToReset = true
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }
   
    computeSqrt() {
        const previousToNum = parseFloat(this.previousOperand)
        if(isNaN(previousToNum)) return    
        let result = Math.sqrt(previousToNum)
        if(isNaN(result)) result = 'Error'
        this.readyToReset = true
        this.currentOperand = result
        this.operation = undefined
        this.previousOperand = ''

        this.upperScreenPart.innerText = this.currentOperand
    }

    getDisplayNumber(number) {
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

    updateDisplay() {
        console.log(this.currentOperand)
        this.upperScreenPart.innerText = 
        this.getDisplayNumber(this.currentOperand)
        if (this.operation === 'xn') {
            this.lowerScreenPart.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ^`
        } else if (this.operation != null) {
            this.lowerScreenPart.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.lowerScreenPart.innerText = ''
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operantionButtons = document.querySelectorAll('[data-operation]')
const minusButton = document.querySelector('[data-minus]')
const sqrtButton = document.querySelector('[data-sqrt]')
const deleteButton = document.querySelector('[data-clear]')
const clearAllButton = document.querySelector('[data-clear-all]')
const equalsButton = document.querySelector('[data-equals]')
const upperScreenPart = document.querySelector('[data-upper-screen]')
const lowerScreenPart = document.querySelector('[data-lower-screen]')

const calculator = new Calculator(upperScreenPart, lowerScreenPart)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if(calculator.previousOperand === '' &&
            calculator.currentOperand !== '' &&
            calculator.readyToReset) {
                //calculator.currentOperand = '';
                calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

minusButton.addEventListener('click', () => {
    if(calculator.currentOperand === '' || calculator.currentOperand === '-') {
        calculator.appendNumber(minusButton.innerText)
        calculator.updateDisplay(minusButton.innerText)
    } else {
        console.log('operation minus')
        calculator.chooseOperation(minusButton.innerText)
        calculator.updateDisplay()
    }
    
})

operantionButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

sqrtButton.addEventListener('click', () => {
    calculator.chooseOperation(sqrtButton.innerText)
    calculator.computeSqrt()
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

clearAllButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
