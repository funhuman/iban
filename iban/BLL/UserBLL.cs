using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using Model;
using DAL;
namespace BLL
{
    public static class UserBLL
    {
        /// <summary>
        /// 登录BLL
        /// </summary>
        /// <param name="username">用户名</param>
        /// <param name="password">密码</param>
        /// <returns>&lt;LoginModel&gt;登录模型</returns>
        public static LoginModel login(string username, string password)
        {
            // 定义返回值登录模型
            LoginModel loginModel = new LoginModel();
            // 判断输入的用户名和密码是否非空
            if (username == "")
            {
                loginModel.loginState = LoginState.usernamenull;
                return loginModel;
            }
            if (password == "")
            {
                loginModel.loginState = LoginState.passwordnull;
                return loginModel;
            }
            // 查询用户
            User user = UserDAL.getUserByUsername(username);
            // 不存在此用户名
            if (user == null)
            {
                loginModel.loginState = LoginState.usernameerror;
                return loginModel;
            }
            // 密码错误
            if (user.password.Trim() != password.Trim())
            {
                loginModel.loginState = LoginState.passworderror;
                return loginModel;
            }
            // 成功登录
            loginModel.uid = user.uid;
            loginModel.usertype = user.usertype;
            loginModel.loginState = LoginState.ok;
            return loginModel;
        }

        public static bool userRegister(User user)
        {
            return UserDAL.userRegister(user);
        }

        /// <summary>
        /// 用户权限验证
        /// </summary>
        /// <param name="uid">用户编号</param>
        /// <returns>is存在用户</returns>
        public static bool userCheckById(int uid)
        {
            return UserDAL.isExistUserId(uid);
        }

        /// <summary>
        /// 管理权限验证
        /// </summary>
        /// <param name="uid">用户编号</param>
        /// <returns>is管理员</returns>
        public static bool adminCheckById(int uid)
        {
            return UserDAL.isExistAdminId(uid);
        }

        /// <summary>
        /// 获取用户信息
        /// </summary>
        /// <param name="uid">用户编号</param>
        /// <returns>用户信息</returns>
        public static User getUserById(int uid)
        {
            return UserDAL.getUserById(uid);
        }

        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="user">用户</param>
        /// <returns>是否成功</returns>
        public static bool modUser(User user)
        {
            return UserDAL.modUser(user);
        }
    }
}
