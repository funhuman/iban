using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using System.Data;
using BLL;
using Model;
namespace UI
{
    public partial class index : System.Web.UI.Page
    {
        protected string RollString;
        protected string NoticeString;
        protected string Weeks;
        protected User user;
        protected void Page_Load(object sender, EventArgs e)
        {
            user = UserBLL.getUserById(Convert.ToInt32(Session["uid"]));
            if (user == null) {
                user = new User();
                user.nickname = "游客";
            }
            RollString = indexBLL.getCarouseRollString();
            NoticeString = indexBLL.getNoticeString(10);
            Weeks = CalendarBLL.getWeeks(CalendarBLL.getCalendar()).ToString();
        }
    }
}