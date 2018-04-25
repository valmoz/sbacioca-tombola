export class NumberChecker {
  static prepareTickets (ticketState, extractedNumbers) {
    for (var i = 0; i < ticketState.length; i++) {
      var array = ticketState[i]['array']
      var firstArray = array.slice(0, 5)
      var secondArray = array.slice(5, 10)
      var thirdArray = array.slice(10, 15)
      var count1 = missingNumbers(firstArray, extractedNumbers)
      var count2 = missingNumbers(secondArray, extractedNumbers)
      var count3 = missingNumbers(thirdArray, extractedNumbers)
      ticketState[i]['firstCount'] = count1
      ticketState[i]['secondCount'] = count2
      ticketState[i]['thirdCount'] = count3
      ticketState[i]['totalCount'] = count1 + count2 + count3
    }
    return ticketState
  }

  static updateTickets (ticketState, extracted) {
    for (var i = 0; i < ticketState.length; i++) {
      var array = ticketState[i]['array']
      var index = array.indexOf(extracted)
      if (index >= 0) {
        var count1 = ticketState[i]['firstCount']
        var count2 = ticketState[i]['secondCount']
        var count3 = ticketState[i]['thirdCount']
        if (index >= 0 && index < 5) {
          count1 = count1 - 1
          ticketState[i]['firstCount'] = count1
        } else if (index >= 5 && index < 10) {
          count2 = count2 - 1
          ticketState[i]['secondCount'] = count2
        } else if (index >= 10 && index < 15) {
          count3 = count3 - 1
          ticketState[i]['thirdCount'] = count3
        }
        ticketState[i]['totalCount'] = count1 + count2 + count3
      }
    }
    return ticketState
  }

  static checkTableCinquina (extractedNumbers, lastNumber) {
    var minMissing = 99
    var missing = -1
    for (var i = 0; i < tableSections.length; i++) {
      var section = tableSections[i]
      var row1 = section.slice(0, 5)
      var row2 = section.slice(5, 10)
      var row3 = section.slice(10)
      if (row1.includes(lastNumber)) {
        missing = missingNumbers(row1, extractedNumbers)
        minMissing = Math.min(minMissing, missing)
        if (missing === 0) {
          return {result: true, numbers: row1, missing: 0}
        }
      }
      if (row2.includes(lastNumber)) {
        missing = missingNumbers(row2, extractedNumbers)
        minMissing = Math.min(minMissing, missing)
        if (missing === 0) {
          return {result: true, numbers: row2, missing: 0}
        }
      }
      if (row3.includes(lastNumber)) {
        missing = missingNumbers(row3, extractedNumbers)
        minMissing = Math.min(minMissing, missing)
        if (missing === 0) {
          return {result: true, numbers: row3, missing: 0}
        }
      }
    }
    return {result: false, numbers: [], missing: minMissing}
  }

  static checkTableTombola (extractedNumbers, lastNumber) {
    var minMissing = 99
    var missing = -1
    for (var i = 0; i < tableSections.length; i++) {
      var section = tableSections[i]
      if (section.includes(lastNumber)) {
        missing = missingNumbers(section, extractedNumbers)
        minMissing = Math.min(minMissing, missing)
        if (missing === 0) {
          return {result: true, numbers: section, missing: 0}
        }
      }
    }
    return {result: false, numbers: [], missing: minMissing}
  }
}

function missingNumbers (numbersSet, extractedNumbers) {
  var missing = 0
  for (var j = 0; j < numbersSet.length; j++) {
    var number = numbersSet[j]
    if (extractedNumbers && !extractedNumbers.includes(number)) {
      missing = missing + 1
    }
  }
  return missing
}

var tableSections = [
  [1, 2, 3, 4, 5, 11, 12, 13, 14, 15, 21, 22, 23, 24, 25],
  [6, 7, 8, 9, 10, 16, 17, 18, 19, 20, 26, 27, 28, 29, 30],
  [31, 32, 33, 34, 35, 41, 42, 43, 44, 45, 51, 52, 53, 54, 55],
  [36, 37, 38, 39, 40, 46, 47, 48, 49, 50, 56, 57, 58, 59, 60],
  [61, 62, 63, 64, 65, 71, 72, 73, 74, 75, 81, 82, 83, 84, 85],
  [66, 67, 68, 69, 70, 76, 77, 78, 79, 80, 86, 87, 88, 89, 90]
]
