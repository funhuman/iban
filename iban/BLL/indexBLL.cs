using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;
using System.Data;
namespace BLL
{
    public class indexBLL
    {
        /// <summary>
        /// 获取轮播图的HTML字符串
        /// </summary>
        /// <returns></returns>
        public static string getCarouseRollString()
        {
            // 从DAL层访问数据库，并拿到CarouseList
            List<Carousel> carouseList = indexDAL.getCarousel();
            // HTML字符串的格式
            // <div class="item active">
            //   <img src="images/Carousel01.jpg" alt="First slide">
            //   <div class="carousel-caption">标题 1</div>
            // </div>
            string RollString = "";
            if (carouseList.Count != 0)
            {
                for (int i = 0; i < carouseList.Count; i++)
                {
                    RollString += ((i == 0) ? "<div class='item active'>" : "<div class='item'>");
                    RollString += "<a href='" + carouseList.ElementAt(i).link_url + "'>";
                    RollString += "<img src='" + carouseList.ElementAt(i).image_url + "' alt='" + carouseList.ElementAt(i).carousel_id + "'></a>";
                    RollString += "<div class='carousel-caption'>" + carouseList.ElementAt(i).title + (carouseList.ElementAt(i).sub_title == "" ? "" : "<br>" + carouseList.ElementAt(i).sub_title) + "</div>";
                    RollString += "</div>";
                }
            }
            return RollString;
        }

        /// <summary>
        /// 获取通知的HTML字符串
        /// </summary>
        /// <returns>通知的HTML字符串</returns>
        public static string getNoticeString(int num = 0)
        {
            // 从DAL层访问数据库，并拿到CarouseList
            List<Notice> noticeList = NoticeBLL.getNoticeNotDelete(num);
            // HTML字符串的格式
            // <p><a href="./NoticeModular/ReadNotice.aspx?nid={通知编号}">{通知标题}</a><span class="pull-right">{通知日期}</span></p>
            // 字符串处理
            string NoticeString = "";
            if (noticeList.Count != 0)
            {
                for (int i = 0; i < noticeList.Count; i++)
                {
                    NoticeString += string.Format("<p><a href='./NoticeModular/ReadNotice.aspx?nid={0}'>{1}</a><span class='pull-right'>{2}</span></p>",
                        noticeList.ElementAt(i).notice_id,
                        noticeList.ElementAt(i).notice_title,
                        Convert.ToDateTime(noticeList.ElementAt(i).notice_time.ToString()).ToString("yyyy-MM-dd HH:mm")
                    );
                }
            }
            return NoticeString;
        }
    }
}
