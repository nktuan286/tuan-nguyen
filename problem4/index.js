/* 
  O(n) time complexity - iterative approach 
*/
export function sum_to_n_a(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  let sum: number = 0;
  for (let i: number = 1; i <= n; i++) {
      sum += i;
  }
  return sum;
}

/* 
  O(1) time complexity - mathematical formula
  Uses the arithmetic sequence sum formula: n * (n + 1) / 2 
*/
function sum_to_n_b(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  return (n * (n + 1)) / 2;
}

/* 
  O(n) time complexity - recursive approach
*/
function sum_to_n_c(n: number): number {
  if (!Number.isInteger(n) || n < 0) {
    throw new Error('Input must be a non-negative integer');
  }
  if (n === 0) return 0;
  return n + sum_to_n_c(n - 1);
}
