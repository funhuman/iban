//$(document).ready(function(){
//  $("#warn").css("display", "none");
//});
function textChanged() {
  if (event.keyCode == 13) {
      login();
  }
}
function login() {
  var username = $("#usernameTextBox").val();
  var password = $("#passwordTextBox").val();
  if (isEmpty(username)) {
    document.getElementById('warn').setAttribute("style", "display: block");
    document.getElementById('warnText').innerHTML = "用户名不能为空！";
    return;
  }
  if (isEmpty(password)) {
    $("#warn").css("display", "block");
    $("#warnText").html("密码不能为空！");
    return;
  }
  if($("#passwordTextBox").val().length == 32){
    $("#SubmitButton").click();
  }
  else{
    $('#myModal').modal();
  }
}
      /*function login() {
          

            $.ajax({
                  type: "post",
                  url: "/UserModular/Login.aspx/LoginAjax",
                  contentType: "application/json; charset=utf-8",
                  dataType: "text",
                  cache: false,
			            data: {
				            "username": username,
				            "password": password,
			            },
                  // 回调方法
                  success: function (data) {
                      if (data=="ok") {
					              alert("修改成功");window.location.herf("/index.aspx");
				              } else {
					              // alert("修改成功");
					              location.reload(); // 刷新
				              }
                  },
                  error: function (err) {
                      alert("登录失败");
                  }
              });
              return false;

        
      }*/

