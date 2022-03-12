using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    /// <summary>
    /// 数据库访问类（DAL辅助类）
    /// </summary>
    public static class DBHelper
    {
        // 定义 SqlCommand
        private static SqlCommand cmd = null;

        // 获取连接字符串
        public static string connstring = System.Configuration.ConfigurationManager.ConnectionStrings["MyConn"].ToString();

        // 新建连接
        public static SqlConnection conn = new SqlConnection(connstring);

        // 判断连接状态
        public static SqlConnection getConnectionState()
        {
            if (conn.State == ConnectionState.Closed)
            {
                conn.Open();
            }
            return conn;
        }

        /// <summary>
        /// 执行不带参数查询
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <returns>DataTable</returns>
        public static DataTable executeReader(string sql)
        {
            cmd = new SqlCommand(sql, getConnectionState());
            DataTable dt = new DataTable();
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                dt.Load(sdr);
            }
            return dt;
        }

        /// <summary>
        /// 执行带参数的查询语句
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <param name="ps">参数</param>
        /// <returns>DataTable</returns>
        public static DataTable executeReader(string sql, SqlParameter[] ps)
        {
            cmd = new SqlCommand(sql, getConnectionState());
            cmd.Parameters.AddRange(ps);
            DataTable dt = new DataTable();
            using (SqlDataReader sdr = cmd.ExecuteReader())
            {
                dt.Load(sdr);
            }
            return dt;
        }

        /// <summary>
        /// 执行增删改的语句
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <returns>受影响的行数</returns>
        public static int executeQuery(string sql)
        {
            int res;
            cmd = new SqlCommand(sql, getConnectionState());
            res = cmd.ExecuteNonQuery();
            return res;
        }

        /// <summary>
        /// 执行增删改的语句
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <param name="ps">参数</param>
        /// <returns>受影响的行数</returns>
        public static int executeQuery(string sql, SqlParameter[] ps)
        {
            int res;
            cmd = new SqlCommand(sql, getConnectionState());
            cmd.Parameters.AddRange(ps);
            res = cmd.ExecuteNonQuery();
            return res;
        }

        /// <summary>
        /// 执行查询
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <returns>查到的对象，没查到为null</returns>
        public static object executeScalar(string sql)
        {
            cmd = new SqlCommand(sql, getConnectionState());
            return cmd.ExecuteScalar();
        }

        /// <summary>
        /// 执行带参数查询
        /// </summary>
        /// <param name="sql">SQL语句</param>
        /// <param name="ps">参数</param>
        /// <returns>查到的对象，没查到为null</returns>
        public static object executeScalar(string sql, SqlParameter[] ps)
        {
            cmd = new SqlCommand(sql, getConnectionState());
            cmd.Parameters.AddRange(ps);
            return cmd.ExecuteScalar();
        }
    }
}
