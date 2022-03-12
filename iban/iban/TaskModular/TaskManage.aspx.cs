using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;
namespace UI.TaskModular
{
    public partial class TaskManage : System.Web.UI.Page
    {
        protected List<TaskModel> taskList;
        protected bool isAdmin;
        protected void Page_Load(object sender, EventArgs e)
        {
            int uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
            }
            isAdmin = UserBLL.adminCheckById(uid);
            taskList = TaskBLL.getTaskNoDel();
        }
        private void BindData()
        {
            ListView1.DataSource = taskList;
            ListView1.DataBind();
        }
        //protected void LikeQuery(object sender, EventArgs e)
        //{
        //    if (TextBox1.Text == "") { return; }
        //    taskList = TaskBLL.LikeGetNoticeNotDelete(TextBox1.Text);
        //    BindData();
        //}
        //protected void NotLikeQuery(object sender, EventArgs e)
        //{
        //    if (TextBox1.Text == "") { return; }
        //    taskList = TaskBLL.NotLikeGetNoticeNotDelete(TextBox1.Text);
        //    BindData();
        //}
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