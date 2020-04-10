function validIP(address) {
  let section = address.split(".").map((x) => parseInt(x));

  if (section.length === 4) {
    for (let i = 0; i < section.length; i++) {
      if (section[i] < 0 || section[i] > 255) {
        // console.log(section);
        return false;
      }
    }
    console.log(section);
    return true;
  }
}

console.assert(validIP("0.0.0.0") === true, { errorCase: "0.0.0.0" });
console.assert(validIP("12.255.56.1") === true, { errorCase: "0.0.0.0" });
console.assert(validIP("137.255.156.100") === true, { errorCase: "0.0.0.0" });
console.assert(validIP("123.456.789.0") === false, {
  errorCase: "123.456.789.0",
});
console.assert(validIP("") === false, { errorCase: "" });
console.assert(validIP("abc.def.ghi.jkl") === false, {
  errorCase: "abc.def.ghi.jkl",
});

console.assert(validIP("256.1.2.3") === false, { errorCase: "256.1.2.3" });
console.assert(validIP("01.02.03.04") === false, { errorCase: "01.02.03.04" });
console.assert(validIP("12.34.56") === false, { errorCase: "12.34.56" });
console.assert(validIP("1.2.3.4.5") === false, { errorCase: "1.2.3.4.5" });
console.assert(validIP("1e0.1e1.1e2.2e2") === false, {
  errorCase: "1e0.1e1.1e2.2e2",
});
console.assert(validIP("123,45,67,89") === false, {
  errorCase: "123,45,67,89",
});
console.assert(validIP("1.2.3.4 ") === false, { errorCase: "1.2.3.4 " });
console.assert(validIP("12.34.56.-7") === false, { errorCase: "12.34.56.-7" });
console.assert(validIP(" 1.2.3.4") === false, { errorCase: " 1.2.3.4" });

console.assert(validIP("\n1.2.3.4") === false, { errorCase: "\n1.2.3.4" });
console.assert(validIP("1.2.3.4\n") === false, { errorCase: "1.2.3.4\n" });
