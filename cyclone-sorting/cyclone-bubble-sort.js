let arrayOne = [23, 43, 12, 56, 35];

function bubbleSort(array) {
    let flag = false; // flag prevents wasted loops 
    for (let i = 0; i <= array.length - 1; ++i) {
        flag = false;
        for (let j = 0; j < array.length - i - 1; ++j) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                flag = true
            }   
        }
        if (!flag) {
            return array  
        }
    }
}
console.time('bubble');
console.log(bubbleSort(arrayOne));
console.timeEnd('bubble');



