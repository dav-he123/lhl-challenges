let fs = require("fs");

// fs.readFile("TestFile1.txt", function (err, TestFile1) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("Asynchronous read:", TestFile1.toString());
// });

// fs.readFile("TestFile2.txt", function (err, TestFile2) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("Asynchronous read:", TestFile2.toString());
// });

// fs.readFile("TestFile3.txt", function (err, TestFile3) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log("Asynchronous read:", TestFile3.toString());
// });

const slowRead = (fileNameOne, fileNameTwo, cb) => {
  // code here...

  console.log("Reading from file...");

  setTimeout(() => {
    fs.readFile(fileNameOne, function (err, fileNameOne) {
      fs.readFile(fileNameTwo, function (err, fileNameTwo) {
        // console.log("Asynchronous read:", Number(fileNameTwo));
        cb(Number(fileNameOne) + Number(fileNameTwo));
      });
    });
  }, 3000);

  // fs.readFile(fileNameOne, function (err, fileNameOne) {
  //   fs.readFile(fileNameTwo, function (err, fileNameTwo) {
  //     // console.log("Asynchronous read:", Number(fileNameTwo));
  //     cb(Number(fileNameOne) + Number(fileNameTwo));
  //   });
  // });
};

// const slowRead = (fileNameOne, fileNameTwo, cb) => {
//   // code here...

//   fs.readFile("TestFile.txt", function (err, data) {
//     if (err) {
//       console.log(data);
//     }
//     console.log("Reading from file...");
//   });
// };

slowRead("TestFile1.txt", "TestFile2.txt", (v) =>
  console.log(`The value is ${v}`)
);
// Sample Output
// Reading Data from Files....
// the value is 32
// feel free to add more test cases. Also create files file1 and file2 to test
this;
