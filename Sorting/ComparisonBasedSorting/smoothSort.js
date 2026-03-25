function smoothSort(arr, compareFunc = (a, b) => a - b) {
    const n = arr.length;
    if (n < 2) return arr;

    // Leonardo numbers: 1, 1, 3, 5, 9, 15, 25, 41...
    const lp = [1, 1];
    while (lp[lp.length - 1] < n) {
        lp.push(lp[lp.length - 1] + lp[lp.length - 2] + 1);
    }

    // Helper: Fix a single Leonardo tree (standard heapify-style)
    function sift(r, b) {
        while (b >= 2) {
            let r2 = r - 1 - lp[b - 2];
            let r1 = r - 1;
            if (compareFunc(arr[r], arr[r1]) < 0 || compareFunc(arr[r], arr[r2]) < 0) {
                if (compareFunc(arr[r1], arr[r2]) < 0) {
                    [arr[r], arr[r2]] = [arr[r2], arr[r]];
                    r = r2;
                    b -= 2;
                } else {
                    [arr[r], arr[r1]] = [arr[r1], arr[r]];
                    r = r1;
                    b -= 1;
                }
            } else break;
        }
    }

    // Helper: Ensure the roots of the forest are in increasing order
    function trinkle(r, p, b) {
        while (p > 0) {
            while ((p & 1) === 0) {
                p >>= 1;
                b++;
            }
            if (p === 1) break;
            let prev_r = r - lp[b];
            if (compareFunc(arr[prev_r], arr[r]) <= 0) break;
            
            p--; // Moving left in the forest
            [arr[r], arr[prev_r]] = [arr[prev_r], arr[r]];
            r = prev_r;
        }
        sift(r, b);
    }

    let p = 1; // Bitmask tracking which Leonardo trees exist
    let b = 1; // Current Leonardo number index

    // Phase 1: Build the Leonardo forest (scanning left-to-right)
    for (let i = 0; i < n; i++) {
        if ((p & 3) === 3) {
            p = (p >> 2) + 1;
            b += 2;
        } else {
            if (lp[b - 1] >= n - 1 - i) {
                p <<= 1;
                while ((p & 1) === 0) {
                    p >>= 1;
                    b++;
                }
            } else {
                p = (p << 1) + 1;
                b = 1;
            }
        }
        trinkle(i, p, b);
    }

    // Phase 2: Shrink the forest and finalize sorting
    for (let i = n - 1; i > 0; i--) {
        if (b >= 2) {
            p--;
            p = (p << 2) + 1;
            b -= 2;
            trinkle(i - 1 - lp[b + 1], p >> 1, b + 1);
            trinkle(i - 1, p, b);
        } else {
            p--;
            while (p > 0 && (p & 1) === 0) {
                p >>= 1;
                b++;
            }
            if (p > 0) trinkle(i - 1, p, b);
        }
    }

    return arr;
}