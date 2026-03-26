/**
 * Compares and swaps elements based on the direction.
 * @param {Array} arr - The array to sort.
 * @param {number} low - Starting index.
 * @param {number} cnt - Number of elements to compare.
 * @param {number} dir - 1 for ascending, 0 for descending.
 */
function bitonicCompare(arr, low, cnt, dir) {
  if (cnt > 1) {
    const k = cnt / 2;
    for (let i = low; i < low + k; i++) {
      if (dir === 1) {
        if (arr[i] > arr[i + k]) {
          [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
        }
      } else {
        if (arr[i] < arr[i + k]) {
          [arr[i], arr[i + k]] = [arr[i + k], arr[i]];
        }
      }
    }
  }
}

/**
 * Recursively merges bitonic sequences.
 */
function bitonicMerge(arr, low, cnt, dir) {
  if (cnt > 1) {
    const k = cnt / 2;
    bitonicCompare(arr, low, cnt, dir);
    bitonicMerge(arr, low, k, dir);
    bitonicMerge(arr, low + k, k, dir);
  }
}

/**
 * Builds bitonic sequences and merges them into a sorted array.
 */
function bitonicSortRecursive(arr, low, cnt, dir) {
  if (cnt > 1) {
    const k = cnt / 2;

    // 1. Sort first half ascending
    bitonicSortRecursive(arr, low, k, 1);
    
    // 2. Sort second half descending
    bitonicSortRecursive(arr, low + k, k, 0);

    // 3. Merge the resulting bitonic sequence
    bitonicMerge(arr, low, cnt, dir);
  }
}

/**
 * Wrapper function for Bitonic Sort.
 */
function bitonicSort(arr, ascending = true) {
  const n = arr.length;
  // Check if n is a power of 2
  if (n > 0 && (n & (n - 1)) === 0) {
    bitonicSortRecursive(arr, 0, n, ascending ? 1 : 0);
    return arr;
  } else {
    throw new Error("Array length must be a power of 2.");
  }
}

// Example Usage:
const data = [3, 7, 4, 8, 6, 2, 1, 5];
console.log("Original:", data);
bitonicSort(data);
console.log("Sorted:", data);

/**
 While standard .sort() is faster for UI tasks, Bitonic Sort logic is used in WebGL or WebGPU shaders. 
 Because shaders run code in parallel across thousands of cores, they can't use "branchy" algorithms 
 like QuickSort easily—they need the fixed comparison patterns of a Bitonic Sort.
 */