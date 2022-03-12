using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using System.Data;
using System.Data.SqlClient;

namespace DAL
{
    public static class CalendarDAL
    {
        /// <summary>
        /// 获取校历日期
        /// </summary>
        /// <returns>校历日期</returns>
        public static CalendarModel getCalendar()
        {
            string sql = "select ddate from calendar where did = 1";
            DataTable dt = DBHelper.executeReader(sql);
            CalendarModel calendar = new CalendarModel();
            calendar.ddate = Convert.ToDateTime(dt.Rows[0]["ddate"]);
            return calendar;
        }

        /// <summary>
        /// 修改校历日期
        /// </summary>
        /// <returns>是否成功</returns>
        /// 
        public static bool setCalendar(CalendarModel calendar)
        {
            string sql = "update calendar set ddate = @ddate where did = 1";
            SqlParameter[] ps = { new SqlParameter("@ddate", calendar.ddate) };
            return DBHelper.executeQuery(sql, ps) > 0;
        }
    }
}
