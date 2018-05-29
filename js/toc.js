/**
 * 目录类
 */
class Toc{
	/**
	 * 初始化
	 * @param  {object} options {
	 *   wrapperId: 需要生成toc目录的容器id
	 *   insertId: 位置id，toc目录面板将插入在此id代表的元素的前面
	 *   showSerial： 是否显示目录序号
	 * }
	 */
	constructor(options) {
		if(options.wrapperId){
			this.container = document.getElementById(options.wrapperId);
		}else{
			this.container = document.body;
		}
		if(options.insertId){
			this.insertDom = document.getElementById(options.insertId);
		}else if(this.container!=document.body){
			this.insertDom = this.container;
		}else{
			this.insertDom = this.container.firstElementChild;
		}
		this.showSerial = options.showSerial || false;
		this.childH = []; //初始标题数组
	}
	/**
	 * 获取容器中所有的标题
	 */
	getAllH(){
		let child = this.container.firstElementChild;
		while(child){
			if(child.nodeName.match(/H[1-7]/)){
				child.order = parseInt(child.nodeName[1]); //标题大小序号[1,2,3,4,5,6,7]
				this.childH.push(child);
			}
			child = child.nextElementSibling;
		}
	}
	/**
	 * 创建标题树
	 * @param  {object} context [标题树数组]
	 * @param  {number} num     [下标]
	 */
	createItemChain(context,num){
		
		_createChildH(context,num)

		function _createChildH(context,num){
			if(!context || !context[num]){
				return;
			}
			let first = context[num];
			first.childH = [];//子标题
			//创建子标题
			for(let i=num+1; i < context.length; i++){
				if(context[i].order > first.order){
					let tmp = context.splice(i,1);
					first.childH = first.childH.concat(tmp);
					i--;
				}else{
					break;
				}
			}

			//递归创建子标题树
			if(first.childH.length){
				_createChildH(first.childH,0);
			}

			//检查first的下一个同级标题是否创建过子标题树，没有则创建
			for(let i=num+1; i < context.length; i++){
				if(!context[i].childH){
					_createChildH(context,i);
				}
			}
		}
	}
	/**
	 * 生成toc目录dom
	 */
	createToc(){
		let self = this;
		this.getAllH();
		this.createItemChain(this.childH,0);

		if(!this.childH.length){
			return;
		}
		
		let tocWrap = document.createElement('div');
		tocWrap.setAttribute("class", "toc_wrap");
		tocWrap.setAttribute("id", "toc_wrap");

		tocWrap.innerHTML = '<div class="toc_root" id="toc"><a class="hide_toc_btn">[hide]</a></div><a class="show_toc_btn">[显示目录]</a>';

		this.insertDom.parentNode.insertBefore(tocWrap,this.insertDom);

		tocWrap.getElementsByClassName('hide_toc_btn')[0].addEventListener('click',function(){
			tocWrap.className = tocWrap.className+' hide';
		});

		tocWrap.getElementsByClassName('show_toc_btn')[0].addEventListener('click',function(){
			tocWrap.className = 'toc_wrap';
		});

		_createToc(document.getElementById('toc'),this.childH,1,'');
		/**
		 * 递推创建dom
		 * @param  {DOM} dom     [父元素]
		 * @param  {array} context [目录树]
		 * @param  {number} level   [层级]
		 * @param  {string} serial  [序号]
		 */
		function _createToc(dom,context,level,serial){
			let num = 1;
			for(let i=0; i<context.length; i++){
				let div = document.createElement('div');
				div.setAttribute("class", "toc_lvl toc_lvl_"+level);
				let _serial = '',serialStr = '';
				if(serial){
					_serial = serial + '.' + num
				}else{
					_serial = num
				}
				if(self.showSerial){
					serialStr = _serial;
				}
				div.innerHTML = '<a href="#toc_'+_serial+'"">' + _serial + '&nbsp;' + context[i].innerHTML + '</a>';
				context[i].setAttribute('id','toc_'+_serial); //给标题元素设置id，以便使用target定位到该元素
				dom.appendChild(div);

				if(context[i].childH && context[i].childH.length){ //递归创建目录dom
					_createToc(div,context[i].childH,level+1,_serial);
				}

				num++; //标题题序号递增
			}
		}
	}
}