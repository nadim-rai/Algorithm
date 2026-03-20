function cocktailShakerSort(arr, comparator) {
    const n = arr.length;
    let swapped = true;
    let start = 0;
    let end = n - 1;

    // Default comparator if none is provided
    if (!comparator) {
        comparator = (a, b) => a - b; // Numeric comparison
    }

    while (swapped) {
        swapped = false;

        // Traverse the array from left to right
        for (let i = start; i < end; i++) {
            if (comparator(arr[i], arr[i + 1]) > 0) {
                // Swap if the current item is greater than the next item
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        // If nothing was swapped, the array is sorted
        if (!swapped) break;

        // Otherwise, reset swapped and adjust the end boundary
        swapped = false;
        end--;

        // Traverse the array from right to left
        for (let i = end; i > start; i--) {
            if (comparator(arr[i - 1], arr[i]) > 0) {
                // Swap if the current item is greater than the previous item
                [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
                swapped = true;
            }
        }
        // Adjust the start boundary
        start++;
    }
    return arr; // Return the sorted array
}

// Testing the cocktailShakerSort function with various inputs

console.log(cocktailShakerSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(cocktailShakerSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(cocktailShakerSort([1, 2, 3])); // [1, 2, 3]
console.log(cocktailShakerSort([])); // []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(cocktailShakerSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
    if (a < b) { return -1; }
    else if (a > b) { return 1; }
    return 0;
}
console.log(cocktailShakerSort(kitties, strComp)); // ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

var moarKittyData = [ {
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
} ];
function oldestToYoungest(a, b) {
    return b.age - a.age; // Sorts in descending order based on age
}
console.log(cocktailShakerSort(moarKittyData, oldestToYoungest));
