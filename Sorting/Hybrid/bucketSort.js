function bucketSort(arr, comparator = (a, b) => a - b) {
  if (arr.length === 0) return [];

  // 1. Find min and max to determine the range
  let min = arr[0];
  let max = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    const val = typeof arr[i] === 'object' ? arr[i] : arr[i];
    // For range calculation, we use the values directly or defaults for non-numbers
    if (arr[i] < min) min = arr[i];
    if (arr[i] > max) max = arr[i];
  }

  // 2. Initialize buckets 
  // We'll use a number of buckets equal to the array length
  const bucketCount = arr.length;
  const buckets = Array.from({ length: bucketCount }, () => []);

  // 3. Scatter: Distribute elements into buckets
  // For non-numeric types (like strings), we fallback to a simpler distribution
  for (let i = 0; i < arr.length; i++) {
    let bucketIndex;
    if (typeof min === 'number' && typeof max === 'number' && max !== min) {
      bucketIndex = Math.floor(((arr[i] - min) / (max - min)) * (bucketCount - 1));
    } else {
      // Fallback for strings or identical values: put everything in the first bucket
      bucketIndex = 0;
    }
    buckets[bucketIndex].push(arr[i]);
  }

  // 4. Sort each bucket and Gather
  return buckets.reduce((acc, bucket) => {
    bucket.sort(comparator); // Use the provided comparator
    return acc.concat(bucket);
  }, []);
}

// --- Test Cases ---
console.log(bucketSort([4, 20, 12, 10, 7, 9])); 
console.log(bucketSort([0, -10, 7, 4])); 
console.log(bucketSort([1, 2, 3])); 
console.log(bucketSort([]));

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(bucketSort(nums));

const kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}
console.log(bucketSort(kitties, strComp));

const moarKittyData = [
  { name: "LilBub", age: 7 },
  { name: "Garfield", age: 40 },
  { name: "Heathcliff", age: 45 },
  { name: "Blue", age: 1 },
  { name: "Grumpy", age: 6 }
];
function oldestToYoungest(a, b) {
  return b.age - a.age;
}
console.log(bucketSort(moarKittyData, oldestToYoungest));
