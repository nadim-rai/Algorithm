
/**
 * Pigeonhole Sort implementation in JavaScript
 * @param {Array} arr - The array to sort
 * @param {Function} [comparator] - Optional custom comparison function
 */
function pigeonholeSort(arr, comparator) {
  if (arr.length <= 1) return arr;

  // Use standard comparison sort if a custom comparator or non-integers are detected
  if (comparator || typeof arr[0] !== 'number') {
    return arr.sort(comparator);
  }

  // 1. Find min and max values to determine range
  let min = arr[0];
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  const range = max - min + 1;
  
  // 2. Create "holes" (buckets) for the range
  // Using an array of arrays to maintain stability
  const holes = Array.from({ length: range }, () => []);

  // 3. Put each element into its corresponding hole
  for (let i = 0; i < arr.length; i++) {
    holes[arr[i] - min].push(arr[i]);
  }

  // 4. Reconstruct the array from the holes
  let index = 0;
  for (let i = 0; i < range; i++) {
    while (holes[i].length > 0) {
      arr[index++] = holes[i].shift();
    }
  }

  return arr;
}


console.log(pigeonholeSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]

console.log(pigeonholeSort([0, -10, 7, 4])); // [-10, 0, 4, 7]

console.log(pigeonholeSort([1, 2, 3])); // [1, 2, 3]

console.log(pigeonholeSort([]));
 
var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];

pigeonholeSort(nums); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
 
var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
 
function strComp(a, b) {
  if (a < b) { return -1;}
  else if (a > b) { return 1;}
  return 0;
}
 
console.log(pigeonholeSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
 
var moarKittyData = [{
  name: "LilBub",
  age: 7
}, {
  name: "Garfield",
  age: 40
}, {
  name: "Heathcliff",
  age: 45
}, {
  name: "Blue",
  age: 1
}, {
  name: "Grumpy",
  age: 6
}];
 
function oldestToYoungest(a, b) {
  return b.age - a.age;
}
 
console.log(pigeonholeSort(moarKittyData, oldestToYoungest)); 
// sorted by age in descending order