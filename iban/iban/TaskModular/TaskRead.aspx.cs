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
    public partial class TaskRead : System.Web.UI.Page
    {
        protected TaskModel task;
        protected string comment_text;
        protected double progress;
        protected void Page_Load(object sender, EventArgs e)
        {
                int tid;
                if (!int.TryParse(Request.QueryString["tid"], out tid))
                {
                    Response.Redirect("TaskRead.aspx?tid=1");
                }
                task = TaskBLL.getTaskNoDelById(tid);
                progress = (DateTime.Now - task.start_time).TotalMinutes / (task.expiration_time - task.start_time).TotalMinutes; // 已过日期/总日期
                int uid = Convert.ToInt32(Session["uid"]);
                if (uid == 0)
                {
                    task_finish.Text = "登录";
                }
                else
                {
                    TaskStateModel taskState = TaskBLL.getTaskState(tid, uid);
                    if (taskState == null)
                    {
                        TaskStateModel newTaskState = new TaskStateModel();
                        newTaskState.task_id = tid;
                        newTaskState.uid = uid;
                        TaskBLL.readTask(newTaskState);
                        return;
                    }
                    if (taskState.is_click)
                    {
                        task_finish.Enabled = false;
                        task_finish.Text = "已完成";
                    }
                }
               // comment_text = CommentBLL.getCommentBytaskIdNotDelete(nid, Convert.ToInt32(Session["uid"]), 0);
        }

        /// <summary>
        /// 完成任务
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
            int tid = 0;
            try
            {
                if (!int.TryParse(Request["tid"], out tid))
                {
                    return;
                }
            }
            catch (NullReferenceException)
            {
                Response.Write("<script>alert('任务不存在');window.location.href='index.aspx';</script>");
            }
            TaskStateModel taskState = new TaskStateModel();
            taskState.task_id = tid;
            taskState.uid = uid;
            TaskBLL.finishTask(taskState);
            // 刷新到上一个页面
            Response.Redirect(Request.UrlReferrer.ToString());
        }
    }
}