using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Model;
using BLL;
namespace UI.NoticeModular
{
    public partial class NoticeManage : System.Web.UI.Page
    {
        protected List<Model.Notice> notice;
        protected bool isAdmin;
        protected void Page_Load(object sender, EventArgs e)
        {
            int uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
            }
            isAdmin = UserBLL.adminCheckById(uid);
            notice = NoticeBLL.getNoticeNotDelete();
        }
        private void BindData()
        {
            ListView1.DataSource = notice;
            ListView1.DataBind();
        }
        protected void LikeQuery(object sender, EventArgs e)
        {
            if (TextBox1.Text == "") { return; }
            notice = NoticeBLL.LikeGetNoticeNotDelete(TextBox1.Text);
            BindData();
        }
        protected void NotLikeQuery(object sender, EventArgs e)
        {
            if (TextBox1.Text == "") { return; }
            notice = NoticeBLL.NotLikeGetNoticeNotDelete(TextBox1.Text);
            BindData();
        }
        protected void deleteButton_Click(object sender, EventArgs e)
        {
            if (NoticeBLL.DeleteNoticeByID(Convert.ToInt32((sender as LinkButton).CommandArgument))) { Response.Redirect(Request.Path); }
        }

        protected void DataPager1_PreRender(object sender, EventArgs e)
        {
            BindData();
        }
    }
}