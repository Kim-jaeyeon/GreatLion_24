var clock=document.getElementById("clock");
function getTime(){
    var timeInfo=new Date();
    var hour=String(timeInfo.getHours()).padStart(2,'0');
    var min=String(timeInfo.getMinutes()).padStart(2,'0');
    var sec=String(timeInfo.getSeconds()).padStart(2,'0');

    clock.innerText=hour+":"+min+":"+sec;
    console.log("!");
}
getTime();
setInterval(getTime,1000);

