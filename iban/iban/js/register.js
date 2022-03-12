jQuery(
  function ($) {
    $("input#profileInput").fileinput(
    );
  }
)

//jQuery(
//  function ($) {
//    projectfileoptions : {
//		    showUpload : false,
//		    showRemove : false,
//		    language : 'zh',
//		    allowedPreviewTypes : [ 'image' ],
//		    allowedFileExtensions : [ 'jpg', 'png', 'gif' ],
//		    maxFileSize : 2000,
//	  },
//    // 文件上传框
//    $('input#profileInput').each(function() {
//	    var imageurl = $(this).attr("value");

//	    if (imageurl) {
//		    var op = $.extend({
//			    initialPreview : [ // 预览图片的设置
//			    "<img src='" + imageurl + "' class='file-preview-image'>", ]
//		    }, projectfileoptions);

//		    $(this).fileinput(op);
//	    } else {
//		    $(this).fileinput(projectfileoptions);
//	    }
//    }
//  }
//);