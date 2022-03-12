using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SlideToUnlock
{
    /* ======================
	* 功能描述：添加描述信息
	* 创 建 者：Administrator
	* 创建日期：2018/8/20 16:54:30
	* 修    改：
	* ========================*/
    public class ImageInfo
    {
        /// <summary>
        /// 原图片地址
        /// </summary>
        public string SourcePicPath { get; set; }
        /// <summary>
        /// 新图片地址
        /// </summary>
        public string NewPicPath { get; set; }
        /// <summary>
        /// 小图片地址
        /// </summary>
        public string SmallPicPath { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int OffSetX { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int OffSetY { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CutWidth { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public int CutHeight { get; set; }

    }
}
