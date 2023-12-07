console.log("Hello, world!");

// Get URL parameters
const urlParams = new URLSearchParams(window.location.search);
const num1 = urlParams.get('num1');
const num2 = urlParams.get('num2');

console.log('num1:', num1);
console.log('num2:', num2);

// Compare num1 and num2, set result accordingly
const result = num1 === num2 ? 'Match' : 'No match';
console.log(result);
// Display the result on the page
document.getElementById('result').innerText = result;
