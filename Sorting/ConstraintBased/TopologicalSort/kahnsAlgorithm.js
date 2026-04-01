function topologicalSort(numNodes, edges) {
    const adj = Array.from({ length: numNodes }, () => []);
    const inDegree = new Array(numNodes).fill(0);
    const result = [];

    // 1. Build the adjacency list and calculate in-degrees
    for (const [u, v] of edges) {
        adj[u].push(v);
        inDegree[v]++;
    }

    // 2. Find all nodes with 0 in-degree and add to queue
    const queue = [];
    for (let i = 0; i < numNodes; i++) {
        if (inDegree[i] === 0) queue.push(i);
    }

    // 3. Process the queue
    while (queue.length > 0) {
        const u = queue.shift();
        result.push(u);

        // Decrease in-degree for all neighbors
        for (const v of adj[u]) {
            inDegree[v]--;
            // If in-degree becomes 0, add to queue
            if (inDegree[v] === 0) queue.push(v);
        }
    }

    // 4. Check for cycles (if result length != numNodes, a cycle exists)
    if (result.length !== numNodes) {
        throw new Error("Cycle detected! Topological sort impossible.");
    }

    return result;
}

// Example: Tasks 0 and 1 must be done before 2; 2 must be done before 3.
const numNodes = 4;
const edges = [[0, 2], [1, 2], [2, 3]]; 
console.log(topologicalSort(numNodes, edges)); // Output: [0, 1, 2, 3] or [1, 0, 2, 3]