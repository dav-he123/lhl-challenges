const digitSum = (num) => {
  // code here...
  let result = num.toString().split("").map(Number);
  // .reduce(function (a, b) {
  //   return a + b;
  // });

  let firstValue = 0;
  for (let i = 0; i < result.length; i++) {
    firstValue += result[i];
  }
  if (firstValue > 9) {
    let resultArr = firstValue.toString().split("").map(Number);
    // let value = 0;
    let secondValue = 0;
    for (let i = 0; i < resultArr.length; i++) {
      secondValue += resultArr[i];
    }
    console.log(secondValue);
    return secondValue;
  } else {
    console.log(firstValue);
    return firstValue;
  }
};

console.assert(digitSum(11) === 2, { errorCase: 11 });
console.assert(digitSum(29) === 2, { errorCase: 29 });
console.assert(digitSum(666) === 9, { errorCase: 666 });
console.assert(digitSum(16) === 7, { errorCase: 16 });
console.assert(digitSum(456) === 6, { errorCase: 456 });
console.assert(digitSum(234574) === 7, { errorCase: 234574 });
