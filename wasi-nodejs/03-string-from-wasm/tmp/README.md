

```javascript
– You could simply bit-shift to convert: BigInt(uint32high) → shift left 32 bits → add BigInt(uint32low)
– Or: Create a Uint32Array & access its ArrayBuffer via a DataView:
```
> - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/setBigInt64


```javascript
// 1 with decimal numbers:

const hi = 12;
const low = 34;
let result = hi * 100; // shift left
result += low; // 1234
```

## Bit Shift

- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Left_shift

https://riptutorial.com/javascript/example/19068/shift-operators#undefined

https://riptutorial.com/javascript/example/5919/bitwise-operators#undefined
Bitwise OR: |

```
ptr: 103040 => uint32
size 11 => uint32

ret := (uint64(ptr) << uint64(32)) | uint64(size)

ret: 442553430179851
```


https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt/asUintN

ptr64 = BigInt.asUintN(64, 103040)


