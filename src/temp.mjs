/**
 *  Cookieless domain dla obrazków #32 (test)
 */

/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
import { createHash } from 'node:crypto';

function hash(content, algo = 'md5') {
  const hashFunc = createHash(algo);   // you can also sha256, sha512 etc
  hashFunc.update(content);
  return hashFunc.digest('hex');       // will return hash, formatted to HEX
}

function md5Test() {
  const text = "Ala ma kota";
  const expected = "91162629d258a876ee994e9233b2ad87";
  const result = hash(text);
  console.log(text, result, result===expected);
}
md5Test();

// check with path actually on commons
let tests = [
  {n:'Example.jpg', path:'a/a9'},
  {n:'Lea Francis 1914 V-Twin 2.jpg', path:'8/81'},
  {n:'Trutnov, Babí, G3-61-A-140 Z (rok 2012; 01).jpg', path:'3/34'},
  {n:'2014 Tarnobrzeg, kościół Wniebowzięcia NMP, 33.JPG', path:'c/c1'},
  // https://commons.wikimedia.org/wiki/File:2014_Tarnobrzeg,_ul._Dominika%C5%84ska_6_03.JPG
  // https://upload.wikimedia.org/wikipedia/commons/7/73/2014_Tarnobrzeg%2C_ul._Dominika%C5%84ska_6_03.JPG
  // https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/2014_Tarnobrzeg%2C_ul._Dominika%C5%84ska_6_03.JPG/300px-2014_Tarnobrzeg%2C_ul._Dominika%C5%84ska_6_03.JPG
  {n:'2014 Tarnobrzeg, ul. Dominikańska 6 03.JPG', path:'7/73'},
];
for (let t of tests) {
  let text = t.n;
  let result = hash(text.replace(/ /g, '_'));
  let autoPath = `${result.charAt(0)}/${result.charAt(0)}${result.charAt(1)}`;
  console.log({path:t.path, autoPath, result});
}
