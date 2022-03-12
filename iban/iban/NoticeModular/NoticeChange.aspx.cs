using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Configuration;
using Model;
using BLL;
namespace UI.NoticeModular
{
    public partial class NoticeChange : System.Web.UI.Page
    {
        int uid;
        protected void Page_Load(object sender, EventArgs e)
        {
            uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
            }
            else if (!UserBLL.adminCheckById(uid))
            {
                Response.Write("<script>alert('权限不足');window.location.href='/index.aspx';</script>");
            }
            if (!IsPostBack)
            {
                int nid;
                if (!int.TryParse(Request["nid"], out nid) || nid <= 0)
                {
                    changeButton.Text = "添加";
                }
                else
                {
                    changeButton.Text = "修改";
                    Notice notice = NoticeBLL.getNoticeById(nid);
                    notice_title.Text = notice.notice_title;
                    if (notice_title.Text == null) { Response.Write("出错了！"); }
                    notice_text.Text = Server.HtmlDecode(notice.notice_text);
                    notice_time.Text = notice.notice_time.ToString("yyyy-MM-dd HH:mm");
                }
            }
        }

        protected void changeButton_Click(object sender, EventArgs e)
        {
            try
            {
                Notice notice = new Notice();
                notice.notice_title = notice_title.Text;
                notice.notice_text = Server.HtmlEncode(notice_text.Text);
                notice.notice_time = (notice_time.Text == "" ? DateTime.Now : Convert.ToDateTime(notice_time.Text));
                notice.notice_creater = uid;
                notice.notice_editor = uid;
                if (Convert.ToInt32(Request["nid"]) <= 0)
                {
                    // 添加
                    notice.notice_editor = Convert.ToInt32(Session["uid"]);
                    if (NoticeBLL.addNotice(notice))
                    {
                        Response.Redirect(Request.Path.ToString() + "?AddCount=" + (Convert.ToInt32(Request["AddCount"]) + 1));
                    }
                    else
                    {
                        Response.Write("<script>alert('添加失败')</script>");
                    }
                }
                else
                {
                    // 修改
                    notice.notice_id = Convert.ToInt32(Request["nid"]);
                    if (NoticeBLL.UpdateNotice(notice))
                    {
                        Response.Redirect("NoticeManage.aspx");
                    }
                    else
                    {
                        Response.Write("<script>alert('编辑失败')</script>");
                    }
                }
            }
            catch (FormatException)
            {
                Response.Write("<script>alert('输入格式异常')</script>");
            }
        }
    }
}