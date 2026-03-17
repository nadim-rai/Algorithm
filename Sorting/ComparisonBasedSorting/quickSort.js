function quickSort(arr, comparator) {
    // Base case for recursion
    if (arr.length <= 1) {
        return arr;
    }

    // Choose a pivot (for simplicity, we take the first element)
    const pivot = arr[0];
    const left = [];
    const right = [];

    // Partition the array into left and right arrays based on the pivot
    for (let i = 1; i < arr.length; i++) {
        if (comparator) {
            // If comparator is provided, use it to compare
            if (comparator(arr[i], pivot) < 0) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        } else {
            // Default numerical comparison
            if (arr[i] < pivot) {
                left.push(arr[i]);
            } else {
                right.push(arr[i]);
            }
        }
    }

    // Recursively sort left and right arrays and concatenate results
    return [...quickSort(left, comparator), pivot, ...quickSort(right, comparator)];
}

console.log(quickSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(quickSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(quickSort([1, 2, 3])); // [1, 2, 3]
console.log(quickSort([]));
 
var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(quickSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]
 
var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
 
function strComp(a, b) {
  if (a < b) { return -1;}
  else if (a > b) { return 1;}
  return 0;
}
 
console.log(quickSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]
 
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
 
console.log(quickSort(moarKittyData, oldestToYoungest)); // sorted by age in descending order
