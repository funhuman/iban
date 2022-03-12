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
    Utils.AsynMethod('SlideToUnlock.ashx?action=GetCaptchaImage').then(function(r){
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
					alert('验证成功，添加你自己的代码！'); 
				},
				error : function() { 

				}
            };
        $('#mpanel4').slideVerify(slideopt);
    }).catch(function(err){}); 
})


