/**
 * TIMSORT (WITHOUT GALLOPING)
 * Complete, functional implementation.
 */

// 1. Binary Insertion Sort: Faster for small chunks using binary search for positions
function binaryInsertionSort(arr, left, right, start, comp) {
    if (start <= left) start = left + 1;
    for (; start <= right; start++) {
        let key = arr[start];
        let l = left;
        let r = start - 1;

        while (l <= r) {
            let mid = (l + r) >>> 1;
            if (comp(key, arr[mid]) < 0) r = mid - 1;
            else l = mid + 1;
        }

        for (let j = start - 1; j >= l; j--) {
            arr[j + 1] = arr[j];
        }
        arr[l] = key;
    }
}

// 2. Natural Run Detector: Finds sorted sequences and flips descending ones
function countRunAndMakeAscending(arr, lo, hi, comp) {
    let runHi = lo + 1;
    if (runHi === hi) return 1;

    if (comp(arr[runHi++], arr[lo]) < 0) { // Strictly Descending
        while (runHi < hi && comp(arr[runHi], arr[runHi - 1]) < 0) runHi++;
        reverseRange(arr, lo, runHi - 1);
    } else { // Ascending
        while (runHi < hi && comp(arr[runHi], arr[runHi - 1]) >= 0) runHi++;
    }
    return runHi - lo;
}

function reverseRange(arr, lo, hi) {
    while (lo < hi) {
        let temp = arr[lo];
        arr[lo++] = arr[hi];
        arr[hi--] = temp;
    }
}

// 3. Linear Merge: Combines two sorted runs into one
function merge(arr, left, mid, right, comp) {
    const leftLen = mid - left + 1;
    const tempLeft = arr.slice(left, mid + 1);

    let i = 0;       // Pointer for tempLeft
    let j = mid + 1; // Pointer for right side of original arr
    let k = left;    // Pointer for target position in original arr

    while (i < leftLen && j <= right) {
        if (comp(tempLeft[i], arr[j]) <= 0) {
            arr[k++] = tempLeft[i++];
        } else {
            arr[k++] = arr[j++];
        }
    }

    while (i < leftLen) {
        arr[k++] = tempLeft[i++];
    }
}

// 4. MAIN TIMSORT
function timSort(arr, comp = (a, b) => a - b) {
    const n = arr.length;
    if (n < 2) return arr;

    const minRun = 32; 
    let i = 0;

    // Step A: Create sorted runs
    while (i < n) {
        let runLen = countRunAndMakeAscending(arr, i, n, comp);
        if (runLen < minRun) {
            const force = Math.min(n - i, minRun);
            binaryInsertionSort(arr, i, i + force - 1, i + runLen, comp);
            runLen = force;
        }
        i += runLen;
    }

    // Step B: Merge runs bottom-up
    for (let size = minRun; size < n; size *= 2) {
        for (let left = 0; left < n; left += 2 * size) {
            const mid = left + size - 1;
            const right = Math.min(left + 2 * size - 1, n - 1);
            if (mid < right) {
                merge(arr, left, mid, right, comp);
            }
        }
    }
    return arr;
}

// --- TEST CASES ---

console.log("Basic numbers:", timSort([4, 20, 12, 10, 7, 9])); 
console.log("Negative/Zero:", timSort([0, -10, 7, 4]));
console.log("Already sorted:", timSort([1, 2, 3]));
console.log("Empty array:", timSort([]));

var nums = [4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2, 453, 546, 75, 67, 4342, 32];
console.log("Large num set:", timSort(nums)); 

var kitties = ["LilBub", "Garfield", "Heathcliff", "Blue", "Grumpy"];
function strComp(a, b) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
}
console.log("Strings:", timSort(kitties, strComp));

var moarKittyData = [
    { name: "LilBub", age: 7 }, 
    { name: "Garfield", age: 40 }, 
    { name: "Heathcliff", age: 45 }, 
    { name: "Blue", age: 1 }, 
    { name: "Grumpy", age: 6 }
];
function oldestToYoungest(a, b) {
    return b.age - a.age;
}
console.log("Objects (by age):", timSort(moarKittyData, oldestToYoungest));
