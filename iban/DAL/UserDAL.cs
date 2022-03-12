using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using System.Data;
using Model;
namespace DAL
{
    public static class UserDAL
    {
        /// <summary>
        /// 新增用户（用户注册）
        /// </summary>
        /// <param name="registerModel">用户模型</param>
        /// <returns>是否成功</returns>
        public static bool userRegister(User user)
        {
            string sql = "insert into user_info(username, password, usertype, nickname, profile_url, create_time, update_time, is_deleted) values(@username, @password, 1, @nickname, @profile_url, @create_time, @update_time, 0);";
            SqlParameter[] ps = {
                                    new SqlParameter("@username", user.username),
                                    new SqlParameter("@password", user.password),
                                    new SqlParameter("@nickname", user.nickname),
                                    new SqlParameter("@profile_url", user.profile_url),
                                    new SqlParameter("@create_time", DateTime.Now),
                                    new SqlParameter("@update_time", DateTime.Now)
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

        /// <summary>
        /// 根据用户编号获取用户信息
        /// </summary>
        /// <param name="uid">用户编号</param>
        /// <returns>用户</returns>
        public static User getUserById(int uid)
        {
            // 读取用户
            string sql = "select username, password, nickname, usertype from user_info where uid = @uid;";
            SqlParameter[] ps = { new SqlParameter("@uid", uid) };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            // 生成用户，向BLL层传递
            User user = new User();
            user.uid = uid;
            user.username = dt.Rows[0]["username"].ToString();
            user.password = dt.Rows[0]["password"].ToString();
            user.usertype = dt.Rows[0]["usertype"].ToString();
            user.nickname = dt.Rows[0]["nickname"].ToString();
            return user;
        }

        /// <summary>
        /// 根据用户名获取到用户信息
        /// </summary>
        /// <param name="username">用户名</param>
        /// <returns>用户</returns>
        public static User getUserByUsername(string username)
        {
            // 读取用户
            string sql = "select uid, password, usertype from user_info where username = @username;";
            SqlParameter[] ps = { new SqlParameter("@username", username) };
            DataTable dt = DBHelper.executeReader(sql, ps);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            // 生成用户，向BLL层传递
            User user = new User();
            user.uid = Convert.ToInt32(dt.Rows[0]["uid"]);
            user.username = username;
            user.password = dt.Rows[0]["password"].ToString();
            user.usertype = dt.Rows[0]["usertype"].ToString();
            return user;
        }

        /// <summary>
        /// 根据uid修改密码
        /// </summary>
        /// <param name="uid">用户编号</param>
        /// <param name="newpassword">新密码</param>
        /// <returns>是否成功</returns>
        public static bool changePasswordByID(string uid, string newpassword)
        {
            string sql = "update user_info set password = @password, update_time = @update_time where uid = @uid;";
            SqlParameter[] ps = {
                                    new SqlParameter("@uid", uid),
                                    new SqlParameter("@password", newpassword),
                                    new SqlParameter("@update_time", DateTime.Now)
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }
        /// <summary>
        /// 修改用户信息
        /// </summary>
        /// <param name="registerModel">用户模型</param>
        /// <returns>是否成功</returns>
        public static bool modUser(User user)
        {
            string sql = "update user_info set nickname = @nickname, profile_url = @profile_url, update_time = @update_time where uid = @uid;";
            SqlParameter[] ps = {
                                    new SqlParameter("@uid", user.uid),
                                    new SqlParameter("@nickname", user.nickname),
                                    new SqlParameter("@profile_url", user.profile_url),
                                    new SqlParameter("@update_time", DateTime.Now)
                                };
            return (DBHelper.executeQuery(sql, ps) > 0);
        }

        /// <summary>
        /// 查询用户表中是否有用户名
        /// </summary>
        /// <param name="username">待查询的用户名</param>
        /// <returns>是否存在</returns>
        public static bool isExistUsername(string username)
        {
            string sql = "select isnull((select 1 from user_info where username = @username),0);";
            SqlParameter[] ps = { new SqlParameter("@username", username) };
            return (Convert.ToInt32(DBHelper.executeReader(sql, ps).Rows[0][0]) != 0);
        }

        /// <summary>
        /// 查询用户表中是否有用户id
        /// </summary>
        /// <param name="uid">待查询的id</param>
        /// <returns>是否存在</returns>
        public static bool isExistUserId(int uid)
        {
            string sql = "select isnull((select 1 from user_info where uid = @uid),0);";
            SqlParameter[] ps = { new SqlParameter("@uid", uid) };
            return (Convert.ToInt32(DBHelper.executeReader(sql, ps).Rows[0][0]) != 0);
        }

        /// <summary>
        /// 查询用户表中是否有管理员id
        /// </summary>
        /// <param name="uid">待查询的管理员id</param>
        /// <returns>是否存在</returns>
        public static bool isExistAdminId(int uid)
        {
            string sql = "select isnull((select 1 from user_info where uid = @uid and usertype = '管理员'),0);";
            SqlParameter[] ps = { new SqlParameter("@uid", uid) };
            return (Convert.ToInt32(DBHelper.executeReader(sql, ps).Rows[0][0]) != 0);
        }
    }
}
