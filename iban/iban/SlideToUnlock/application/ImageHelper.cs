using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace SlideToUnlock
{
    /* ======================
	* 功能描述：添加描述信息
	* 创 建 者：Administrator
	* 创建日期：2018/8/16 17:50:23
	* 修    改：
	* ========================*/
    public class ImageHelper
    {
        private static Lazy<ImageHelper> _default = new Lazy<ImageHelper>(() => new ImageHelper() { });

        private static List<string> ImagePathList = new List<string>();
        public static ImageHelper Default
        {
            get
            {
                return _default.Value;
            }
        }

        public string GetRandImagePath(string picInitDir)
        {
            InitPicList(picInitDir);
            int randNum = new Random().Next(0, ImagePathList.Count);
            return ImagePathList[randNum];
        }


        /// <summary>
        // 按比例缩放图片(图片缩放暂时没用)
        /// </summary>
        /// <param name="bmp">图片</param>
        /// <param name="width">目标宽度，若为0，表示宽度按比例缩放</param>
        /// <param name="height">目标长度，若为0，表示长度按比例缩放</param>
        public void GetThumbnail(string fromImagePath,string newfilepath, int TargetWidth = 400, int TargetHeight = 200)
        {
            var SourceImage = Image.FromFile(fromImagePath);
            int IntWidth; //新的图片宽
            int IntHeight; //新的图片高
            try
            {
                System.Drawing.Imaging.ImageFormat format = SourceImage.RawFormat;
                System.Drawing.Bitmap SaveImage = new System.Drawing.Bitmap(TargetWidth, TargetHeight);
                Graphics g = Graphics.FromImage(SaveImage);
                g.Clear(Color.White);
                if (SourceImage.Width > TargetWidth && SourceImage.Height <= TargetHeight)//宽度比目的图片宽度大，长度比目的图片长度小
                {
                    IntWidth = TargetWidth;
                    IntHeight = (IntWidth * SourceImage.Height) / SourceImage.Width;
                }
                else if (SourceImage.Width <= TargetWidth && SourceImage.Height > TargetHeight)//宽度比目的图片宽度小，长度比目的图片长度大
                {
                    IntHeight = TargetHeight;
                    IntWidth = (IntHeight * SourceImage.Width) / SourceImage.Height;
                }
                else if (SourceImage.Width <= TargetWidth && SourceImage.Height <= TargetHeight) //长宽比目的图片长宽都小
                {
                    IntHeight = SourceImage.Width;
                    IntWidth = SourceImage.Height;
                }
                else//长宽比目的图片的长宽都大
                {
                    IntWidth = TargetWidth;
                    IntHeight = (IntWidth * SourceImage.Height) / SourceImage.Width;
                    if (IntHeight > TargetHeight)//重新计算
                    {
                        IntHeight = TargetHeight;
                        IntWidth = (IntHeight * SourceImage.Width) / SourceImage.Height;
                    }
                }

                g.DrawImage(SourceImage, (TargetWidth - IntWidth) / 2, (TargetHeight - IntHeight) / 2, IntWidth, IntHeight);
                g.Dispose();
                SourceImage.Dispose();
                SaveImage.Save(newfilepath);
                SaveImage.Dispose();
   

            }
            catch (Exception ex)
            {

            }  
        }



        /// <summary>
        /// 从大图中截取一部分图片
        /// </summary>
        /// <param name="fromImagePath">来源图片地址</param>        
        /// <param name="offsetX">从偏移X坐标位置开始截取</param>
        /// <param name="offsetY">从偏移Y坐标位置开始截取</param>
        /// <param name="toImagePath">保存图片地址</param>
        /// <param name="width">保存图片的宽度</param>
        /// <param name="height">保存图片的高度</param>
        /// <returns></returns>
        public bool CaptureImage(string fromImagePath, string cuteImagePath, string newImagePath, out int offsetX, out int offsetY, out int cutwidth, out int cutheight)
        {
            try
            {
                if (!Directory.Exists(Path.GetDirectoryName(cuteImagePath))) {
                    Directory.CreateDirectory(Path.GetDirectoryName(cuteImagePath));
                }
                //原图片文件读入内存
                Image fromImage = Image.FromFile(fromImagePath);
                //截图大小
                cutwidth = fromImage.Width / 6;
                cutheight = fromImage.Height / 6;
                //截图位置
                var rand = new Random().Next(1, 10);
                offsetX = (int)(rand * ((int)(fromImage.Width)) / 15 + ((int)(fromImage.Width)) * 0.1);
                offsetY = (int)(rand * ((int)(fromImage.Height)) / 15 + ((int)(fromImage.Height)) * 0.1);
                //创建新图位图
                Bitmap bitmap = new Bitmap(cutwidth, cutheight);
                //创建作图区域
                Graphics graphic = Graphics.FromImage(bitmap);
                //截取原图相应区域写入作图区
                graphic.DrawImage(fromImage, 0, 0, new Rectangle(offsetX, offsetY, cutwidth, cutheight), GraphicsUnit.Pixel);
                //从作图区生成新图
                Image saveImage = Image.FromHbitmap(bitmap.GetHbitmap());
                //保存图片
                saveImage.Save(cuteImagePath);  //切图 
                //创建新图位图
                Bitmap newbitmap = new Bitmap(fromImage, fromImage.Width, fromImage.Height);
                Graphics newgraphic = Graphics.FromImage(newbitmap);
                newgraphic.FillRectangle(Brushes.WhiteSmoke, offsetX, offsetY, cutwidth, cutheight);
                //从作图区生成新图
                Image newsaveImage = Image.FromHbitmap(newbitmap.GetHbitmap());
                newsaveImage.Save(newImagePath);
                //释放资源   
                saveImage.Dispose();
                graphic.Dispose();
                bitmap.Dispose();
                return true;
            }
            catch (Exception ex)
            {
                offsetX = 0;
                offsetY = 0;
                cutheight = 0;
                cutwidth = 0;
                return false;
            }
        }


        /// <summary>
        /// 初始化图片列表
        /// </summary>
        /// <param name="dirpic"></param>
        public void InitPicList(string dirpic)
        {
            DirectoryInfo dir = new DirectoryInfo(dirpic);
            var files = dir.GetFiles().ToList();
            files.ForEach(c =>
            {
                try
                {
                    ImagePathList.Add(c.FullName);
                }
                catch (Exception ex)
                {

                }
            });
        }

    }
}
