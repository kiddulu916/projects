// Function to validate a credit card number.
const validateCred = (arr) => {
    // Store the sum of the modified numbers
    let sum = 0;

    // Loop through the array in reverse order
    for (let i = arr.length - 1; i >= 0; i--) {
        
        // Double every second number
        let currValue = arr[i];
        if ((arr.length - 1 - i) % 2 === 1) {
            currValue *= 2;

            // Subtract 9 from numbers over 9
            if (currValue > 9) {
                currValue -= 9;
            }
        }
        // Add the modified number to the sum
        sum += currValue;
    }

    // Return true if the sum is divisible by 10
    return sum % 10 === 0;
};

//Function to find all invalid credit cards in a nested array.
const findInvalidCards = (nestedArr) => {
    
    // Store the invalid credit card numbers here
    let invalidCards = []; 
    
    // Loop through the nested arrays
    for (let i = 0; i < nestedArr.length; i++) {
        
        // Store the current credit card
        let currCred = nestedArr[i]; 
        
        // If the credit card is invalid
        if (!validateCred(currCred)) { 
            
            // Add it to the array of invalid cards
            invalidCards.push(currCred); 
        }
    }
    // Return the array of invalid credit card numbers
    return invalidCards; 
}

// Function to identify the companies of invalid credit cards.
const idInvalidCardCompanies = (arr) => {
    
    // Store the companies of invalid credit cards here
    const companies = [];

    // Loop through the array of invalid credit cards
    for (let i = 0; i < arr.length; i++) {
        
        // Check the first digit of the current credit card
        switch (arr[i][0]) {
            case 3:
                
                // Check if Amex is already in the array
                if (companies.indexOf('Amex') === -1) {
                    
                    // Add Amex to the array
                    companies.push('Amex');
                }
                break;
            case 4:
                
                // Check if Visa is already in the array
                if (companies.indexOf('Visa') === -1) {
                    
                    // Add Visa to the array
                    companies.push('Visa');
                }
                break;
            case 5:
                
                // Check if Mastercard is already in the array
                if (companies.indexOf('Mastercard') === -1) {
                    
                    // Add Mastercard to the array
                    companies.push('Mastercard');
                }
                break;
            case 6:
                
                // Check if Discover is already in the array
                if (companies.indexOf('Discover') === -1) {
                
                    // Add Discover to the array
                    companies.push('Discover');
                }
                break;
            default:
                console.log('Company not found');
        }
    }
    
    // Return the array of companies
    return companies; 
}

// Converts an array of strings to an array of arrays of numbers
const batchArrToNum = arrOfStrings => {
    
    // New empty array to store the arrays of numbers
    let arrOfNums = [];
    
    // Loop through the array
    for (let i = 0; i < arrOfStrings.length; i++) {
        
        // Empty array to store the numbers
        let convertedString = [];
        
        // Loop through the string
        for (let j = 0; j < arrOfStrings[i].length; j++) {

            // check if the element is a string
            if (typeof arrOfStrings[i] === 'string') {
                
                // If it is a string iterate through the string
                // If the element isnt a comma or whitespace add it to the array
                if (arrOfStrings[i][j] != ',' && arrOfStrings[i][j] != ' ') {
                
                    // Use Number() to convert the string to a number, 
                    //when adding it to the array
                    convertedString.push(Number(arrOfStrings[i][j]));
                }
            } else {

                // If the element is not a string, add it to the array
                convertedString.push(arrOfStrings[i][j]);
            }
        }

        // Add the array of numbers to the array of arrays
        arrOfNums.push(convertedString); 
    }
    
    // Return the array of arrays of numbers
    return arrOfNums;
}

// A function to find invalid credit cards and convert them to valid
const invalidCardsToValid = arr => {
    
    // To see the submitted array, uncomment the following line
    // console.log(arr);

    // Convert the array of strings to an array of arrays of numbers
    let convertedArr = batchArrToNum(arr);
    
    // To see the converted array, uncomment the following line
    console.log(`This is the array of converted arrays: [[${convertedArr[0]}], [${convertedArr[1]}]]`);

    // Find invalid credit cards in the array
    let invalidCards = findInvalidCards(convertedArr);
    
    // To see the invalid cards, uncomment the following line
    console.log(`This is the array of invalid credit cards: [[${invalidCards[0]}], [${invalidCards[1]}]]`);

    // Loop through the array of invalid credit cards
    for (let i = 0; i < invalidCards.length; i++) {
        
        // Using the Luhn algorithm to find the check digit of the cards
        // Reverse the array
        let digits = invalidCards[i].slice().reverse();
        
        // To see the arrays of invalid credit cards in reverse, uncomment the following line
        console.log(`Invalid credit card in reverse: [${digits}]`);

        // Store the sum of the modified numbers
        let sum = 0;

        // Loop through the array in reverse order
        for (let j = digits.length - 1; j >= 0; j--) {
            
            // Double every second number
            let currValue = digits[j];

            // Subtract 9 from numbers over 9
            if ((digits.length - 1 - j) % 2 === 1) {
                currValue *= 2;

                // Subtract 9 from numbers over 9
                if (currValue > 9) {
                    currValue -= 9;
                }
            }

            // Add the modified number to the sum
            sum += currValue;
        }

        // If the sum is divisible by 10, the check digit is 0
        if (sum % 10 === 0) {
            invalidCards[i].push(0);

            // To see the check digit, uncomment the following line
            console.log(`Check digit: ${invalidCards[i][invalidCards[i].length - 1]}`);
        
        } else {
            
            // Otherwise, the check digit is 10 - the remainder
            invalidCards[i].push(10 - (sum % 10));

            // To see the check digit, uncomment the following line
            console.log(`Check digit: ${invalidCards[i][invalidCards[i].length - 1]}`);
        }
    }

    // To see the modified array of valid credit cards, uncomment the following line
    console.log(`This is the array of valid credit cards: [[${invalidCards[0]}], [${invalidCards[1]}]]`);
    
    // Return the modified array
    return invalidCards;

}

// Array of invalid card numbers as a string and an array to test the invalidCardsToValid function 
let cardNums = ['3, 4, 2, 6, 7, 1, 7, 7, 8, 6, 7, 9, 0, 5, 9', [5, 3, 4, 6, 6, 7, 8, 9, 0, 5, 6, 7, 8, 9, 0]];

// invalidCardsToValid function test
console.log(invalidCardsToValid(cardNums));