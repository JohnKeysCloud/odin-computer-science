When raising 2 to the power of n, the results in precisely 1 bit with a value of 1.
For example:
``` javascript
2^0 = 1 // 1 in binary is 1
2^1 = 2 // 2 in binary is 10
2^2 = 4 // 4 in binary is 100
2^3 = 8 // 8 in binary is 1000
2^4 = 16 // 16 in binary is 10000
2^5 = 32 // 32 in binary is 100000
2^6 = 64 // 64 in binary is 1000000
2^7 = 128 // 128 in binary is 10000000
2^8 = 256 // 256 in binary is 100000000
2^9 = 512 // 512 in binary is 1000000000
2^10 = 1024 // 1024 in binary is 10000000000
```

So subtracting 1 from 2^n results in precisely n bits with a value of 1.
It flips all the bits to the right of the rightmost 1 bit.
For example:
``` javascript
2^0 - 1 = 0 // 0 in binary is 0
2^1 - 1 = 1 // 1 in binary is 1
2^2 - 1 = 3 // 3 in binary is 11
2^3 - 1 = 7 // 7 in binary is 111
2^4 - 1 = 15 // 15 in binary is 1111
2^5 - 1 = 31 // 31 in binary is 11111
2^6 - 1 = 63 // 63 in binary is 111111
2^7 - 1 = 127 // 127 in binary is 1111111
2^8 - 1 = 255 // 255 in binary is 11111111
2^9 - 1 = 511 // 511 in binary is 111111111
2^10 - 1 = 1023 // 1023 in binary is 1111111111
```
