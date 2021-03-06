var { getField, getCount, sendCount, calcCount, tryDoc } = require("../utils");

module.exports = {
  'array': [readArray, writeArray, sizeOfArray],
  'count': [readCount, writeCount, sizeOfCount],
  'container': [readContainer, writeContainer, sizeOfContainer]
};

function readArray(buffer, offset, typeArgs, rootNode) {
  var results = {
    value: [],
    size: 0
  };
  var value;
  var { count, size } = getCount.call(this, buffer, offset, typeArgs, rootNode);
  offset += size;
  results.size += size;
  for(var i = 0; i < count; i++) {
    ({size,value}=tryDoc(() => this.read(buffer, offset, typeArgs.type, rootNode), i));
    results.size += size;
    offset += size;
    results.value.push(value);
  }
  return results;
}

function writeArray(value, buffer, offset, typeArgs, rootNode) {
  offset = sendCount.call(this, value.length, buffer, offset, typeArgs, rootNode);
  return value.reduce((offset,v,index) =>tryDoc(() => this.write(v, buffer, offset, typeArgs.type, rootNode),index),offset);
}

function sizeOfArray(value, typeArgs, rootNode) {
  var size = calcCount.call(this, value.length, typeArgs, rootNode);
  size = value.reduce((size,v,index) =>tryDoc(() => size+this.sizeOf(v, typeArgs.type, rootNode), index),size);
  return size;
}


function readContainer(buffer, offset, typeArgs, context) {
  var results = {
    value: { "..": context },
    size: 0
  };
  typeArgs.forEach(({type,name,anon}) => {
    tryDoc(() => {
      var readResults = this.read(buffer, offset, type, results.value);
      results.size += readResults.size;
      offset += readResults.size;
      if (anon) {
        if(readResults.value !== undefined) Object.keys(readResults.value).forEach(function(key) {
          results.value[key] = readResults.value[key];
        });
      } else
        results.value[name] = readResults.value;
    }, name ? name : "unknown");
  });
  delete results.value[".."];
  return results;
}

function writeContainer(value, buffer, offset, typeArgs, context) {
  value[".."] = context;
  offset=typeArgs.reduce((offset,{type,name,anon}) =>
    tryDoc(() => this.write(anon ? value : value[name], buffer, offset, type, value),name ?  name : "unknown"),offset);
  delete value[".."];
  return offset;
}

function sizeOfContainer(value, typeArgs, context) {
  value[".."] = context;
  var size = typeArgs.reduce((size,{type,name,anon}) =>
    size + tryDoc(() => this.sizeOf(anon ? value : value[name], type, value), name ? name : "unknown"),0);
  delete value[".."];
  return size;
}

function readCount(buffer, offset, {type}, rootNode) {
  return this.read(buffer, offset, type, rootNode);
}

function writeCount(value, buffer, offset, {countFor,type}, rootNode) {
  // Actually gets the required field, and writes its length. Value is unused.
  // TODO : a bit hackityhack.
  return this.write(getField(countFor, rootNode).length, buffer, offset, type, rootNode);
}

function sizeOfCount(value, {countFor,type}, rootNode) {
  // TODO : should I use value or getField().length ?
  return this.sizeOf(getField(countFor, rootNode).length, type, rootNode);
}