/*SlideToUnlock2 Start*/
var Utils = {
    AsynMethod: function(murl, mdata) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: murl,
                type: "get",
                dataType: "json",
                data: mdata,
                success: function(result) {
                    resolve(result);
                },
                error: function(err) {
                    reject(err);
                }
            });
        });
    }
}
$(function(){
    // 方法链接
    Utils.AsynMethod('/SlideToUnlock/SlideToUnlock.ashx?action=GetCaptchaImage').then(function(r){
        var arr=[];
        arr.push(r.SourcePicPath);//r.NewPicPath
        var slideopt={
            vOffset:5,	//误差量，根据需求自行调整
				    vSpace :1,	//间隔
				    imgName : arr,  //从后台读取
				    imgSize : {
					    width: '400px',
					    height: '200px',
				    },
				    blockSize:{
					    width:r.CutWidth+'px',
					    height:r.CutHeight+'px',
                        bgimg:r.SmallPicPath,
                        offsety:(200+3-r.OffSetY)+'px'
				    },               
				    barSize : {
					    width : '400px',
					    height : '40px',
				    },
            bgImg : {
                newPic:r.NewPicPath,
                sourcePic:r.SourcePicPath
            },
				    ready : function() { 
                
				    },
				    success : function() {
              if($("#passwordTextBox").val().length != 32 && $("#passwordTextBox").val().length != 0){
                passwordTextBox.value = hex_md5($("#passwordTextBox").val());
              }
              //alert("登录成功！");
              //$('#myModal').hide();
					    $("#SubmitButton").click();
              //document.getElementById("Form1").submit();
				    },
				    error : function() { 
                
				    }
        };
        $('#SlideToUnlock').slideVerify(slideopt);
    }).catch(function(err){}); 
})
jQuery(function ($) {
(function($, window, document, undefined) {
    //定义Slide的构造函数
    var Slide = function(ele, opt) {
        this.$element = ele,
        this.defaults = {},
        this.options = $.extend({},
        this.defaults, opt)
    };
    //定义Slide的方法
    Slide.prototype = {
        init: function() {
            var _this = this;
            //加载页面
            this.loadDom();
            this.options.ready();
            this.$element[0].onselectstart = document.body.ondrag = function() {
                return false;
            };
            //按下
            this.htmlDoms.move_block.on('touchstart',
            function(e) {
                _this.start(e);
            });

            this.htmlDoms.move_block.on('mousedown',
            function(e) {
                _this.start(e);
            });

            //拖动
            window.addEventListener("touchmove",
            function(e) {
                _this.move(e);
            });
            window.addEventListener("mousemove",
            function(e) {
                _this.move(e);
            });

            //鼠标松开
            window.addEventListener("touchend",
            function() {
                _this.end();
            });
            window.addEventListener("mouseup",
            function() {
                _this.end();
            });

            //刷新
            _this.$element.find('.verify-refresh').on('click',
            function() {
                _this.refresh();
            });
        },
        //初始化加载
        loadDom: function() {
            this.img_rand =0;// Math.floor(Math.random() * this.options.imgName.length); //随机的背景图片
            var panelHtml = '<div class="verify-img-panel"></div>';
            var tmpHtml = '<div  class="verify-sub-block"></div>';
            panelHtml += '<div class="verify-bar-area"><span  class="verify-msg">向右滑动完成验证</span><div class="verify-left-bar"><span  class="verify-msg"></span><div  class="verify-move-block"><i  class="verify-icon iconfont icon-right"></i>' + tmpHtml + '</div></div></div>';
            this.$element.append(panelHtml);
            this.htmlDoms = {
                sub_block: this.$element.find('.verify-sub-block'),
                img_panel: this.$element.find('.verify-img-panel'),
                bar_area: this.$element.find('.verify-bar-area'),
                move_block: this.$element.find('.verify-move-block'),
                left_bar: this.$element.find('.verify-left-bar'),
                msg: this.$element.find('.verify-msg'),
                icon: this.$element.find('.verify-icon'),
                refresh: this.$element.find('.verify-refresh')
            };

            this.status = false; //鼠标状态
            this.setSize = this.resetSize(this); //重新设置宽度高度 
            this.htmlDoms.sub_block.css({
                'width': this.options.blockSize.width,
                'height': this.options.blockSize.height,
                'background': 'url(' + this.options.blockSize.bgimg + ')',
                'top': '-' + this.options.blockSize.offsety
            });
            this.htmlDoms.img_panel.css({
                'width': this.setSize.img_width,
                'height': this.setSize.img_height,
                'background': 'url(' + this.options.imgName[this.img_rand] + ')',
                'background-size': this.setSize.img_width + ' ' + this.setSize.img_height
            });
            this.htmlDoms.bar_area.css({
                'width': this.setSize.bar_width,
                'height': this.options.barSize.height,
                'line-height': this.options.barSize.height
            });
            this.htmlDoms.move_block.css({
                'width': this.options.barSize.height,
                'height': this.options.barSize.height
            });
            this.htmlDoms.left_bar.css({
                'width': this.options.barSize.height,
                'height': this.options.barSize.height
            });
            this.randSet();
        },

        //鼠标按下
        start: function(e) {
            this.$element.find('.verify-img-panel').css('background','url('+this.options.bgImg.newPic+')');  //加载新背景图片
            this.htmlDoms.msg.text('');
            this.htmlDoms.move_block.css('background-color', '#337ab7');
            this.htmlDoms.left_bar.css('border-color', '#337AB7');
            this.htmlDoms.icon.css('color', '#fff');
            e.stopPropagation();
            this.status = true;
        },

        //鼠标移动
        move: function(e) {
            if (this.status) {
                if (!e.touches) { //兼容移动端
                    var x = e.clientX;
                } else { //兼容PC端
                    var x = e.touches[0].pageX;
                }
                var bar_area_left = Slide.prototype.getLeft(this.htmlDoms.bar_area[0]);
                var move_block_left = x - bar_area_left; //小方块相对于父元素的left值
                if (move_block_left >= this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.options.blockSize.width) / 2) - 2) {
                    move_block_left = this.htmlDoms.bar_area[0].offsetWidth - parseInt(parseInt(this.options.blockSize.width) / 2) - 2;
                }
                if (move_block_left <= 0) {
                    move_block_left = parseInt(parseInt(this.options.blockSize.width) / 2);
                }
                //拖动后小方块的left值
                this.htmlDoms.move_block.css('left', move_block_left - parseInt(parseInt(this.options.blockSize.width) / 2) + "px");
                this.htmlDoms.left_bar.css('width', move_block_left - parseInt(parseInt(this.options.blockSize.width) / 2) + "px");
            }
        }, 
        //鼠标松开
        end: function() { 
        	var _this = this; 
        	//判断是否重合
        	if(this.status) { 
                var offsetx = $('.verify-move-block').css('left');
                offsetx=offsetx.substr(0,offsetx.length-2);
                var voffset = _this.options.vOffset;
                Utils.AsynMethod('/SlideToUnlock/SlideToUnlock.ashx?action=ValidateCaptcha', { 'offsetx': offsetx, 'voffset': voffset }).then(function (r) {
                    if(r.result=="ok"){
                        _this.htmlDoms.move_block.css('background-color', '#5cb85c');
		            	_this.htmlDoms.left_bar.css({'border-color': '#5cb85c', 'background-color': '#fff'});
		            	_this.htmlDoms.icon.css('color', '#fff');
		            	_this.htmlDoms.icon.removeClass('icon-right');
		            	_this.htmlDoms.icon.addClass('icon-check');
		            	_this.htmlDoms.refresh.hide();
		            	_this.htmlDoms.move_block.unbind('mousedown touchstart');
		            	_this.options.success();
		            }else{
		            	_this.htmlDoms.move_block.css('background-color', '#d9534f');
		            	_this.htmlDoms.left_bar.css('border-color', '#d9534f');
		            	_this.htmlDoms.icon.css('color', '#fff');
		            	_this.htmlDoms.icon.removeClass('icon-right');
		            	_this.htmlDoms.icon.addClass('icon-close');
		            	setTimeout(function () { 
					    	_this.htmlDoms.move_block.animate({'left':'0px'}, 'fast');
					    	_this.htmlDoms.left_bar.animate({'width': '40px'}, 'fast');
					    	_this.htmlDoms.left_bar.css({'border-color': '#ddd'});
					    	_this.htmlDoms.move_block.css('background-color', '#fff');
					    	_this.htmlDoms.icon.css('color', '#000');
					    	_this.htmlDoms.icon.removeClass('icon-close');
		            		_this.htmlDoms.icon.addClass('icon-right');
		            		_this.$element.find('.verify-msg:eq(0)').text('向右滑动完成验证');
					    }, 400);
		            	_this.options.error();
                            _this.$element.find('.verify-img-panel').css('background','url('+_this.options.bgImg.sourcePic+')');  //加载新背景图片
		            }
                }); 
	            this.status = false;
        	}
        }, 
        resetSize: function(obj) {
            var img_width, img_height, bar_width, bar_height; //图片的宽度、高度，移动条的宽度、高度
            var parentWidth = obj.$element.parent().width() || $(window).width();
            var parentHeight = obj.$element.parent().height() || $(window).height();

            if (obj.options.imgSize.width.indexOf('%') != -1) {
                img_width = parseInt(obj.options.imgSize.width) / 100 * parentWidth + 'px';　　
            } else {
                img_width = obj.options.imgSize.width;
            }

            if (obj.options.imgSize.height.indexOf('%') != -1) {
                img_height = parseInt(obj.options.imgSize.height) / 100 * parentHeight + 'px';　　
            } else {
                img_height = obj.options.imgSize.height;
            }

            if (obj.options.barSize.width.indexOf('%') != -1) {
                bar_width = parseInt(obj.options.barSize.width) / 100 * parentWidth + 'px';　　
            } else {
                bar_width = obj.options.barSize.width;
            }

            if (obj.options.barSize.height.indexOf('%') != -1) {
                bar_height = parseInt(obj.options.barSize.height) / 100 * parentHeight + 'px';　　
            } else {
                bar_height = obj.options.barSize.height;
            }
            return {
                img_width: img_width,
                img_height: img_height,
                bar_width: bar_width,
                bar_height: bar_height
            };
        },

        //随机出生点位
        randSet: function() {},
        //获取left值
        getLeft: function(node) {
            var left = $(node).offset().left;
            return left;
        }
    };

    //在插件中使用slideVerify对象
    $.fn.slideVerify = function(options, callbacks) {
        var slide = new Slide(this, options);
        slide.init();
    };

})(jQuery, window, document);
})/*SlideToUnlock2 End*/
/* md5() https://blog.csdn.net/weixin_43844158/article/details/84927105 */
var hexcase = 1;  
var b64pad  = ""; 
var chrsz   = 8;  
function hex_md5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}
function b64_md5(s){ return binl2b64(core_md5(str2binl(s), s.length * chrsz));}
function hex_hmac_md5(key, data) { return binl2hex(core_hmac_md5(key, data)); }
function b64_hmac_md5(key, data) { return binl2b64(core_hmac_md5(key, data)); }
function calcMD5(s){ return binl2hex(core_md5(str2binl(s), s.length * chrsz));}

