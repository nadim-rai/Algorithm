function getDigit(num, place) {
    return Math.floor(Math.abs(num) / Math.pow(10, place)) % 10;
}

function digitCount(num) {
    if (num === 0) return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function countingSort(arr, place) {
    const output = new Array(arr.length);
    const count = new Array(10).fill(0);

    for (const num of arr) {
        count[getDigit(num, place)]++;
    }

    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = getDigit(arr[i], place);
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    return output;
}

function radixSort(nums) {
    if (nums.length === 0) return [];

    // 1. Separate negatives and positives
    let negatives = nums.filter(x => x < 0);
    let positives = nums.filter(x => x >= 0);

    // 2. Sort positives normally
    if (positives.length > 0) {
        const maxDigits = digitCount(Math.max(...positives));
        for (let p = 0; p < maxDigits; p++) {
            positives = countingSort(positives, p);
        }
    }

    // 3. Sort negatives by absolute value, then REVERSE them
    if (negatives.length > 0) {
        const maxDigits = digitCount(Math.min(...negatives));
        for (let p = 0; p < maxDigits; p++) {
            negatives = countingSort(negatives, p);
        }
        negatives.reverse(); // Larger absolute values must come first
    }

    // 4. Concatenate results
    return negatives.concat(positives);
}



console.log(radixSort([4, -20, 12, -10, 7, 0])); // [-20, -10, 0, 4, 7, 12]
// Example usage:
console.log(radixSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(radixSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(radixSort([1, 2, 3])); // [1, 2, 3]
console.log(radixSort([])); // []

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(radixSort(nums)); // [2, 3, 3, 4, 4, 4, 5, 23, 32, 32, 34, 34, 35, 43, 67, 75, 232, 232, 453, 546, 4342]