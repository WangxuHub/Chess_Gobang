/**
 * Created by Administrator on 2016/4/2.
 */

(function(){
    function Chess(){
        var me=true;
        var over=false;
        var chessBoard=new Array();
        for(var i=0;i<15;i++)
        {
            chessBoard[i]=new Array();
            for(var j=0;j<15;j++){
                chessBoard[i][j]=0;
            }
        }
        var chess=document.getElementById('chess');
        var context=chess.getContext('2d');
        context.strokeStyle='#BFBFBF';

        var chessSetting=this.chessSetting={
            startX:15,startY:15,width:30,endX:435,endY:435,bgImage:'Resource/Chess/chessBg.png',width:30
        };

        this.drawLogo=function(){
            var logo=new Image();
            logo.src= this.chessSetting.bgImage;
            logo.onload= function () {

                context.drawImage(logo,0,0,450,450);
                drawChessBoard();
            }
        };
        var drawChessBoard= this.drawChessBoard=function(){


            for(var i=0;i<15;i++){
                //画列
                context.moveTo(chessSetting.startX+i*chessSetting.width,chessSetting.startY);
                context.lineTo(chessSetting.startX+i*chessSetting.width,chessSetting.endY);

                //画行
               context.moveTo(chessSetting.startX,chessSetting.startY+i*chessSetting.width);
               context.lineTo(chessSetting.endX,chessSetting.startY+i*chessSetting.width);

            }
            context.stroke();

        };

        var oneStep=this.oneStep=function(i,j,me){
            context.beginPath();
            context.arc(chessSetting.startX+i*chessSetting.width,chessSetting.startY+j*chessSetting.width,chessSetting.width/2,0,2*Math.PI);
            context.closePath();

            var gradient=context.createRadialGradient(
                chessSetting.startX+i*chessSetting.width,chessSetting.startY+j*chessSetting.width,chessSetting.width/2,
                chessSetting.startX+i*chessSetting.width,chessSetting.startY+j*chessSetting.width,2);
            if(me) {
                gradient.addColorStop(0, '#0A0A0A');
                gradient.addColorStop(1, '#636766');
            }
            else{
                gradient.addColorStop(0, '#D1D1D1');
                gradient.addColorStop(1, '#F9F9F9');
            }
            context.fillStyle=gradient;
            context.fill();

        };

        var computerAI=function(){
            var myScore=new Array();
            var computerScore=new Array();
            var max=0;
            var u= 0,v=0;//得分最高点的坐标值
            for(var i=0;i<15;i++)
            {
                myScore[i]=[];
                computerScore[i]=[];
                for(var j=0;j<15;j++)
                {
                    myScore[i][j]=0;
                    computerScore[i][j]=0;
                }
            }

            for(var i=0;i<15;i++){
                for(var j=0;j<15;j++){
                    if(chessBoard[i][j]==0){
                        for(var k=0;k<count;k++){
                            if(wins[i][j][k]){
                                switch (myWin[k]){
                                    case 1:
                                        myScore[i][j]+=200;
                                        break;
                                    case 2:
                                        myScore[i][j]+=400;
                                        break;
                                    case 3:
                                        myScore[i][j]+=2000;
                                        break;
                                    case 4:
                                        myScore[i][j]+=10000;
                                        break;

                                }
                                switch (computerWin[k]){
                                    case 1:
                                        computerScore[i][j]+=220;
                                        break;
                                    case 2:
                                        computerScore[i][j]+=420;
                                        break;
                                    case 3:
                                        computerScore[i][j]+=2100;
                                        break;
                                    case 4:
                                        computerScore[i][j]+=20000;
                                        break;

                                }
                            }
                        }
                        if(myScore[i][j]>max) {
                            max=myScore[i][j];
                            u=i;
                            v=j;
                        }
                        else if(myScore[i][j]==max){
                            if(computerScore[i][j]>computerScore[u][v]){
                                u=i;
                                v=j;
                            }
                        }

                        if(computerScore[i][j]>max){
                            max=computerScore[i][j];
                            u=i;
                            v=j;
                        }
                        else if(computerScore[i][j]==max)
                        {
                            if(myScore[i][j]>myScore[u][v])
                            {
                                u=i;
                                v=j;
                            }
                        }
                    }
                }
            }
            oneStep(u,v,false);
            chessBoard[u][v]=2;
            for(var k=0;k<count;k++)
            {
                if(wins[u][v][k])
                {
                    computerWin[k]++;
                    myWin[k]=6;
                    if(computerWin[k]==5)
                    {
                        alert("计算机赢了！！");
                        over=true;
                    }
                }
            }

            if(!over)
            {
                me=!me;
               // computerAI():
            }
        }
        chess.onclick=function(e){
            if(over ||!me) return false;
            var x= e.offsetX;
            var y= e.offsetY;
            var i=Math.floor(x/chessSetting.width);
            var j=Math.floor(y/chessSetting.width);
            if(chessBoard[i][j]!=0)
            {
                return false;
            }

            chessBoard[i][j]=1;

            oneStep(i,j,me);

            for(var k=0;k<count;k++)
            {
                if(wins[i][j][k])
                {
                    myWin[k]++;
                    computerWin[k]=6;
                    if(myWin[k]==5)
                    {
                        alert("你赢了！！");
                        over=true;
                    }
                }
            }

            if(!over)
            {
                me=!me;
                computerAI();
            }

        };

        //==========UI end============================================================================================
        //==========AI begin============================================================================================

        //赢法数组
        var wins=new Array();
        for(var i=0;i<15;i++)
        {
            wins[i]=new Array();
            for(var j=0;j<15;j++) {
                wins[i][j]=new Array();
            }
        }

        var count=0;

        for(var i=0;i<15;i++)
        {
            for(var j=0;j<11;j++) {
                for(var k=0;k<5;k++){
                    wins[i][j+k][count]=true;
                }
                count++;
            }
        }


        for(var i=0;i<11;i++)
        {
            for(var j=0;j<15;j++) {
                for(var k=0;k<5;k++){
                    wins[i+k][j][count]=true;
                }
                count++;
            }
        }


        for(var i=0;i<11;i++)
        {
            for(var j=0;j<11;j++) {
                for(var k=0;k<5;k++){
                    wins[i+k][j+k][count]=true;
                }
                count++;
            }
        }

        for(var i=0;i<11;i++)
        {
            for(var j=14;j>3;j--) {
                for(var k=0;k<5;k++){
                    wins[i+k][j-k][count]=true;
                }
                count++;
            }
        }

        //赢法统计数组
        var myWin=new Array();
        var computerWin=new Array();

        for(var i=0;i<count;i++)
        {
            myWin[i]=0;
            computerWin[i]=0;
        }
    }


    var chess=new Chess();
    chess.drawLogo();










})();