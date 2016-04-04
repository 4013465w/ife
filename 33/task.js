$=function (el) {
	return document.querySelector(el);
}
var x=5,y=5,status=0;
var tab =$('table').childNodes.item(1);
function getNode(x,y) {
	if (x<=0||y<=0||x>10||y>10) {
		alert('撞墙啦');
		return ;
	}
return tab.childNodes.item(y*2).childNodes.item(x*2+1);
}
function getClass() {
	if (status == 0) {
		return 'top';
	}else if (status == 1) {
		return 'right';
	}else if (status == 2) {
		return 'bottom';
	}else if (status == 3) {
		return 'left';
	}else{
		status = 0;
		getClass();
	}
}
function render() {
	var className = getClass();
	var node = getNode(x,y);
	if (node) {
		node.innerHTML="<div></div>";
		node.className="active "+className;
	}
}
function rmrender() {
	var node = getNode(x,y);
	if (node) {
		node.innerHTML = '';
		node.className = "";
	}
}
function check(x) {
	if (x <= 0) {
		x = 1;
	}else if(x > 10){
		x = 10;
	}
	return x;
}
render();
$('button').onclick = function () {
	var input = $('input').value;
	if (input === 'GO') {
		rmrender();
		if (status == 0) {
			y--;
		}else if (status == 1) {
			x++;
		}else if(status == 2){
			y++;
		}else if(status == 3){
			x--;
		}
		y = check(y);
		x = check(x);
		render();
		return;
	}else if (input == 'TUN LEF') {
		status--;
	}else if (input == 'TUN RIG') {
		status++;
	}else if (input == 'TUN BAC') {		
		status= parseInt(status)+2;
	}

	status = (parseInt(status)+4) % 4;console.log(status)
	render();
}