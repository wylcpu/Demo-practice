window.onload = function () {
	var close = document.getElementById("close");
	var wrapper = document.getElementById("wrapper");
	var conWra = document.getElementById("control_wrapper");
	var conEqual = conWra.getElementsByTagName("div")[2];
	var imgEqual = conEqual.getElementsByTagName("img")[0];
	var imgLeft = conEqual.getElementsByTagName("img")[1];
	var imgRight = conEqual.getElementsByTagName("img")[3];
	var wraBox = wrapper.getElementsByTagName("div");
	var imgBox = wraBox[0].getElementsByTagName("img");
	var lrImg = conWra.getElementsByTagName("div");
	var lImg = lrImg[3].getElementsByTagName("img")[0];
	var rImg = lrImg[4].getElementsByTagName("img")[0];
	var num = lrImg[1].getElementsByTagName("span")[0];
	var bg = document.getElementById("content");
	var k =13, h=1;

	close.onclick = function () {
		wrapper.style.display = "none";
		imgEqual.style.display = "block";
	}
	imgEqual.onclick = function () {
		this.style.display = "none";
		wrapper.style.display = "block";
	}
	for(var i=0;i<imgBox.length;i++) {
		imgBox[i].id = i+1;
		imgBox[i].onclick = function () {
			k = h = parseInt(this.id);
			if(this.id == 1){
				k = 13;
				h= 1;
			}
			if(this.id == 12){
				h = 0;
			}
			lImg.src = "images/" + (k -1) +".jpg";
			rImg.src = "images/" + (h + 1) + ".jpg";	
			num.innerHTML = this.id;
			bg.style.backgroundImage="url(images/" + this.id +".jpg)";
			wrapper.style.display = "none";
			imgEqual.style.display = "block";

		}
	}
	lImg.onclick = imgLeft.onclick = function () {
		bg.style.backgroundImage="url(" + lImg.src+")";
		k--;
		h--;

		if(k == 11){
			h = 11;
		}
		if(k == 1){
			k =13;
		}
		num.innerHTML = h+1;
		lImg.src = "images/" + (k -1) +".jpg";
		rImg.src = "images/" + (h + 1) + ".jpg";
		wrapper.style.display = "none";
		imgEqual.style.display = "block";


	}
	rImg.onclick = imgRight.onclick =function () {
		bg.style.backgroundImage="url(" + rImg.src +")";
		k++;
		h++;
		num.innerHTML = h;
		if(h == 12) {
			h = 0;
		}
		if(h == 2){
			k = 2;
		}
		lImg.src = "images/" + (k -1) +".jpg";
		rImg.src = "images/" + (h + 1) + ".jpg";
		wrapper.style.display = "none";
		imgEqual.style.display = "block";

	}

}