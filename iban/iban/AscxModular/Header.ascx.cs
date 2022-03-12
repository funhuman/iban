using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace UI.AscxModular
{
    public partial class Header : System.Web.UI.UserControl
    {
        protected User user;
        protected void Page_Load(object sender, EventArgs e)
        {
            user = UserBLL.getUserById(Convert.ToInt32(Session["uid"]));
            if (user == null)
            {
                user = new User();
                user.uid = 0;
                user.nickname = "游客";
            }
        }
    }
}