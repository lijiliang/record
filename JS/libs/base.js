/**
 * [getObjType 判断obj是什么类型的变量]
 * @param  {[Object]} object [变量]
 * @return {[string]}        [返回变量的类型]
 * object、array、string、number、null、undefined、
 */
function getObjType(object){
  return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
}

/**
 * [isObject 是否是object类型]
 * @param  {[object]}  obj [变量]
 * @return {Boolean}     [返回true或false]
 */
function isObject(obj){
  return getObjType(obj) == 'object'
}

module.exports = {
    getObjType: getObjType,
    isObject: isObject
}
