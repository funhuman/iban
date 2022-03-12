using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Data.SqlClient;
using Model;

namespace DAL
{
    public static class CarouselDAL
    {
        /// <summary>
        /// 修改轮播图
        /// </summary>
        /// <param name="carousel">轮播图</param>
        /// <returns>是否成功</returns>
        public static bool CarouselChange(CarouselModel carousel)
        {
            string sql = "update carousel set image_url = @image_url, input_date = @input_date, title = @title, sub_title = @sub_title, description = @description where carousel_id = @carousel_id;";
            SqlParameter[] ps = {
                                    new SqlParameter("@carousel_id", carousel.carousel_id),
                                    new SqlParameter("@image_url", carousel.image_url),
                                    new SqlParameter("@input_date", DateTime.Now),
                                    new SqlParameter("@title", carousel.title),
                                    new SqlParameter("@sub_title", carousel.sub_title),
                                    new SqlParameter("@description", carousel.description),
                                };
            return DBHelper.executeQuery(sql, ps) > 0;
        }
    }
}
