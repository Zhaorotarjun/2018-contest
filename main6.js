var board = new Array(); //存储游戏的数据
var added = new Array();
var score = 0;    //得分
var top = 240;
var gNum = 6;
var maxScore = 0;


$(document).ready(function(e){
    newgame();
});
function getValue()
{
    gNum=document.getElementById("btn").value;

}

function newgame(){
    //初始化棋盘格
    init();
    addiv();
    //在随机两个各自声称的数字
    generateOneNumber();
    generateOneNumber();
}

//生成棋盘
function addiv() {
    for(var i = 0;i<gNum;i++){
        for(var j = 0;j<gNum;j++){
            $("#grid-container").append('<div class="grid-cell" id="grid-cell-'+i+'-'+j+'"></div>');
            var gridCell = $("#grid-cell-"+i+"-"+j);
            gridCell.css("top",getPosTop(i,j));
            gridCell.css("left",getPosLeft(i,j));

        }
    }
    var  gridContainer = $("#grid-container");
    gridContainer.css("width",(gNum*100+(gNum-1)*20+50)+'px');
    gridContainer.css("height",(gNum*100+(gNum-1)*20+50)+'px');
}


function init(){
    score=0;
    document.getElementById("score").innerHTML=score;
    $("#gameover").css('display','none');

    //初始化board数组
    for(var i = 0; i<gNum;i++){
        board[i] = new Array();
        for(var j = 0;j<gNum;j++){
            board[i][j] = 0;
        }
    }
    
    for(var i = 0; i<gNum;i++){//初始化判定合并的数组
        added[i] = new Array();
        for(var j = 0;j<gNum;j++){
            added[i][j] = 0;
        }
    }
    //更新
    updateBoardView();
}
//更新
function updateBoardView(){
    $(".number-cell").remove();
    //遍历
    for(var i = 0;i<gNum;i++){
        for ( var j = 0; j < gNum; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var theNumberCell = $('#number-cell-'+i+'-'+j);
            if(board[i][j] == 0){
                theNumberCell.css({
                    "width":"0px",
                    "height":"0px",
                    "top":getPosTop(i,j)+50,/*这里是为了把它放中间，动画才好看*/
                    "left":getPosLeft(i,j)+50
                });
            }else{
                theNumberCell.css({
                    "width":100+'px',
                    "height":100+'px',
                    "top":getPosTop(i,j),
                    "left":getPosLeft(i,j),
                    "background-color":getNumberBackgroundColor(board[i][j]),
                    "color":getNumberColor(board[i][j]),
                    "font-size":getNumberSize(board[i][j]),
                });
                theNumberCell.text(board[i][j]);
            }

            }
        }


}


function generateOneNumber(){//生成随机的格子
    if (nospace(board))
    {
        return false;

    }
    //随机一个位置
    var randx = parseInt(Math.floor(Math.random()*4));
    var randy = parseInt(Math.floor(Math.random()*4));
    while(true){
        if (board[randx][randy] == 0) 
            break;
        //找另一个位置
        randx = parseInt(Math.floor(Math.random()*4));
        randy = parseInt(Math.floor(Math.random()*4));
    }
    //随机一个数字 概率1：1
    var randNumber = Math.random()<0.5 ? 2 : 4;
    //在随机位置显示随机数字
    board[randx][randy] = randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    return true;
}

