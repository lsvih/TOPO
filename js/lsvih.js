/**
 * @author hnhao78@163.com
 * @link http://lsvih.com
 * @description 工具类库
 */
(function($) {
	"use strict";
	var warn = undefined;
	//本地作用域的全局变量
	if(!$.lsvih) {
		$.lsvih = {};
	};
	/**
	 * 报错函数
	 * @param msg 报错信息
	 */
	warn = function(msg) {
		console.error('[lsvih warn]:' + msg);
	};
	$.lsvih = {
		init: function() {
			console.log("library loaded!")
		},
		/**
		 * 时间处理函数，用于处理时间日期等功能
		 * input[date],input[datetime]与input[datetime-local]与时间戳的互相转换
		 */
		time: {
			/**
			 * 输出日期，格式为YYYY-MM-DD
			 * @param {Object} 输出多少天后的日期，默认为当日
			 */
			day: function(day) {
				var after = day || 0;
				var d = new Date();
				var b = new Date(d.getTime() + after * 1000 * 60 * 60 * 24);
				return b.getFullYear() + "-" + ((b.getMonth() + 1) < 10 ? "0" : "") + (b.getMonth() + 1) + "-" + (b.getDate() < 10 ? "0" : "") + b.getDate();
			},
			/**
			 * 将时间戳转换为合适的格式
			 * @param {Number} 时间戳
			 * @param {String} 转换的格式[date|datetime|datetime-local|time]
			 */
			stampToStr: function(timestamp, type) {
				if(!type) {
					warn("必须填写时间戳转换的格式");
					return false;
				}
				var d = new Date(timestamp);
				var Y = d.getFullYear() + '-';
				var M = (d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1) + '-';
				var D = isExitsVariable(D) ? D : (d.getDate() < 10 ? '0' + (d.getDate()) : d.getDate());
				var h = (d.getHours() < 10 ? '0' + d.getHours() : d.getHours()) + ':';
				var m = (d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()) + ':';
				var s = (d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds());
				switch(type) {
					case "date":
						return(Y + M + D);
						break;
					case "datetime":
						D += " ";
					case "datetime-local":
						D = /\d{2}\s/.test(D) ? D : (D + "T");
						return(Y + M + D + h + m + s);
						break;
					case "time":
						return(h + m + s);
						break;
					default:
						warn("请填写正确的时间戳转换格式");
						return false;
						break;
				}
			},
			/**
			 * 将时间字符串转换为时间戳
			 * @param {String} 字符串，需符合[date|datetime|datetime-local]的格式
			 */
			strToStamp: function(str) {
				var time = str.replace("T", " ");
				var timearr = time.split(" ");
				var datearr = timearr[0].split("-");
				var hourarr = timearr[1]!==undefined?timearr[1].split(":"):[0,0,0];
				var d = new Date(datearr[0], Number(datearr[1] - 1), datearr[2], hourarr[0], hourarr[1], hourarr[2]);
				var ts = d.getTime();
				return Math.floor(ts / 1000)
			}
		},
		/**
		 * dom对象处理函数
		 * 为指定dom对象查找、添加、删除ClassName
		 */
		dom: {
			/**
			 * 查找选定dom对象是否存在某className
			 * @param {Object} object
			 * @param {String} className
			 */
			hasClass: function(object, className) {
				if(typeof(object) !== "object") {
					warn("请选择正确的对象");
					return "error";
				}
				return !!object.className.match(new RegExp("(\\s|^)" + className + "(\\s|$)"));
			},
			/**
			 * 为选中对象添加一个className
			 * @param {Object} object
			 * @param {String} className
			 */
			addClass: function(object, className) {
				if(!this.hasClass(object, className) && this.hasClass(object, className) !== "error") {
					object.className += " " + className;
					return true;
				}
			},
			/**
			 * 从选中对象的className中删除一个指定的className
			 * @param {Object} object
			 * @param {String} className
			 */
			removeClass: function(object, className) {
				if(this.hasClass(object, className)) {
					object.className = object.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
					return true;
				}
			}
		},
		/**
		 * 数组操作
		 * 通过数组中某个json key找到元素下标|找到元素
		 * 删除、增加、修改元素由于需要触发视图更新因此交给vuejs做
		 */
		array: {
			/**
			 * 通过某个key在数组中寻找元素的下标
			 * @param {JSON} {'id':1}=>在数组中寻找id为1的元素的下标
			 * @param {Array} 待寻找数组
			 */
			getSubByKey: function(keyjson, array) {
				if(lsvih.json.length(keyjson) !== 1) {
					warn("请输入正确的键值对");
					return false;
				}
				if(!array.length) {
					warn("数组长度为零");
					return false;
				}
				var Key, value;
				for(var key in keyjson) {
					Key = key;
					value = keyjson[key];
				}
				for(var p = 0; p < array.length; p++) {
					var itemkey = eval("array[p]." + Key)
					if(value == itemkey) return p;
				}
				return false;
			},
			/**
			 * 通过某个key在数组中寻找元素
			 * @param {JSON} {'id':1}=>在数组中寻找id为1的元素的下标
			 * @param {Array} 待寻找数组
			 */
			getObjByKey: function(keyjson, array) {
				return array[this.getSubByKey(keyjson, array)];
			},
			getArrByCondition: function(condition, array){
				var arr = [];
				array.map(function(obj){
					eval('if(obj.'+ condition +'){arr.push({obj})}');
				});
				return arr;
			}
		},
		/**
		 * JSON对象操作
		 */
		json: {
			/**
			 * 获取json对象内元素数量
			 * @param {JSON} json
			 */
			length: function(json) {
				if(typeof(json) !== 'object') {
					warn("请输入正确的json对象");
					return false;
				}
				var size = 0,
					key;
				for(key in json) {
					if(json.hasOwnProperty(key)) size++;
				}
				return size;
			}
		},
		/**
		 * 监听操作
		 */
		listen: {
			/**
			 * 多事件监听器
			 * @param {Array} 监听的多事件函数数组
			 * @param {Number} 监听成功总数 
			 * @param {Object} 进度条
			 * @param {Function} 成功回调函数(必填)
			 * @param {Function} 错误回调函数(必填)
			 * @param {Object} 配置(可选)
			 */
			//TODO~~~~~
			events: function(events, maxCount, progress, callback, error, option) {
				var errorFunction = error || function(msg) {
					warn(msg);
					return false;
				}
				var successFunction = callback || function() {
					return true;
				}
				var progressFunction = progress || function(e) {};
				var setTime = option.setTime || 50; //定时器设定时间，可选
				var __successCount = 0;
				var __timer = setInterval(function() {
					if(maxCount == __successCount) {
						clearInterval(__timer);
						progress(100);
						callback();
						return true;
					}
				}, setTime)
			}
		}
	};
	/**
	 * 判断对象是否存在
	 * @param {String} 对象|变量名
	 */
	function isExitsVariable(variableName) {
		try {
			if(typeof(variableName) == "undefined") {
				return false;
			} else {
				return true;
			}
		} catch(e) {}
		return false;
	}
}(window))