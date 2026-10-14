let seconds =5
const timeId=setInterval(function(){
    console.log(seconds)
    seconds--
    if(seconds<0){
        clearInterval(timeId)
        console.log("Time is up")

        
    }
},100)