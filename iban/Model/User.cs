using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 用户模型
    /// </summary>
    public class User
    {
        public int uid { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string usertype { get; set; }
        public string nickname { get; set; }
        public string profile_url { get; set; }
        public bool is_deleted { get; set; }
    }
    /// <summary>
    /// 登录状态
    /// </summary>
    public enum LoginState { ok, usernamenull, passwordnull, usernameerror, passworderror };
    /// <summary>
    /// 登录模型
    /// </summary>
    public class LoginModel
    {
        public LoginState loginState { get; set; }
        public int uid { get; set; }
        public string usertype { get; set; }
    }
}
