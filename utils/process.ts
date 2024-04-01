export function processStringLength(str:string) {
    //自负保留前4位 后6位中间用....代替
    if (str.length <= 10) {
        return str;
    }
    return str.substr(0, 4) + '...' + str.substr(str.length - 6);
}

export  function Uint8ArrayToString(fileData : Uint8Array){
    var dataString = "";
    for (var i = 0; i < fileData.length; i++) {
      dataString += String.fromCharCode(fileData[i]);
    }
   
    return dataString
  
  }