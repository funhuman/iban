using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace UI.WebControlModular
{
    public partial class CalendarManage : System.Web.UI.Page
    {
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
            if (!IsPostBack)
            {
                CalendarModel calendar = CalendarBLL.getCalendar();
                datetimepicker.Text = calendar.ddate.ToString("yyyy-MM-dd");
            }
        }
        protected void Button1_Click(object sender, EventArgs e)
        {
            try
            {
                CalendarModel calendar = new CalendarModel();
                calendar.ddate = Convert.ToDateTime(Request["datetimepicker"]);
                if (CalendarBLL.setCalendar(calendar))
                {
                    Response.Write("<script>alert('保存成功');window.location.href='/index.aspx';</script>");
                }
                else
                {
                    Response.Write("<script>alert('保存失败');</script>");
                }
            }
            catch (FormatException)
            {
                Response.Write("<script>alert('请输入格式正确的日期');</script>");
            }
        }
    }
}