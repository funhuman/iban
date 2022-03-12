using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Data.SqlClient;
using BLL;
using Model;
namespace UI.UserModular
{
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (Request["type"] == "exit")
            {
                Session.Remove("uid");
            }
            // 是否第一次打开
            if (!IsPostBack)
            {
                // 记住密码
                if (Request["username"] != null && Request["username"] != "")
                {
                    usernameTextBox.Text = Request["username"];
                    passwordTextBox.Attributes.Add("value", Request["password"]);
                    CheckBox1.Checked = true;
                }
            }
            // 默认账号密码
            // usernameTextBox.Text = "Admin";
            // passwordTextBox.Attributes.Add("value", "Ad.123");
        }
        protected void LoginButton_Click(object sender, EventArgs e)
        {
            // 获取用户名和密码
            string username = usernameTextBox.Text.Trim();
            string password = passwordTextBox.Text.Trim();
            // if (password == "") { warnText.Text = "密码不能为空！"; return; }
            //Response.Write(password);//测试代码
            //Response.Write(Encoded.encoded(password));//测试代码
            LoginModel loginModel = UserBLL.login(username, Encoded.encoded(password));
            if (loginModel.loginState == LoginState.usernamenull) { warnText.Text = "用户名不能为空！"; }
            if (loginModel.loginState == LoginState.passwordnull) { warnText.Text = "密码不能为空！"; }
            if (loginModel.loginState == LoginState.usernameerror)
            {
                warnText.Text = "用户名不存在！";
                passwordTextBox.Attributes.Remove("value");

            }
            if (loginModel.loginState == LoginState.passworderror)
            {
                warnText.Text = "密码错误！";
                passwordTextBox.Attributes.Remove("value");

            }
            if (loginModel.loginState != LoginState.ok)
            {
                warn.Attributes.Add("style", "display: block");
                return;
            }
            // 成功登录：写入Cookie 写入Session 跳转页面
            if (CheckBox1.Checked)
            {
                Response.Write("Checked"); // 测试代码
                // 设置 Cookie
                HttpCookie usernameCookie = new HttpCookie("username");
                HttpCookie passwordCookie = new HttpCookie("password");
                usernameCookie.Value = username;
                passwordCookie.Value = password; // 密码加密保存
                // 设置 Cookie 的有效时间
                DateTime now = DateTime.Now;
                usernameCookie.Expires = now.AddDays(7);
                passwordCookie.Expires = now.AddDays(7);
                // 将 Cookie 添加到 cookie 集合
                Response.Cookies.Add(usernameCookie);
                Response.Cookies.Add(passwordCookie);
            }
            else
            {
                // 清空Cookie
                HttpCookie usernameCookie = new HttpCookie("username");
                HttpCookie passwordCookie = new HttpCookie("password");
                Response.Cookies.Add(usernameCookie);
                Response.Cookies.Add(passwordCookie);
            }
            Session["uid"] = loginModel.uid;
            Response.Redirect("/index.aspx");
        }
    }
}