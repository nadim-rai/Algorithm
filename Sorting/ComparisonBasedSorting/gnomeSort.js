function gnomeSort(arr, comparator) {
  // Default comparator for numbers/strings if none is provided
  const compare = comparator || ((a, b) => a - b);
  
  let index = 0;
  while (index < arr.length) {
    if (index === 0) {
      index++;
    }

    // Use the comparator to check if elements are in order
    // If compare(prev, current) <= 0, they are in the correct order
    if (compare(arr[index - 1], arr[index]) <= 0) {
      index++;
    } else {
      // Swap elements
      [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
      index--;
    }
  }
  return arr;
}

// --- Test Cases ---

console.log(gnomeSort([4, 20, 12, 10, 7, 9])); 
// [4, 7, 9, 10, 12, 20]

console.log(gnomeSort([0, -10, 7, 4])); 
// [-10, 0, 4, 7]

console.log(gnomeSort([1, 2, 3])); 
// [1, 2, 3]

console.log(gnomeSort([])); 
// []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(gnomeSort(nums)); 
// [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
console.log(gnomeSort(kitties, strComp)); 
// ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [
  { name: "LilBub", age: 7 },
  { name: "Garfield", age: 40 },
  { name: "Heathcliff", age: 45 },
  { name: "Blue", age: 1 },
  { name: "Grumpy", age: 6 }
];

function oldestToYoungest(a, b) {
  return b.age - a.age;
}
console.log(gnomeSort(moarKittyData, oldestToYoungest));
// Sorted by age: Heathcliff (45), Garfield (40), LilBub (7), Grumpy (6), Blue (1)
