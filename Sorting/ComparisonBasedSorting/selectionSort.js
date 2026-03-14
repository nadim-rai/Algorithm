function selectionSort(arr, compareFn) {
    const n = arr.length;

    // Loop through each index in the array
    for (let i = 0; i < n - 1; i++) {
        let minIndex = i; // Assume the minimum is the first element of the unsorted part

        // Find the index of the smallest (or largest, based on comparator) element
        for (let j = i + 1; j < n; j++) {
            let shouldSwap;
            if (compareFn) {
                // Use the provided compare function if it exists
                shouldSwap = compareFn(arr[j], arr[minIndex]) < 0;
            } else {
                // Default comparison for numbers and strings
                shouldSwap = arr[j] < arr[minIndex];
            }

            // Update minIndex if a smaller element is found
            if (shouldSwap) {
                minIndex = j;
            }
        }

        // Swap the found minimum element with the first element of the unsorted part
        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        }
    }

    return arr; // Return the sorted array
}

// Example calls
console.log(selectionSort([4, 20, 12, 10, 7, 9])); // Output: [4, 7, 9, 10, 12, 20]
console.log(selectionSort([0, -10, 7, 4]));          // Output: [-10, 0, 4, 7]
console.log(selectionSort([1, 2, 3]));                // Output: [1, 2, 3]
console.log(selectionSort([]));                        // Output: []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(selectionSort(nums));                      // Output: [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strComp(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

console.log(selectionSort(kitties, strComp)); // Output: ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

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
    return b.age - a.age; // Sort by age in descending order
}

console.log(selectionSort(moarKittyData, oldestToYoungest)); // Sorted by age in descending order
