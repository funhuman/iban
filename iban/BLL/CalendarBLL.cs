using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public static class CalendarBLL
    {
        /// <summary>
        /// 获取校历日期
        /// </summary>
        /// <returns>校历日期</returns>
        public static CalendarModel getCalendar()
        {
            return CalendarDAL.getCalendar();
        }

        /// <summary>
        /// 修改校历日期
        /// </summary>
        /// <returns>是否成功</returns>
        public static bool setCalendar(CalendarModel calendar)
        {
            return CalendarDAL.setCalendar(calendar);
        }

        /// <summary>
        /// 计算周数
        /// </summary>
        /// <param name="calendar"></param>
        /// <returns>weeks</returns>
        public static int getWeeks(CalendarModel calendar)
        {
            return getWeeks(calendar.ddate);
        }

        private static int getWeeks(DateTime date)
        {
            return Convert.ToInt32((DateTime.Now - date.AddDays(1 - Convert.ToInt32(date.DayOfWeek.ToString("d")))).TotalDays / 7);
        }
    }
}