function md5_vm_test()
{
  return hex_md5("abc") == "900150983cd24fb0d6963f7d28e17f72";
}

function core_md5(x, len)
{

  x[len >> 5] |= 0x80 << ((len) % 32);
  x[(((len + 64) >>> 9) << 4) + 14] = len;
  var a =  1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d =  271733878;
  for(var i = 0; i < x.length; i += 16)
  {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i+ 0], 7 , -680876936);
    d = md5_ff(d, a, b, c, x[i+ 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i+ 2], 17,  606105819);
    b = md5_ff(b, c, d, a, x[i+ 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i+ 4], 7 , -176418897);
    d = md5_ff(d, a, b, c, x[i+ 5], 12,  1200080426);
    c = md5_ff(c, d, a, b, x[i+ 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i+ 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i+ 8], 7 ,  1770035416);
    d = md5_ff(d, a, b, c, x[i+ 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i+10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i+11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i+12], 7 ,  1804603682);
    d = md5_ff(d, a, b, c, x[i+13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i+14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i+15], 22,  1236535329);
    a = md5_gg(a, b, c, d, x[i+ 1], 5 , -165796510);
    d = md5_gg(d, a, b, c, x[i+ 6], 9 , -1069501632);
    c = md5_gg(c, d, a, b, x[i+11], 14,  643717713);
    b = md5_gg(b, c, d, a, x[i+ 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i+ 5], 5 , -701558691);
    d = md5_gg(d, a, b, c, x[i+10], 9 ,  38016083);
    c = md5_gg(c, d, a, b, x[i+15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i+ 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i+ 9], 5 ,  568446438);
    d = md5_gg(d, a, b, c, x[i+14], 9 , -1019803690);
    c = md5_gg(c, d, a, b, x[i+ 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i+ 8], 20,  1163531501);
    a = md5_gg(a, b, c, d, x[i+13], 5 , -1444681467);
    d = md5_gg(d, a, b, c, x[i+ 2], 9 , -51403784);
    c = md5_gg(c, d, a, b, x[i+ 7], 14,  1735328473);
    b = md5_gg(b, c, d, a, x[i+12], 20, -1926607734);
    a = md5_hh(a, b, c, d, x[i+ 5], 4 , -378558);
    d = md5_hh(d, a, b, c, x[i+ 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i+11], 16,  1839030562);
    b = md5_hh(b, c, d, a, x[i+14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i+ 1], 4 , -1530992060);
    d = md5_hh(d, a, b, c, x[i+ 4], 11,  1272893353);
    c = md5_hh(c, d, a, b, x[i+ 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i+10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i+13], 4 ,  681279174);
    d = md5_hh(d, a, b, c, x[i+ 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i+ 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i+ 6], 23,  76029189);
    a = md5_hh(a, b, c, d, x[i+ 9], 4 , -640364487);
    d = md5_hh(d, a, b, c, x[i+12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i+15], 16,  530742520);
    b = md5_hh(b, c, d, a, x[i+ 2], 23, -995338651);
    a = md5_ii(a, b, c, d, x[i+ 0], 6 , -198630844);
    d = md5_ii(d, a, b, c, x[i+ 7], 10,  1126891415);
    c = md5_ii(c, d, a, b, x[i+14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i+ 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i+12], 6 ,  1700485571);
    d = md5_ii(d, a, b, c, x[i+ 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i+10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i+ 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i+ 8], 6 ,  1873313359);
    d = md5_ii(d, a, b, c, x[i+15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i+ 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i+13], 21,  1309151649);
    a = md5_ii(a, b, c, d, x[i+ 4], 6 , -145523070);
    d = md5_ii(d, a, b, c, x[i+11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i+ 2], 15,  718787259);
    b = md5_ii(b, c, d, a, x[i+ 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
  
}

function md5_cmn(q, a, b, x, s, t)
{
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s),b);
}
function md5_ff(a, b, c, d, x, s, t)
{
  return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t);
}
function md5_gg(a, b, c, d, x, s, t)
{
  return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t);
}
function md5_hh(a, b, c, d, x, s, t)
{
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}
function md5_ii(a, b, c, d, x, s, t)
{
  return md5_cmn(c ^ (b | (~d)), a, b, x, s, t);
}

