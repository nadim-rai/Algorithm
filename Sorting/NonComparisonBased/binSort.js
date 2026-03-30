function binSort(arr, comparator) {
  if (arr.length === 0) return [];

  // 1. Handle Numerical Sorting (Standard Bin Sort logic)
  if (typeof arr[0] === 'number' && !comparator) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = 5;
    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = Array.from({ length: bucketCount }, () => []);

    arr.forEach(val => {
      const index = Math.floor((val - min) / bucketSize);
      buckets[index].push(val);
    });

    return buckets.reduce((acc, b) => [...acc, ...b.sort((a, b) => a - b)], []);
  }

  // 2. Handle Custom Comparators (Strings or Objects)
  // When a comparator is provided, we use it to sort the array.
  // In a true Bin Sort for strings, you'd sort by character, 
  // but for a general-purpose function, we use the comparator.
  return [...arr].sort(comparator);
}

// --- YOUR TEST CASES ---

console.log(binSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(binSort([0, -10, 7, 4]));       // [-10, 0, 4, 7]
console.log(binSort([1, 2, 3]));            // [1, 2, 3]
console.log(binSort([]));                   // []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(binSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
console.log(binSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

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

console.log(binSort(moarKittyData, oldestToYoungest)); 
/* Output:
[
  { name: 'Heathcliff', age: 45 },
  { name: 'Garfield', age: 40 },
  { name: 'LilBub', age: 7 },
  { name: 'Grumpy', age: 6 },
  { name: 'Blue', age: 1 }
]
*/