//keycode 判断按键 wasd 上下左右
$(document).keydown(function(event){
    switch (event.keyCode) {
        case 37://left
            if(moveLeft()){
                getScore();
                setTimeout("generateOneNumber()",280);
                // generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 65://A
            if(moveLeft()){
                getScore();
                setTimeout("generateOneNumber()",280);
                //generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;

        case 38://up
            if(moveUp()){
                getScore();
                setTimeout("generateOneNumber()",280);
                // generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 87://W
            if(moveUp()){
                getScore();
                setTimeout("generateOneNumber()",280);
                //generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 39://right
            if(moveRight()){
                getScore();
                setTimeout("generateOneNumber()",280);
                //generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 68://D
            if(moveRight()){
                getScore();
                setTimeout("generateOneNumber()",280);
                //generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 40://down
            if(moveDown()){
                getScore();
                setTimeout("generateOneNumber()",280);
                //generateOneNumber();
                setTimeout("isgameover()",300);
            }
            break;
        case 83://S
            if(moveDown()){
                getScore();
                setTimeout("generateOneNumber()",280);
                setTimeout("isgameover()",300);
            }
            break;

    }
});

function isgameover(){
    if(nospace(board)&&nomove(board))
        $('#gameOverModal').modal('show');
}


function isaddedArray(){
    //将判断能否合并的数组值置为0
    for(var i = 0;i<gNum;i++){
        for(var j = 0;j<gNum;j++){
            added[i][j] = 0;
        }
   }
}

function moveLeft(){
    //判断格子是否能够向左移动
    if( !canMoveLeft(board))
        return false;
    
    isaddedArray();

    for(var i = 0;i<gNum;i++)
        for(var j = 1;j<gNum;j++){//第二列
            if(board[i][j] !=0){
                //(i,j)左侧的元素
                for(var k = 0;k<j;k++){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , k, j, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                        //
                        if(added[i][k]!=0){
                                board[i][k+1] = board[i][j];
                                board[i][j] = 0;
                        }
                        else{
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score +=board[i][k];
                            maxScore = maxScore < score ? score : maxScore;
                            document.getElementById("maxScore").innerHTML=maxScore ;

                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveRight(){
    //判断格子是否能够向右移动
    if( !canMoveRight(board))
        return false;
    
    isaddedArray();
    for(var i = 0;i<gNum;i++)
        for(var j = gNum-2;j>=0;j--){//倒数第二列
            if(board[i][j] !=0){
                //(i,j)右侧的元素
                for(var k = gNum-1;k>j;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[i][k] == 0 && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i , j, k, board)){
                        //move
                        showMoveAnimation(i, j,i,k);
                        //add
                         if(added[i][k]!=0){
                                board[i][k-1] = board[i][j];
                                board[i][j] = 0;
                        }
                        else{
                            board[i][k] += board[i][j];
                            board[i][j] = 0;
                            added[i][k] = 1;
                            score +=board[i][k];
                            maxScore = maxScore < score ? score : maxScore;
                            document.getElementById("maxScore").innerHTML=maxScore ;

                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveUp(){
    //判断格子是否能够向上移动
    if( !canMoveUp(board))
        return false;
    
    isaddedArray();
    //真正的moveUp函数//标准
    for(var j = 0;j<gNum;j++)
        for(var i = 1;i<gNum;i++){//第2行
            if(board[i][j] !=0){
                //(i,j)上面的元素
                for(var k = 0;k<i;k++){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j , k, i, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , k, i, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        if(added[k][j]!=0){
                            board[k+1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else{
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score +=board[k][j];
                            maxScore = maxScore < score ? score : maxScore;
                            document.getElementById("maxScore").innerHTML=maxScore ;

                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

function moveDown(){
    //判断格子是否能够向下移动
    if( !canMoveDown(board))
        return false;
    isaddedArray();
    for(var j = 0;j<gNum;j++)
        for(var i = gNum-2;i>=0;i--){
            if(board[i][j] !=0){
                //(i,j)上面的元素
                for(var k = gNum-1;k>i;k--){
                    //落脚位置的是否为空 && 中间没有障碍物
                    if(board[k][j] == 0 && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    //落脚位置的数字和本来的数字相等 && 中间没有障碍物
                    else if(board[k][j] == board[i][j] && noBlockVertical(j , i, k, board)){
                        //move
                        showMoveAnimation(i, j,k,j);
                        //add
                        if(added[k][j]!=0){
                            board[k-1][j] = board[i][j];
                            board[i][j] = 0;
                        }
                        else{
                            board[k][j] += board[i][j];
                            board[i][j] = 0;
                            added[k][j] = 1;
                            score +=board[k][j];
                            maxScore = maxScore < score ? score : maxScore;
                            document.getElementById("maxScore").innerHTML=maxScore ;

                        }
                        continue;
                    }
                }
            }
        }
    setTimeout("updateBoardView()",200);
    return true;
}

