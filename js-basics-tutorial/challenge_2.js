/////////// Function called ​ transpose​ which takes in a 2d array (array of arrays) //////////

// const transpose = (matrix) => {
//   // code here
//   let result = [];

//   for (let i = 0; i < matrix[0].length; i++) {
//     result.push([]);
//     // console.log(result);

//     for (let j = 0; j < matrix.length; j++) {
//       result[i][j] = matrix[j][i];
//       // console.log(result);
//     }
//   }
//   console.log(result);
//   return result;
// };

// transpose([
//   [1, 3, 5],
//   [2, 4, 6],
// ]);

///////////// Function called ​ print​ that prints out the matrix ////////////////
const print = (matrix) => {
  //code here

  let result = "";

  for (let i = 0; i < matrix.length; i++) {
    // var innerArrayLength = matrix[i].length;
    for (let j = 0; j < matrix[i].length; j++) {
      result += matrix[i][j] + " ";
    }
    result += "\n";
  }
  console.log(result);
  return result;
};

print([
  [1, 3, 5],
  [2, 4, 6],
]);

// let array = [
//   [1, 3, 5],
//   [2, 4, 6],
// ];

// let result = [];

// for (let i = 0; i < array[0].length; i++) {
//   result.push([]);
//   // console.log(result);

//   for (let j = 0; j < array.length; j++) {
//     result[i][j] = array[j][i];
//     // console.log(result);
//   }
// }
// console.log(result);

// return result;
