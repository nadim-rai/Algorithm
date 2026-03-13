function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1;
  let right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) {
    largest = left;
  }
  if (right < n && arr[right] > arr[largest]) {
    largest = right;
  }
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}

function heapSort(arr) {
  let n = arr.length;

  // Build the max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // One by one extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    // Move current root to end
    [arr[0], arr[i]] = [arr[i], arr[0]];
    // Call max heapify on the reduced heap
    heapify(arr, i, 0);
  }
  
  return arr; // Return the sorted array
}

// Example usage
let unsortedArray = [12, 11, 13, 5, 6, 7];
let sortedArray = heapSort(unsortedArray);
console.log(sortedArray); // Output: [5, 6, 7, 11, 12, 13]

console.log(heapSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]

console.log(heapSort([0, -10, 7, 4])); // [-10, 0, 4, 7]

console.log(heapSort([1, 2, 3])); // [1, 2, 3]

console.log(heapSort([]));

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];

console.log(heapSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]