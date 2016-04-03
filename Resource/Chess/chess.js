/**
 * Created by Administrator on 2016/4/2.
 */

(function(){
    function Chess(){
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
    }


    var chess=new Chess();
    chess.drawLogo();









})();