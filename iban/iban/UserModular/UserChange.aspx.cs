using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;
using Model;

namespace UI.UserModular
{
    public partial class UserChange : System.Web.UI.Page
    {
        int uid = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
            uid = Convert.ToInt32(Session["uid"]);
            if (uid == 0)
            {
                Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
            }
            if (!IsPostBack)
            {
                Response.Write(uid);
                User user = UserBLL.getUserById(uid);
                if (user == null)
                {
                    Response.Write("<script>alert('请先登录');window.location.href='/UserModular/Login.aspx';</script>");
                }
                else
                {
                    usernameTextBox.Text = user.username.Trim();
                    nicknameTextBox.Text = user.nickname.Trim();
                }
            }
        }
        protected void SubmitButton_Click(object sender, EventArgs e)
        {
            User user = new User();
            user.uid = uid;
            user.nickname = nicknameTextBox.Text;
            user.profile_url = "";
            if (UserBLL.modUser(user))
            {
                Response.Write("<script>alert('修改成功')</script>");
                Response.Redirect("/index.aspx");
            }
            else
            {
                Response.Write("<script>alert('修改失败')</script>");
            }
        }
    }
}