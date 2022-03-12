using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Model;
using System.Data.SqlClient;
using System.Data;
namespace DAL
{
    public static class indexDAL
    {
        /// <summary>
        /// 获取轮播图
        /// </summary>
        /// <returns>列表&lt;轮播图&gt;</returns>
        public static List<Carousel> getCarousel() {
            // 数据库访问
            string sql = "select carousel_id, image_url, link_url, title, sub_title from carousel";
            DataTable dt = DBHelper.executeReader(sql);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            // 存为对象
            List<Carousel> carouselList = new List<Carousel>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Carousel carousel = new Carousel();
                carousel.carousel_id = Convert.ToInt32(dt.Rows[i]["carousel_id"]);
                carousel.image_url = dt.Rows[i]["image_url"].ToString();
                carousel.link_url = dt.Rows[i]["link_url"].ToString();
                carousel.title = dt.Rows[i]["title"].ToString();
                carousel.sub_title = dt.Rows[i]["sub_title"].ToString();
                carouselList.Add(carousel);
            }
            return carouselList;
        }

        public static List<Notice> getNotice()
        {
            string sql = "select notice_id, notice_title, notice_time, notice_text, is_deleted from notice";
            DataTable dt = DBHelper.executeReader(sql);
            if (dt.Rows.Count <= 0)
            {
                return null;
            }
            List<Notice> noticeList = new List<Notice>(dt.Rows.Count);
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                Notice notice = new Notice();
                notice.notice_id = Convert.ToInt32(dt.Rows[i]["notice_id"]);
                notice.notice_title = dt.Rows[i]["notice_title"].ToString();
                notice.notice_time = Convert.ToDateTime(dt.Rows[i]["notice_time"]);
                notice.notice_text = dt.Rows[i]["notice_text"].ToString();
                notice.is_deleted = Convert.ToBoolean(dt.Rows[i]["is_deleted"]);
                noticeList.Add(notice);
            }
            return noticeList;
        }
    }
}
