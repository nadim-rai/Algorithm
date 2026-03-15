function insertionSort(arr, compareFn) {
    const n = arr.length;

    // Loop through each element in the array starting from the second element
    for (let i = 1; i < n; i++) {
        const key = arr[i]; // Element to be inserted
        let j = i - 1; // Index of the last element in the sorted portion

        // Compare key with the sorted portion of the array
        while (j >= 0 && (compareFn ? compareFn(arr[j], key) > 0 : arr[j] > key)) {
            arr[j + 1] = arr[j]; // Shift element to the right
            j--; // Move to the previous index
        }
        arr[j + 1] = key; // Insert the key into the correct position
    }

    return arr; // Return the sorted array
}

// Example calls
console.log(insertionSort([4, 20, 12, 10, 7, 9])); // Output: [4, 7, 9, 10, 12, 20]
console.log(insertionSort([0, -10, 7, 4]));          // Output: [-10, 0, 4, 7]
console.log(insertionSort([1, 2, 3]));                // Output: [1, 2, 3]
console.log(insertionSort([]));                        // Output: []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(insertionSort(nums));                      // Output: [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];

function strComp(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    }
    return 0;
}

console.log(insertionSort(kitties, strComp)); // Output: ["Blue", "Garfield", "Grumpy", "Heathcliff", "LilBub"]

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

console.log(insertionSort(moarKittyData, oldestToYoungest)); // Sorted by age in descending order
