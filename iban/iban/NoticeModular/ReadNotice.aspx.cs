using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace UI.NoticeModular
{
    public partial class ReadNotice : System.Web.UI.Page
    {
        protected Notice notice;
        protected string comment_text;
        protected void Page_Load(object sender, EventArgs e)
        {
                int nid;
                if (!int.TryParse(Request.QueryString["nid"], out nid))
                {
                    Response.Redirect("ReadNotice.aspx?nid=1");
                }
                int uid = Convert.ToInt32(Session["uid"]);
                if (uid == 0)
                {
                    comment_textbox.Enabled = false;
                    comment_textbox.Attributes.Add("placeholder", "请先登录");
                    submit.Text = "登录";
                }
                notice = NoticeBLL.getNoticeById(nid);
                comment_text = CommentBLL.getCommentByNoticeIdNotDelete(nid, Convert.ToInt32(Session["uid"]), 0);
        }

        /// <summary>
        /// 评论
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void submit_Click(object sender, EventArgs e)
        {
            int uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                // 未登录
                Response.Redirect("/UserModular/login.aspx");
            }
            int nid = 0;
            try
            {
                if (!int.TryParse(Request["nid"], out nid))
                {
                    return;
                }
            }
            catch (NullReferenceException)
            {
                Response.Write("<script>alert('用户未登录')</script>");
                Response.Redirect("/UserModular/login.aspx");
            }
            try
            {
                CommentModel comment = new CommentModel();
                comment.comment_father = nid;
                comment.uid = uid;
                comment.comment_text = comment_textbox.Text;
                comment.comment_time = DateTime.Now;
                Response.Write(comment.comment_text);
                if (Request["comment_textbox"].Trim() == "")
                {
                    Response.Write("<script>alert('评论不能为空！')</script>");
                    return;
                }
                CommentBLL.addComment(comment);
            }
            catch (NullReferenceException)
            {
                Response.Write("<script>alert('评论不能为空！')</script>");
                return;
            }
            // 刷新到上一个页面
            Response.Redirect(Request.UrlReferrer.ToString());
        }

    }
}