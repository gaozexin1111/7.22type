//点击开始游戏，box消失
var start = document.querySelector(".start");
var box = document.querySelector(".box");
var countBox = document.querySelector(".count-box");
var bg = document.querySelector(".bg");

var live = document.querySelector(".live");
var count = document.querySelector(".count")

var endBox = document.querySelector(".end-box")
var gameCount = document.querySelector(".game-count");
var gameRe = document.querySelector(".game-repeat");
var Return = document.querySelector(".return");


//创建颜色和随机数
var createRandom = function(num){
    if(num){
        return Math.floor(Math.random()*num);
    }else{
        return Math.random();
    }  
}
var createColor = function(){
    return "rgb("+createRandom(255)+","+createRandom(255)+","+createRandom(255)+")"
}


var letters=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
var le_length = letters.length;
var divs = [];    
//屏幕的宽高
domW = document.documentElement.clientWidth;
domH = document.documentElement.clientHeight;
bgLeft = bg.offsetLeft;
bgW = bg.offsetWidth;

function create(num){
    var current = [];
    for(var i=0;i<num;i++){
        current.push(letters[createRandom(le_length)])
    }
    for(var i=0;i<current.length;i++){
        var div = document.createElement("div");
        div.innerHTML = current[i];

        
        div.style.cssText = "position :absolute;left:"+((bgW-10)*createRandom()+bgLeft)+"px;top:"+createRandom(40)+"px;font-size:"+(50+createRandom(30))+"px;color:"+createColor();
        
        document.body.appendChild(div);
        divs.push(div);
    }
}


//点击开始按钮，游戏开始
function gameStart(speed,num){
    if((typeof speed) != "number" || (isNaN(speed))){
        speed=5
    }
    if((typeof num)!= "number" || isNaN(num)){
        num=4
    }

    box.style.display = "none";
    countBox.style.display = "block";
    live.textContent = "live:100"
    count.textContent = "count:0"
    create(num);


    //游戏开始之后 ,取消掉字母，分数加10分，一个字母没有被取消 ，生命值扣10，低于100分游戏结束

    var t = setInterval(function(){
        for(var i=0;i<divs.length;i++){
            divs[i].style.top = divs[i].offsetTop+speed+"px";
            
            //判断是否消失到屏幕下面  //扣分并创造新的
            if(parseInt(divs[i].style.top)>(bg.offsetHeight+bg.offsetTop-divs[i].offsetHeight)){
                divs[i].style.display = "none";    
                var live_count = parseInt(live.textContent.slice(5));
                live.textContent = "live:"+(live_count-10);
                if((live_count-10)<=0){
                    for(var i=0;i<divs.length;i++){
                        divs[i].style.display = "none";
                        document.body.removeChild(divs[i]);
                    }

                    divs=[]
                    //游戏结束
                    var count_count = parseInt(count.textContent.slice(6));
                    gameCount.innerHTML = "分数为:"+count_count; 
                    countBox.style.display = "none";
                    endBox.style.display = "block";

                    clearInterval(t);    
                }else{  
                    create(1)
                }
            }
        }
    },50)


    //判断数字和得分
    document.onkeydown = function(ev){
        var letter = String.fromCharCode(ev.keyCode);
        for(var i=0;i<divs.length;i++){
            if(divs[i].innerHTML==letter){
                document.body.removeChild(divs[i]);
                divs.splice(i,1);
                var count_count = parseInt(count.textContent.slice(6));
                count.textContent = "count:"+(count_count+10);
                create(1);
                break;
            }

            
        }
    }
}


var startTwo = document.querySelector(".start-two");
var diffBtn = document.querySelector(".diffcult");
var lavelBox = document.querySelector(".lavel-box");




//难度选择后，开始界面消失，难度选择界面显示
diffBtn.onclick = function(){
    box.style.display = "none";
    lavelBox.style.display = "block";
}
//初始界面开始游戏
start.onclick = function(){
    var speed=5;
    var num=4;
    gameStart(speed,num);
}
// 选择难度后的开始游戏
startTwo.onclick = function(){
    var num  =  parseInt(document.myform.num.value);
    var speed = parseInt(document.myform.speed.value);
    console.log(num,speed);
    lavelBox.style.display="none";
    gameStart(speed,num);
}
//重新开始

gameRe.onclick = function(){
    endBox.style.display = "none";
    var speed=5;
    var num=4;
    gameStart(speed,num);
}

//返回初始页面
Return.onclick = function(){
    endBox.style.display = "none";
    box.style.display = "block";
}