using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Web;

namespace SlideToUnlock
{
    /* ======================
	* 功能描述：添加描述信息
	* 创 建 者：Administrator
	* 创建日期：2018/8/16 17:50:02
	* 修    改：
	* ========================*/
    public class CaptchaHelper
    {
        public int OffSetX { get; set; }
        public int OffSetY { get; set; }
        public int VOffSet { get; set; }

        private static Lazy<CaptchaHelper> _default = new Lazy<CaptchaHelper>(() => new CaptchaHelper() { });

        public static CaptchaHelper Default
        {
            get
            {
                return _default.Value;
            }
        }

        static CaptchaHelper()
        {

        }

        /// <summary>
        /// 图片处理
        /// </summary>
        /// <param name="width">宽度，默认400</param>
        /// <param name="height">高度，默认200</param>
        /// <param name="picInit">原图片路径，默认空</param>
        /// <param name="vOffset">剪切位置，默认5</param>
        /// <returns></returns>
        public ImageInfo GetInitImage(int width = 400, int height = 200, string picInit = "", int vOffset = 5)
        {
            VOffSet = vOffset;
            
            // 获取原路径（物理路径）
            string sourcePicPath = ImageHelper.Default.GetRandImagePath(picInit); // 选择一张图片
            string newfilepath = sourcePicPath;
            string oldpic = sourcePicPath;
            string cutpic = picInit + "\\cutpic\\" + DateTime.Now.ToString("yyyyMMdd") + "\\cut_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(newfilepath);
            string newpic = picInit + "\\cutpic\\" + DateTime.Now.ToString("yyyyMMdd") + "\\new_" + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(newfilepath);

            string folder = ConfigurationManager.AppSettings["SlideToUnlockPicFolder"];
            int offsetX = 0;
            int offsetY = 0;
            int cutwidth = 0;
            int cutheight = 0;
            new DirectoryInfo(picInit + "\\cutpic\\").Delete(true);//删除文件
            // 裁剪图片
            bool cutResult = ImageHelper.Default.CaptureImage(newfilepath, cutpic, newpic, out offsetX, out offsetY, out cutwidth, out cutheight);
            if (cutResult)
            {
                OffSetX = offsetX;
                OffSetY = offsetY;
            }
            // 本地地址转为网络地址
            string sourcepicpath = folder + newpic.Replace(picInit, "").Replace("\\", "/");
            string newpicpath = folder + newpic.Replace(picInit, "").Replace("\\", "/");
            string cutpicpath = folder + cutpic.Replace(picInit, "").Replace("\\", "/");
            // 缩放图片
            // ImageHelper.Default.GetThumbnail(sourcePicPath,newfilepath, width, height);
            return new ImageInfo { SourcePicPath = sourcepicpath, NewPicPath = newpicpath, SmallPicPath = cutpicpath, CutHeight = cutheight, CutWidth = cutwidth, OffSetX = offsetX, OffSetY = offsetY };
        }

        /// <summary>
        /// 验证图片块移动的最终位置坐标
        /// </summary>
        /// <param name="offsetX"></param>
        /// <param name="offsetY"></param>
        /// <returns></returns>
        public bool ValidateCaptcha(int offsetX, int voffset=2)
        {
            if (Math.Abs(offsetX - OffSetX) <= voffset)
            {
                return true;
            }
            return false;
        }
    }
}
