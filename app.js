console.log("hellow world");
const urlParams = new URLSearchParams(window.location.href);
// for (const key of urlParams.keys()) {
//     console.log(key);
//     console.log(urlParams.get(key));
// }
console.log([...urlParams]);
