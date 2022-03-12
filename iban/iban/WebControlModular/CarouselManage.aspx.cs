using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.IO;
using System.Data.SqlClient;
using BLL;
using Model;

namespace UI.CarouselModular
{
    public partial class CarouselManage : System.Web.UI.Page
    {
        protected string RollString;

        protected void Page_Load(object sender, EventArgs e)
        {
            int uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
            }
            else if (!UserBLL.adminCheckById(uid))
            {
                Response.Write("<script>alert('权限不足');window.location.href='/index.aspx';</script>");
            }
            RollString = indexBLL.getCarouseRollString();
        }
        protected void upload_Click(object sender, EventArgs e)
        {
            // 设置路径
            string ServerPath = Server.MapPath("~/") + @"uploads\";
            // 如果没有目录就新建目录
            if (!Directory.Exists(ServerPath))
            {
                Directory.CreateDirectory(ServerPath);
            }
            // 如果上传了文件
            if (FileUpload1.HasFile)
            {
                string fileName = FileUpload1.FileName;
                string ExtName = System.IO.Path.GetExtension(fileName);
                string NewName = DateTime.Now.ToString("yyyyMMddHHmmss") + ExtName;
                FileUpload1.SaveAs(ServerPath + NewName);
                Image1.ImageUrl = "/uploads/" + NewName;
                Response.Write("<script>alert('文件上传成功');</script>");
                upload.Text = "重新上传";
                title.ReadOnly = false;
                subtitle.ReadOnly = false;
                description.ReadOnly = false;
                Button1.Attributes.Remove("disabled");
                Button2.Attributes.Remove("disabled");
                Button3.Attributes.Remove("disabled");
            }
            else
            {
                Response.Write("<script>alert('请选择图片');</script>");
            }
        }

        protected void Button1_Click(object sender, EventArgs e)
        {
            CarouselChange(1);
        }
        protected void Button2_Click(object sender, EventArgs e)
        {
            CarouselChange(2);
        }
        protected void Button3_Click(object sender, EventArgs e)
        {
            CarouselChange(3);
        }
        protected void Button4_Click(object sender, EventArgs e)
        {
            
        }

        private void CarouselChange(int index)
        {
            if (Image1.ImageUrl == string.Empty)
            {
                Response.Write("<script>alert('请先上传图片');</script>");
                return;
            }
            var carousel = new CarouselModel();
            carousel.carousel_id = index;
            carousel.image_url = Image1.ImageUrl;
            carousel.input_date = DateTime.Now;
            carousel.title = title.Text.Trim();
            carousel.sub_title = subtitle.Text.Trim();
            carousel.description = description.Text.Trim();
            if (CarouselBLL.CarouselChange(carousel))
            {
                Response.Write("<script>alert('轮播图 " + index + " 设置成功');window.location.href='/WebControlModular/CarouselManage.aspx';</script>"); // 成功
            }
            else
            {
                Response.Write("<script>alert('轮播图 " + index + " 设置失败！');</script>"); // 失败
            }
        }

        public string notNull(string ipt)
        {
            try
            {
                return (ipt == null || ipt == "") ? "" : ipt;
            }
            catch (Exception) {
                return "";
            }
        }
    }
}