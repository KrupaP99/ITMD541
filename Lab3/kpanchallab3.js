// Krupa Panchal
// ITMD 541 Graduate Student


// ============================
// Exercise 1
// ============================

function minMaxAverage(numbers) {

    let total = numbers.length;
    let min = numbers[0];
    let max = numbers[0];
    let sum = 0;

    for (let i = 0; i < numbers.length; i++) {

        if (numbers[i] < min) {
            min = numbers[i];
        }

        if (numbers[i] > max) {
            max = numbers[i];
        }

        sum += numbers[i];
    }

    let average = sum / total;

    console.log(
        "Total Numbers: " + total +
        ", Min Value: " + min +
        ", Max Value: " + max +
        ", Average: " + average
    );
}

// Test Cases
minMaxAverage([2,5,23,6,9,4,30,1]);
minMaxAverage([1,5,3,5,10,12,8,6]);
minMaxAverage([10,20,30,40,50]);




// ============================
// Exercise 2
// ============================

function countVowels(word) {

    let vowels = "aeiouAEIOU";
    let count = 0;

    for (let i = 0; i < word.length; i++) {

        if (vowels.includes(word[i])) {
            count++;
        }

    }

    return count;
}

// Test Cases
console.log("Winter: " + countVowels("Winter") + " vowels");
console.log("Programming: " + countVowels("Programming") + " vowels");
console.log("JavaScript: " + countVowels("JavaScript") + " vowels");




// ============================
// Exercise 3
// ============================

function sortNumbers(arr) {

    let sorted = [...arr].sort(function(a,b){
        return a-b;
    });

    return sorted;
}

// Test Cases

let arr1 = [9,4,6,2];
console.log("Original Array:", arr1, "Sorted Array:", sortNumbers(arr1));

let arr2 = [10,1,7,3];
console.log("Original Array:", arr2, "Sorted Array:", sortNumbers(arr2));

let arr3 = [50,20,40,10];
console.log("Original Array:", arr3, "Sorted Array:", sortNumbers(arr3));




// ============================
// Exercise 4
// ============================

function celsiusToFahrenheit(celsius) {

    let c = parseFloat(celsius);

    let fahrenheit = (c * 9/5) + 32;

    console.log(
        c.toFixed(1) + " Celsius = " +
        fahrenheit.toFixed(1) + " Fahrenheit"
    );
}

// Required 3 tests
celsiusToFahrenheit(30);
celsiusToFahrenheit(10);
celsiusToFahrenheit(0);

// Graduate requirement (string inputs)
celsiusToFahrenheit("35");
celsiusToFahrenheit("22");




// ============================
// Exercise 5 (Graduate Only)
// ============================

function sortPeopleByAge(people) {

    let sortedPeople = [...people].sort(function(a,b){
        return a.age - b.age;
    });

    let introductions = sortedPeople.map(function(person){
        return person.name + " is " + person.age + " and from " + person.city;
    });

    return introductions;
}


// Test Case 1
let people1 = [
    {name:"Alice", age:28, city:"Chicago"},
    {name:"Bob", age:22, city:"New York"},
    {name:"Charlie", age:35, city:"Boston"},
    {name:"David", age:19, city:"Seattle"},
    {name:"Emma", age:26, city:"Austin"}
];

console.log(sortPeopleByAge(people1));



// Test Case 2
let people2 = [
    {name:"John", age:40, city:"Denver"},
    {name:"Maya", age:25, city:"San Diego"},
    {name:"Liam", age:32, city:"Dallas"},
    {name:"Sophia", age:21, city:"Miami"},
    {name:"Noah", age:29, city:"Phoenix"}
];

console.log(sortPeopleByAge(people2));
