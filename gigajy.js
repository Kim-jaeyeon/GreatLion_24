

var wea_list=["Rain"];


const API_KEY="66978ab4b6f11f56b4864aede604a6c9";


//2차원 배열로, 0번 벡터에는  일출~아침 플리, 1번 벡터에는 낮~일몰 전 플리, 2번은 일몰 중~초저녁, 3번은 저녁~늦은 밤 플리, 4번은 늦은 밤~새벽 플리가 들어있음.
const musuc_list_for_time=[["playlists/morning/[20분]날씨 풀리기만을 기다려온 기분 좋은 봄 팝송 플레이리스트 - 6곡.mp3"],["playlists/day/Zeauxi - July on Film.mp3"],["playlists/sunset/Cigarettes After Sex - Sunsetz.mp3"],["playlists/night/Jeremy Zucker & Chelsea Cutler - This Is How You Fall In Love.mp3"],["playlists/dawn/Sydney Rose - Turning Page.mp3"]];


//12~2월:겨울 ->1
//3~5:봄 ->2
//6~8:여름  ->3
//9~11:가을->4

var monthset=0;
function get_Month(){
    var timeInfo=new Date();
    if(timeInfo.getMonth()==12||timeInfo.getMonth()==1||timeInfo.getMonth()==2){
        monthset=1;//겨울
    }
    else if(timeInfo.getMonth()>=3||timeInfo,getMonth()<=5){
        monthset=2;//봄
    }
    else if(timeInfo.getMonth()>=6||timeInfo,getMonth()<=8){
        monthset=3;//여름
    }
    else if(timeInfo.getMonth()>=9||timeInfo,getMonth()<=11){
        monthset=4;//가을
    }
}


//0=일출~아침       
//1=낮~일몰 전
//2=일몰 중~초저녁
//3=저녁~늦은 밤
//4=늦은 밤~새벽

var timeset=0;
function get_Time(data){
    var sunrise=new Date(data.sys.sunrise*1000);//Date()함수에서 Openweather api에서 제공하는 일몰일출시간을 읽을 수 있게끔 하려면 json에서 정보를 가져와서 다음과 같이 바꿔야함
    var sunset=new Date(data.sys.sunset*1000);
    var timeInfo=new Date();
    if(timeInfo.getHours()>=sunrise.getHours()&&timeInfo.getHours()<=11){
        timeset=0;
    }
    else if(timeInfo.getHours()>11&&timeInfo.getHours()<sunset.getHours()){
        timeset=1;
    }
    else if(timeInfo.getHours()>=sunset.getHours()&&timeInfo.getHours()<20){
        timeset=2;
    }
    else if(timeInfo.getHours()>=20&&timeInfo.getHours()<=23){
        timeset=3;
    }   
    else if(timeInfo.getHours()>=0&&timeInfo.getHours()<sunrise.getHours()){
        timeset=4;
    }   
    
}


function onGeoOk(position){
    const lat=position.coords.latitude; //위도
    const lon=position.coords.longitude;//경도

    const url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    console.log(url);
    fetch(url)
        .then((response)=>response.json())
        .then((data)=>{
            const weather= document.querySelector("#weatherBox span:first-child");
            const city= document.querySelector("#weatherBox span:last-child");
            const recommand=document.querySelector("#sentenceBox span")
            const audio=document.getElementById("audio");
            const songname=document.getElementById("songname");
            get_Time(data);

            city.innerText="@"+data.name;
            
            weather.innerText= `${data.weather[0].main} / ${data.main.temp}도`;

            


            if(timeset==0){//아침
               
                if(data.weather[0].main=="Rain"&&data.main.temp<=0){
                    recommand.innerText="오늘은 비가오고 쌀쌀해요.\n 어울리는 노래를 들려드릴게요!";
                }
                else{
                    recommand.innerText="\"아침을 힘차게 시작하도록 도와드릴게요:)\"";
                    audio.innerHTML=`<audio id='audio' src='${musuc_list_for_time[0]}' autoplay loop></audio>`;
                    songname.innerText="[20분]날씨 풀리기만을 기다려온 기분 좋은 봄 팝송 플레이리스트 - 6곡";
                }
            }
            else if(timeset==1){//낮~일몰 전
                if(data.weather[0].main=="Rain"&&data.main.temp<=0){
                    recommand.innerText="오늘은 비가오고 쌀쌀해요.\n 어울리는 노래를 들려드릴게요!";
                }
                else{
                    recommand.innerText="\"오늘도 기분 좋은 하루를 보내길.\"";
                    audio.innerHTML=`<audio id='audio' src='${musuc_list_for_time[1]}' autoplay loop></audio>`;
                    songname.innerText="Zeauxi - July on Film";
                }
            }
            else if(timeset==2){
                if(data.weather[0].main=="Rain"&&data.main.temp<=0){
                    recommand.innerText="오늘은 비가오고 쌀쌀해요.\n 어울리는 노래를 들려드릴게요!";
                }
                else{
                    recommand.innerText="\"오늘 하루도 정말 수고 많았어요:)\"";
                    audio.innerHTML=`<audio id='audio' src='${musuc_list_for_time[2]}' autoplay loop></audio>`;
                    songname.innerText="Cigarettes After Sex - Sunsetz";
                }
            }
            else if(timeset==3){
                if(data.weather[0].main=="Rain"&&data.main.temp<=0){
                    recommand.innerText="오늘은 비가오고 쌀쌀해요.\n 어울리는 노래를 들려드릴게요!";
                }
                else{
                    recommand.innerText="\"부디 편안한 밤을 보내면 좋겠어요.\"";
                    audio.innerHTML=`<audio id='audio' src='${musuc_list_for_time[3]}' autoplay loop></audio>`;
                    songname.innerText="Jeremy Zucker & Chelsea Cutler - This Is How You Fall In Love";
                }
            }
            else if(timeset==4){
                if(data.weather[0].main=="Rain"&&data.main.temp<=0){
                    recommand.innerText="오늘은 비가오고 쌀쌀해요.\n 어울리는 노래를 들려드릴게요!";
                }
                else{
                    recommand.innerText="\"기나긴 이 밤, 아무런 걱정 말아요 그대.\"";
                    audio.innerHTML=`<audio id='audio' src='${musuc_list_for_time[4]}' autoplay loop></audio>`;
                    songname.innerText="Sydney Rose - Turning Page";
                }
            }
        });


}
function onGeoError(){
    alert("위치를 확인할 수 없어요. 날씨를 알려드리긴 어려울 듯 해요!")
}




navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);
