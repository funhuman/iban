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
    public partial class Register : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }
        protected void SubmitButton_Click(object sender, EventArgs e)
        {
            User user = new User();
            user.username = usernameTextBox.Text;
            user.password = Encoded.encoded(passwordTextBox.Text);
            user.nickname = nicknameTextBox.Text;
            user.profile_url = "";
            if (UserBLL.userRegister(user))
            {
                Response.Write("<script>alert('注册成功')</script>");
                Response.Redirect("Login.aspx");
            }
            else
            {
                Response.Write("<script>alert('注册失败')</script>");
            }
        }
    }
}