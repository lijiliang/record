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

/**
 * [generateID 生成唯一ID]
 * @param {String} prefix 生成ID前缀
 * @return {String} 返回生成的ID
 */
function generateID(prefix){
    var idPrefix = prefix ? prefix + '-' : '';
    return idPrefix + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

module.exports = {
    getObjType: getObjType,
    isObject: isObject,
    generateID: generateID
}
