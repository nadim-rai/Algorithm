function flashSort(arr) {
    const n = arr.length;
    if (n <= 1) return arr;

    // 1. Find min and max values
    let minVal = arr[0];
    let maxIdx = 0;
    for (let i = 1; i < n; i++) {
        if (arr[i] < minVal) minVal = arr[i];
        if (arr[i] > arr[maxIdx]) maxIdx = i;
    }

    if (arr[maxIdx] === minVal) return arr; // All identical

    // 2. Classification
    // Neubert suggested m = 0.45 * n for optimal performance
    let m = Math.floor(0.45 * n);
    if (m < 1) m = 1;
    let L = new Array(m).fill(0);
    
    // Scale factor for classification formula
    const scale = (m - 1) / (arr[maxIdx] - minVal);

    for (let i = 0; i < n; i++) {
        let k = Math.floor(scale * (arr[i] - minVal));
        L[k]++;
    }
    
    // 3. Cumulative distribution (pointers to the end of each bucket)
    for (let i = 1; i < m; i++) {
        L[i] += L[i - 1];
    }

    // 4. Permutation In Situ (The "Flash" phase)
    // Swap max element to the first position to start the cycle
    [arr[0], arr[maxIdx]] = [arr[maxIdx], arr[0]];
    
    let count = 0;
    let j = 0;
    let k = m - 1;
    
    while (count < n - 1) {
        // Find the next element that isn't in its correct class yet
        while (j > L[k] - 1) {
            j++;
            k = Math.floor(scale * (arr[j] - minVal));
        }
        
        let flash = arr[j];
        // Permute in a cycle until we hit an element belonging to the current bucket
        while (j <= L[k] - 1) {
            k = Math.floor(scale * (flash - minVal));
            let loc = L[k] - 1;
            
            // Swap flash with the element at the target location
            let temp = arr[loc];
            arr[loc] = flash;
            flash = temp;
            
            L[k]--;
            count++;
        }
    }

    // 5. Final Insertion Sort
    // Data is now "mostly sorted" by bucket; this pass finishes it.
    for (let i = 1; i < n; i++) {
        let hold = arr[i];
        let pos = i - 1;
        while (pos >= 0 && arr[pos] > hold) {
            arr[pos + 1] = arr[pos];
            pos--;
        }
        arr[pos + 1] = hold;
    }

    return arr;
}

// Example usage:
console.log(flashSort([4, 20, 12, 10, 7, 9])); // [4, 7, 9, 10, 12, 20]
console.log(flashSort([0, -10, 7, 4])); // [-10, 0, 4, 7]
console.log(flashSort([1, 2, 3])); // [1, 2, 3]
console.log(flashSort([])); // []

const nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log(flashSort(nums)); 

