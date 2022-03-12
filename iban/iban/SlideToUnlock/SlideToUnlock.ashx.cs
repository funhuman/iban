using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;

namespace SlideToUnlock
{
    /// <summary>
    /// CaptchaHandler 的摘要说明
    /// </summary>
    public class CaptchaHandler : IHttpHandler
    {
        private string CaptchaImageDir = HttpRuntime.AppDomainAppPath.ToString() + ConfigurationManager.AppSettings["CaptchaImageDir"];

        /// <summary>
        /// SlideToUnlock 主入口
        /// </summary>
        /// <param name="context">传入的Request</param>
        public void ProcessRequest(HttpContext context)
        {
            var action = context.Request.QueryString["action"];
            switch (action)
            {
                case "GetCaptchaImage":
                    context.Response.Write(GetCaptchaImage(context));
                    break;
                case "ValidateCaptcha":
                    context.Response.Write(ValidateCaptcha(context));
                    break;
            }
        }

        /// <summary>
        /// 获取图片信息
        /// </summary>
        /// <param name="context">传入的Request</param>
        /// <returns>图片Json</returns>
        public string GetCaptchaImage(HttpContext context)
        {
            var voffset = context.Request.QueryString["vOffset"];
            int int_voffset = 5;
            if (!int.TryParse(voffset, out int_voffset)) {
                int_voffset = 5;
            }
            var images = CaptchaHelper.Default.GetInitImage(picInit: CaptchaImageDir, vOffset: int_voffset);
            return Newtonsoft.Json.JsonConvert.SerializeObject(images);
        }

        /// <summary>
        /// 验证
        /// </summary>
        /// <param name="context">传入的Request</param>
        /// <returns>ajax返回值</returns>
        public string ValidateCaptcha(HttpContext context)
        {
            var offsetx = context.Request.QueryString["offsetx"];
            var voffset = context.Request.QueryString["voffset"];
            int offsetx_int = int.Parse(offsetx);//坐标X轴
            int voffset_int = int.Parse(voffset);//容差
            var bResult = CaptchaHelper.Default.ValidateCaptcha(offsetx_int, voffset_int);
            if (bResult)
            {
                return Newtonsoft.Json.JsonConvert.SerializeObject(new { result = "ok" });
            }
            return Newtonsoft.Json.JsonConvert.SerializeObject(new { result = "error" });
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}