//делает код более безопасным, отслеживает некоторые ошибки, ex использование необъявленных переменных
'use strict';

/**
 * функция rle выполняет сжатие строки с использованием алгоритма RLE
 * @param {string} input - входная строка, которую нужно сжать
 * @returns {string} - сжатая строка
 */
const rle = (input) => {
    if(!(input instanceof String) && (typeof input !== 'string')){
        throw new Error("На вход должна подаваться строка");
    }
    let counter = 1;
    let prev = input[0];
    // .reduce((accumulator, currentValue) => {действия}, [нач.знач.])
    const resultArray = [...input].slice(1).reduce((accumulator, currentValue) => {
        // тк slice(1), то currentValue имеет индекс 1
        if(currentValue === prev){
            counter++;
        }
        else{
            accumulator.push(prev + (counter > 1 ? counter : ''));
            counter = 1;
        }
        prev = currentValue;
        return accumulator;
    }, []);
    if(prev){
        resultArray.push(prev + (counter > 1 ? counter : ''));
    }
    return resultArray.join('');
}

console.log(rle("AABBBL"))
// reduce, map, filter
// comments.filter((comment) => comment.text.match(/:)/));

//[1,1,1].map((num) => 5);

// comments.map((comment) => comment.author.Name);


const rleMap = (input) => {
    if(!(input instanceof String) && (typeof input !== 'string')){
        throw new Error("На вход должна подаваться строка");
    }
    let counter = 0;
    let prev = input[0];
    const resultArray = [...input].map((currentValue) => {
        if(currentValue === prev){
            counter++;
            return '';
        }
        else{
            let result = prev +  (counter > 1 ? counter : '');
            counter = 1;
            prev = currentValue;
            return result;
        }
    });
    if(counter > 0){
        resultArray.push(prev + (counter > 1 ? counter : ''));
    }
    return resultArray.reduce((accumulator, currentValue) => accumulator + currentValue, '');
}

console.log(rleMap("AABBBL"))