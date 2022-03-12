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
                Utils.AsynMethod('SlideToUnlock.ashx?action=ValidateCaptcha', { 'offsetx': offsetx, 'voffset': voffset }).then(function (r) {
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