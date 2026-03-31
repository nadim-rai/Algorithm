function cardinalSort(arr) {
  if (arr.length === 0) return [];

  // Separate negatives and positives to handle the signs
  const negatives = arr.filter(n => n < 0).map(n => Math.abs(n));
  const positives = arr.filter(n => n >= 0);

  // Helper: Radix sort logic for absolute values
  function radixSort(list) {
    let max = Math.max(...list);
    let digitPlace = 1;

    while (max / digitPlace >= 1) {
      const buckets = Array.from({ length: 10 }, () => []);
      
      for (let num of list) {
        // Isolate the specific digit (e.g., the 10s place)
        const digit = Math.floor((num / digitPlace) % 10);
        buckets[digit].push(num);
      }
      
      // Flatten buckets back into the list
      list = [].concat(...buckets);
      digitPlace *= 10;
    }
    return list;
  }

  const sortedPositives = positives.length ? radixSort(positives) : [];
  const sortedNegatives = negatives.length ? radixSort(negatives) : [];

  // Re-combine: reverse negatives and make them negative again
  return [
    ...sortedNegatives.reverse().map(n => -n),
    ...sortedPositives
  ];
}

// --- Test Cases ---
console.log(cardinalSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(cardinalSort([0, -10, 7, 4]));       // [-10, 0, 4, 7]
console.log(cardinalSort([]));                   // []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(cardinalSort(nums)); 
// [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]