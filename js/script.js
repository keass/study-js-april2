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
    this.mouse(a,b);
}

function MultiDragenv(a,b){
    var testa = document.getElementsByClassName(a);
    var testb = document.getElementsByClassName(b);
    if (testa[1] || testb[1]){
        for(var i =0; i<testa.length; i++){
            for (var j =0; j<testb.length; j++){
                new Dragenv(testa[i],testb[j]);
                //console.log(testa[i],testb[j]);
            }
        }
    } else {
        new Dragenv(testa[0],testb[0]);
    }
}

Dragenv.prototype = {
    //itemStartArr:[],
    //itemEndArr:[],
    //newItemArr:[],
    //_multi_init:function(val1,val2){
    //    this.itemStartArr = document.getElementsByClassName(val1);
    //    this.itemEndArr = document.getElementsByClassName(val2);
    //    this.multiLancher();
    //},
    //multiLancher:function(){
    //    var allArr = [];
    //    for(var i=0; i<this.itemStartArr.length; i++){
    //        for(var j=0; j<this.itemEndArr.length; j++) {
    //            var a = this.itemStartArr[i];
    //            var b = this.itemEndArr[j];
    //            //console.log(a,b);
    //            //console.log(new this._init(a,b));
    //            this.mouse(a,b);
    //
    //            //this.newItemArr = new this._init(this.itemStartArr[i], this.itemEndArr[j]);
    //            //console.log(this.newItemArr);
    //        }
    //    }
    //
    //},
    //multichecker:function (a,b){
    //    var testa = document.getElementsByClassName(a);
    //    var testb = document.getElementsByClassName(b);
    //    if (testa[1] || testb[1]){
    //        console.log(testa.length);
    //        console.log(testb.length);
    //    }
    //},
    _init:function(val1, val2) {
        this.dragStartItem = val1;
        this.dragEndItem = val2;


        //console.log(this.dragItem, this.dragStartItem);
        //console.log(this.dragStartItem);
        //console.log(this.dragStartItem.length);
    },
    state:function(arg){
        var state1 = document.getElementById('state');
        state1.innerHTML = arg;
    },
    //objGrab:this.dragStartItem[0],
    //isMultiObject:function(){
    //    if(this.dragStartItem[1]){
    //        return true;
    //    }
    //},
    mouse:function(a,b){
        console.log(a,b);
        var _self = this,
            mouseDown = false,
            mouseMove = false,
            mouseGrab = false,
            mouseHover = false;

        document.addEventListener('mousemove',function(e){
            mouseMove = true;
            if (mouseDown){
                mouseGrab = true;

                var grabMoveY  = e.pageY - (a.clientHeight/2) + "px";
                var grabMoveX  = e.pageX - (a.clientWidth/2) + "px";
                //console.log(a);

                var mouseNowY = e.pageY;
                var mouseNowX = e.pageX;


                _self.objectMove(grabMoveY,grabMoveX);
                _self.dropCheker(grabMoveY,grabMoveX,mouseNowY,mouseNowX);
                console.log(grabMoveY,mouseNowY);
            }
        });
        //document.addEventListener('mousedown',function(e){
        //    //console.log(e, "1");
        //    for (var i = 0; i <_self.dragStartItem.length; i++){
        //        console.log(e, _self.dragStratItem[i], "2");
        //        _self.dragStartItem[i].addEventListener('mousedown',function(e){//console.log('hi', this)
        //         });
        //    }
        //});

        a.addEventListener('mousedown', function(e){
            //console.log(this);
            mouseDown = true;

            if(mouseMove) {
                mouseGrab = true;
                _self.objectDouble(this);
                //console.log(this);
            }

        });
        document.addEventListener('mouseup', function(e){
            var c = e.clientY,
                d = e.clientX;

            if (mouseGrab && !mouseHover){
                _self.oDouble.parentNode.removeChild(_self.oDouble);
            }
            if(mouseGrab && _self.dropCheker(a,b,c,d)){
                console.log(a.getAttribute('class'));
                _self.dropACtion(a.getAttribute('class'));
            }
            mouseDown = false;
            mouseGrab = false;
        });
    },
    // 드래그 시작하면 오브젝트 복제
    objectDouble:function(a){
        this.oDouble = a.cloneNode(true);
        //console.log(this.oDouble);
        this.oDouble.setAttribute('style','display:none;');
        a.parentNode.appendChild(this.oDouble);
    },
    // 드래그 포지션 top left 수치로 복제 오브젝트 마우스에 붙이기
    objectMove:function(ina,inb){
        var style = "position:absolute; top:"+ina+"; left:"+inb+"; opacity:0.5; margin:0; cursor:pointer;";
        this.oDouble.setAttribute('style',style);
        //console.log(style);
    },
    // 드랍 영역 들어왔는지 체크
    dropCheker:function(grabMoveY,grabMoveX,mouseNowY,mouseNowX){
        if (grabMoveX.offsetLeft< mouseNowX && mouseNowX < grabMoveX.offsetLeft+grabMoveX.clientWidth) {
            if (grabMoveY.offsetTop< mouseNowY && mouseNowY < grabMoveY.offsetTop+grabMoveY.clientHeight) {
                return true;
            }
        }
    },
    // 드랍 영역 들어왔고, 마우스를 떼면 작동
    dropACtion:function(data){
        this.state(data);
    },
};

//var dragtest = new Dragenv('obj1','obj2');

var dragtest = new MultiDragenv('obj1','obj2');

//var dragtest2 = new Dragenv('obj1-2','obj2-2');
var dragtest3 = new MultiDragenv('obj1-2','obj2-2');
//var dragtest4 = new MultiDragenv('obj1','obj2');


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
