"use strict";

/*
* 드래그 앤 드롭 가능한 환경 만들고
*   - //마우스 캐치를 먼저
* 드래그 시작
*   - //마우스 클릭하면 이벤트 시작
*   - //떼기전에 마우스를 옴기면 오브젝트가 따라붙는다
*   - //떼면 사라진다
*   - 끝으로 들어가 떼면 이벤트2
* 드래그 끝을 정한다ㄴ
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

        this.dragItem = [];
        for (var i=0; i< this.dragStartItem.length; i++){
            this.dragItem[i] = this.dragStartItem[i];
        }
        console.log(this.dragItem);
        //console.log(this.dragStartItem);
        //console.log(this.dragStartItem.length);
    },
    state:function(arg){
        var state1 = document.getElementById('state');
        state1.innerHTML = arg;
    },
    isMultiObject:function(){
        if(this.dragStartItem[1]){
            return true;
        }
    },
    mouse:function(){
        var _self = this,
            mouseDown = false,
            mouseMove = false,
            mouseGrab = false,
            mouseHover = false;

        document.addEventListener('mousemove',function(e){
            mouseMove = true;
            if (mouseDown){
                mouseGrab = true;

                var a  = e.clientY - (_self.dragStartItem[0].clientHeight/2) + "px";
                var b  = e.clientX - (_self.dragStartItem[0].clientWidth/2) + "px";

                var c = e.clientY;
                var d = e.clientX;

                _self.objectMove(a,b);
                _self.dropCheker(c,d);
            }
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
                _self.dropACtion();
            }

            mouseDown = false;
            mouseGrab = false;

        });
    },
    // 드래그 시작하면 오브젝트 복제
    objectDouble:function(){
        this.oDouble = this.dragStartItem[0].cloneNode(true);
        this.oDouble.setAttribute('style','display:none;');
        this.dragStartItem[0].parentNode.appendChild(this.oDouble);
    },
    // 드래그 포지션 top left 수치로 복제 오브젝트 마우스에 붙이기
    objectMove:function(a,b){
        var style = "position:absolute; top:"+a+"; left:"+b+"; opacity:0.5; cursor:pointer;";
        this.oDouble.setAttribute('style',style);
    },
    // 드랍 영역 들어왔는지 체크
    dropCheker:function(c,d){
        if (this.dragEndItem[0].offsetTop< c && c < this.dragEndItem[0].offsetTop+this.dragEndItem[0].clientHeight) {
            if (this.dragEndItem[0].offsetLeft< d && d < this.dragEndItem[0].offsetLeft+this.dragEndItem[0].clientWidth) {
                return true;
            }
        }
    },
    // 드랍 영역 들어왔고, 마우스를 떼면 작동
    dropACtion:function(){
        this.state('drop it');
    },
};

var dragtest = new Dragenv('obj1','obj2');
var dragtest2 = new Dragenv('obj1-2','obj2-2');


/*
function test(a,b){
    var dragStartItem = document.getElementsByClassName(a);
    var dragItem = [];

        for (var i=0; i< dragStartItem.length; i++){
            dragItem[i] = dragStartItem[i];
        }
        console.log(dragItem);
}
test('obj1','obj2');
test('obj1-2','obj2-2');
*/
