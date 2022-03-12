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
namespace UI.TaskModular
{
    public partial class TaskChange : System.Web.UI.Page
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
                if (!int.TryParse(Request["tid"], out nid) || nid <= 0)
                {
                    changeButton.Text = "添加";
                }
                else
                {
                    changeButton.Text = "修改";
                    TaskModel task = TaskBLL.getTaskNoDelById(nid);
                    task_name.Text = task.task_name;
                    create_time.Text = task.create_time.ToString("yyyy-MM-dd HH:mm");
                    start_time.Text = task.start_time.ToString("yyyy-MM-dd HH:mm");
                    expiration_time.Text = task.expiration_time.ToString("yyyy-MM-dd HH:mm");
                    if (task_name.Text == null) { Response.Write("出错了！"); }
                    task_text.Text = Server.HtmlDecode(task.task_text);
                }
            }
        }

        protected void changeButton_Click(object sender, EventArgs e)
        {
            try
            {
                TaskModel task = new TaskModel();
                task.task_name = task_name.Text;
                task.task_text = Server.HtmlEncode(task_text.Text);
                task.create_time = (create_time.Text == "" ? DateTime.Now : Convert.ToDateTime(create_time.Text));
                task.start_time = (start_time.Text == "" ? DateTime.Now : Convert.ToDateTime(start_time.Text));
                task.expiration_time = (expiration_time.Text == "" ? DateTime.Now : Convert.ToDateTime(expiration_time.Text));
                if (Convert.ToInt32(Request["tid"]) <= 0)
                {
                    // 添加
                    if (TaskBLL.insertTask(task))
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
                    task.task_id = Convert.ToInt32(Request["tid"]);
                    if (TaskBLL.updateTask(task))
                    {
                        Response.Redirect("TaskManage.aspx");
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