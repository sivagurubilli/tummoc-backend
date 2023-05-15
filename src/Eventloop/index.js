const fs = require("fs")

function asyncOperation(callback){
    fs.readFile("/path/to/file",callback);
}

const timeoutSchedule = Date.now()

setTimeout(() => {
    const delay = Date.now()
    console.log(`${delay}ms have passed since I was schedule`)
},100)

asyncOperation(()=>{
    const startCallback = Date.now()
    while(Date.now()-startCallback<10){
       
    }
})