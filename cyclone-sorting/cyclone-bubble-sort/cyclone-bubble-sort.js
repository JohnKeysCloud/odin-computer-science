let arrayOne = [23, 43, 12, 56, 35];

function bubbleSort(array) {
	let flag = false; // flag prevents wasted loops 
	for (let i = 0; i < array.length; i++) {
		flag = false;
		for (let j = 0; j < array.length - i - 1; j++) {
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
	// Worst case scenario reached (all outer loop iterations have run)
	return array;
}

console.log(bubbleSort(arrayOne));