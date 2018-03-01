// 数组合并

var arr1 = [1,2]
var arr2 = [3,4]

var arr = arr1.concat(arr2)

function flation(arr1, arr2){
    for(var i=0;i<arr2.length;i++){
        arr1.push(arr2[i])
    }
    return arr1
}

var myArray = [[1, 2], [3, 4, 5], [6, 7, 8, 9], [11,12,[12,13,[14]]], 10, 11];

//push
function flatten(arr, result){
    if(!result){
        return = []
    }
    for(var i = 0; i < arr.length; i++){
        if(arr[i].constructor == Array){
            flatten(arr[i], r)
        }else{
            result.push(arr[i])
        }
    }
    return result
}