function core_hmac_md5(key, data)
{
  var bkey = str2binl(key);
  if(bkey.length > 16) bkey = core_md5(bkey, key.length * chrsz);

  var ipad = Array(16), opad = Array(16);
  for(var i = 0; i < 16; i++) 
  {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = core_md5(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
  return core_md5(opad.concat(hash), 512 + 128);
}

function safe_add(x, y)
{
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xFFFF);
}

function bit_rol(num, cnt)
{
  return (num << cnt) | (num >>> (32 - cnt));
}

function str2binl(str)
{
  var bin = Array();
  var mask = (1 << chrsz) - 1;
  for(var i = 0; i < str.length * chrsz; i += chrsz)
    bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
  return bin;
}

function binl2hex(binarray)
{
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i++)
  {
    str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
           hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
  }
  return str;
}

function binl2b64(binarray)
{
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var str = "";
  for(var i = 0; i < binarray.length * 4; i += 3)
  {
    var triplet = (((binarray[i   >> 2] >> 8 * ( i   %4)) & 0xFF) << 16)
                | (((binarray[i+1 >> 2] >> 8 * ((i+1)%4)) & 0xFF) << 8 )
                |  ((binarray[i+2 >> 2] >> 8 * ((i+2)%4)) & 0xFF);
    for(var j = 0; j < 4; j++)
    {
      if(i * 8 + j * 6 > binarray.length * 32) str += b64pad;
      else str += tab.charAt((triplet >> 6*(3-j)) & 0x3F);
    }
  }
  return str;
}