"use strict";

/*
* 드래그 앤 드롭 가능한 환경 만들고
*   - 마우스 캐치를 먼저
* 드래그 시작
*   - 마우스 클릭하면 이벤트 시작
*   - 떼기전에 마우스를 옴기면 오브젝트가 따라붙는다
*   - 떼면 사라진다
*   - 끝으로 들어가 떼면 이벤트2
* 드래그 끝을 정한다
*   - 드래그가 시작되면 드래그엔드도 대비? 활성?
*   - 드래그A가 영역내로 와서 떨어지면 이벤트 2
* */

function Dragenv(a,b){
    this._init(a,b);
    this.mouse();



}

Dragenv.prototype = {
    _init:function(val1, val2) {
        this.dragStartItem = document.getElementsByClassName(val1);
        this.dragEndItem = document.getElementsByClassName(val2);
    },
    state:function(arg){
        var state1 = document.getElementById('state');
        state1.innerHTML = arg;
    },
    mouse:function(){
        var _self = this;

        var mouseDown = false;
        var mouseMove = false;
        var mouseGrab = false;
        var mouseHover = false;

        document.addEventListener('mousemove',function(e){
            mouseMove = true;
            //_self.state(mouseMove);
            if (mouseDown){
                mouseGrab = true;

                var a  = e.clientY - (_self.dragStartItem[0].clientHeight/2) + "px";
                var b  = e.clientX - (_self.dragStartItem[0].clientWidth/2) + "px";
                var c = e.clientY;
                var d = e.clientX;
                _self.objectMove(a,b);
                _self.dropCheker(c,d);
            }
            //if (_self.oDouble) {
            //    _self.objectMove(e);
            //}
        });
        this.dragStartItem[0].addEventListener('mousedown', function(e){
            mouseDown = true;
            if(mouseMove) {
                mouseGrab = true;
                _self.objectDouble();
            }

        });
        document.addEventListener('mouseup', function(e){
            var c = e.clientY;
            var d = e.clientX;

            if (mouseGrab && !mouseHover){
                _self.oDouble.parentNode.removeChild(_self.oDouble);
            }

            if(mouseGrab && _self.dropCheker(c,d)){
                alert('drop');
            }
            mouseDown = false;
            mouseGrab = false;
            //_self.state(mouseGrab);



        });

        //this.dragEndItem[0].addEventListener('mouseover',function(e){
        //
        //    if (e.which == 1){
        //        console.log(e.clientX, e.clientY);
        //   }
        //    console.log(this.offsetTop,this.offsetLeft);
        //
        //    //console.log('올라왔어');
        //    if (mouseDown){
        //       mouseHover = true;
        //       console.log('grab > over');
        //   }
        //
        //});

    },
    mouseNow:function(){
        document.addEventListener('mousemove',function(e){
            console.log(e.clientX, e.clientY);
        });
    },


    objectDouble:function(){
        //var oOriginal = this.dragStartItem[0];
        this.oDouble = this.dragStartItem[0].cloneNode(true);
        //var top = a - (this.dragStartItem[0].clientHeight/2) + "px";
        //var left  = b - (this.dragStartItem[0].clientWidth/2) + "px";
        //console.log(a,top,b,left, this.dragStartItem[0], this.dragStartItem[0].clientHeight/2);

        //var style = "position:absolute; top:"+a+"; left:"+b+";";
        this.oDouble.setAttribute('style','display:none;');
        this.dragStartItem[0].parentNode.appendChild(this.oDouble);
    },
    objectMove:function(a,b){
        //var top = e.clientY - (this.oDouble.clientHeight/2) + "px";
        //var left = e.clientX - (this.oDouble.clientWidth/2) + "px";
        var style = "position:absolute; top:"+a+"; left:"+b+"; opacity:0.5; cursor:pointer;";
        //console.log(style);
        //console.log(this.oDouble);
        this.oDouble.setAttribute('style',style);
        //this.mouseNow();

    },
    dropCheker:function(c,d){
        if (this.dragEndItem[0].offsetTop< c && c < this.dragEndItem[0].offsetTop+this.dragEndItem[0].clientHeight) {
            if (this.dragEndItem[0].offsetLeft< d && d < this.dragEndItem[0].offsetLeft+this.dragEndItem[0].clientWidth) {
                return true;
            }
        }
    },
    dropACtion:function(){

    },
};


/*
var dragstart = function (){
    console.log('start');
};

var dragend = function (){
    console.log('end');
};*/

var dragtest = new Dragenv('obj1','obj2');



/*
var stage = document.querySelector('.stage');
var object1 = document.querySelector('.obj1');
var object2 = document.querySelector('.obj2');
var offbox = null;
var elementDragged = null;

object1.addEventListener('dragstart',function(e){
    console.log('drag start');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text', this.innerHTML);
    console.log(this.innerHTML);
    elementDragged = this;
});
object1.addEventListener('drag', function(e) {
    //this.setAttribute('class','ing');
});

object2.addEventListener('hover', function() {
    console.log('hover');
});
object2.addEventListener('drop', function(e) {
    this.innerHTML = this.innerHTML + e.dataTransfer.getData('text');
});
object2.addEventListener('dragenter', function(e) {
    console.log('enter');
    elementDragged = null;

    console.log(e.dataTransfer.getData('text'));
    this.setAttribute('class',this.getAttribute('class') + ' over');
    console.log(this.getAttribute('class'));
});
object2.addEventListener('dragleave', function(e) {
    console.log('enterleave');

    this.setAttribute('class','obj2');
    console.log(this.getAttribute('class'));
});



object2.addEventListener('dragover', function(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    e.dataTransfer.dropEffect = 'move';

    return false;
});*/

/*

document.addEventListener('drag',function(event){
    console.log('drag');
});
document.addEventListener('dragover',function(event){
    console.log('dragover');
});
document.addEventListener('drop',function(event){
    console.log('drop');
});

*/
