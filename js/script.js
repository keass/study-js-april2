"use strict";



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
});

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
