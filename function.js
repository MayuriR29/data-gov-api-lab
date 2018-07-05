// Array.from({ length: 5 }).forEach(() => console.log("Hello"));
// let sum = 0;

// for (i = 1; i <= 5; i++) {
//   sum = sum + i;
// }
// console.log("sum", sum);

// let total = Array.from([1, 2, 3, 4, 5]).reduce((acc, curr) => acc + curr);
// console.log("total", total);
const sequenceSum = (begin, end, step) => {
  let sequence = [];
  if (begin < end) {
    for (i = begin; i <= end; i = i + step) {
      sequence[i] = i;
    }
    sequence.shift();
    let sum = sequence.reduce((acc, curr) => acc + curr);
    return sum;
  }else
  {
      return 0;
  }
};
console.log(sequenceSum(2, 2, 2));
