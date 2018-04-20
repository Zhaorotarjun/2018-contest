//20是格子之间的距离，100是一个小格子的宽度
function getPosTop(i,j) {
    return 20 + i * 120;
}

function getPosLeft(i,j) {
    return 20 + j * 120;
}



//数字方块的背景色
function getNumberBackgroundColor(number) {
    switch (number) {
    case 2:
        return "#e3d9cf";
        break;
    case 4:
        return "#ebdec7";
        break;
    case 8:
        return "#f2b37d";
        break;
    case 16:
        return "#f59563";
        break;
    case 32:
        return "#f68368";
        break;
    case 64:
        return "#f66341";
        break;
    case 128:
        return "#edcf72";
        break;
    case 256:
        return "#edcc61";
        break;
    case 512:
        return "#9c0";
        break;
    case 1024:
        return "#3365a5";
        break;
    case 2048:
        return "#edc22e";
        break;

    }
    return "black";
}
//数字颜色4以上白色
function getNumberColor(number) {
    if (number <= 4){
        return "#776e65";
    }
    return "white";
}
//数字大小改变
function getNumberSize(number) {
    if (number <= 64){
        return "60px";
    }else if(number <= 504)
    {
        return "55px";
    }
    return "50px";
}

function getScore(){
    document.getElementById("score").innerHTML=score;
}

//遍历是否有空格，有flag==false
function nospace(board) {
    for ( var i = 0; i < gNum; i++)
        for ( var j = 0; j < gNum; j++)
            if (board[i][j] == 0)
                return false;


    return true;
}

//实现功能判断
function canMoveLeft( board){
    for(var i = 0;i<gNum;i++)
        for(var j = 0;j<gNum;j++)
            if( board[i][j] !=0 && j != 0)
                if( board[i][j-1] == 0 || board[i][j-1] == board[i][j])
                    return true;
                    
    return false;
}

function canMoveRight( board){
    for(var i = 0;i<gNum;i++)
        for(var j = 0;j<gNum;j++)
            if( board[i][j] !=0 && j != (gNum-1))
                if( board[i][j+1] == 0 || board[i][j+1] == board[i][j])
                    return true;
                    
    return false;
}

function canMoveUp(board){
    for(var i = 0;i<gNum;i++)
        for(var j = 0;j<gNum;j++)
            if( board[i][j] !=0 && i != 0)
                if( board[i-1][j] == 0 || board[i-1][j] == board[i][j])
                    return true;   
    return false;
}

function canMoveDown( board ){
    for(var i = 0;i<gNum;i++)
        for(var j = 0;j<gNum;j++)
            if( board[i][j] !=0 && i != (gNum-1))
                if( board[i+1][j] == 0 || board[i+1][j] == board[i][j])
                    return true;
    return false;
}

//判断水平方向是否有障碍物
function noBlockHorizontal(row, col1, col2, board){
    for(var i = col1 + 1; i<col2; i++)
        if(board[row][i]!=0)
            return false;
    return true;
}

//判断竖直方向是否有障碍物
function noBlockVertical(col, row1, row2, board){
    for(var i = row1 + 1; i<row2; i++)
        if(board[i][col]!=0)
            return false;
    return true;
}
//最后收尾
function nomove(board){
    if(canMoveLeft(board)|| canMoveRight(board)||canMoveUp(board)||canMoveDown(board))
        return false;
    return true;
}