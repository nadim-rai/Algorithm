function shellSort(arr, compare) {
    const n = arr.length;

    // Default comparison function for numbers
    const defaultCompare = (a, b) => {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    };

    // Use the provided comparison function or default to the default one
    const comparator = compare || defaultCompare;

    // Start with a large gap, then reduce it step by step
    for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
        // Perform a "gapped" insertion sort for this gap size
        for (let i = gap; i < n; i++) {
            // Current element to be placed correctly
            const temp = arr[i];
            let j = i;

            // Shift earlier elements that are greater than temp
            while (j >= gap && comparator(arr[j - gap], temp) > 0) {
                arr[j] = arr[j - gap]; // Move elements to create space
                j -= gap;
            }

            // Place temp in its correct position
            arr[j] = temp;
        }
    }

    return arr;
}

// Example usage with numbers
console.log(shellSort([4, 20, 12, 10, 7, 9])); // Output: [4, 7, 9, 10, 12, 20]
console.log(shellSort([0, -10, 7, 4]));          // Output: [-10, 0, 4, 7]
console.log(shellSort([1, 2, 3]));                // Output: [1, 2, 3]
console.log(shellSort([]));                        // Output: []

// Example usage with a larger array of numbers
var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(shellSort(nums));                      // Output: [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

// Example usage with strings
var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
console.log(shellSort(kitties, strComp)); // Output: ['Blue', 'Garfield', 'Grumpy', 'Heathcliff', 'LilBub']

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
console.log(shellSort(moarKittyData, oldestToYoungest)); // Sorted by age in descending order
