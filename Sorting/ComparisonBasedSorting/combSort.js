function combSort(arr, compare) {
  // Use default comparator if none is provided
  if (!compare) {
    compare = (a, b) => {
      if (a < b) return -1;
      if (a > b) return 1;
      return 0;
    };
  }

  let n = arr.length;
  let gap = n;
  let shrink = 1.3;
  let sorted = false;

  while (!sorted) {
    // Update the gap value for a new pass
    gap = Math.floor(gap / shrink);

    if (gap <= 1) {
      gap = 1;
      sorted = true; // Assume sorted until a swap occurs at gap 1
    }

    // Compare elements with the current gap
    for (let i = 0; i + gap < n; i++) {
      if (compare(arr[i], arr[i + gap]) > 0) {
        // Swap elements
        let temp = arr[i];
        arr[i] = arr[i + gap];
        arr[i + gap] = temp;
        
        sorted = false; // A swap occurred, so list might not be sorted
      }
    }
  }
  return arr;
}

// --- Test Cases ---

console.log(combSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(combSort([0, -10, 7, 4]));         // [-10, 0, 4, 7]
console.log(combSort([1, 2, 3]));              // [1, 2, 3]
console.log(combSort([]));                     // []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(combSort(nums)); 
// [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
  if (a < b) return -1;
  else if (a > b) return 1;
  return 0;
}
console.log(combSort(kitties, strComp)); 
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
console.log(combSort(moarKittyData, oldestToYoungest)); 
// [{name: "Heathcliff", age: 45}, {name: "Garfield", age: 40}, ...]
