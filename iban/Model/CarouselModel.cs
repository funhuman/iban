using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Model
{
    /// <summary>
    /// 轮播图模型
    /// </summary>
    public class Carousel
    {
        public int carousel_id { get; set; }
        public string image_url { get; set; }
        public string link_url { get; set; }
        public DateTime input_date { get; set; }
        public string title { get; set; }
        public string sub_title { get; set; }
        public string description { get; set; }
    }
    
    /// <summary>
    /// 轮播图模型
    /// </summary>
    public class CarouselModel
    {
        public int carousel_id { get; set; }
        public string image_url { get; set; }
        public string link_url { get; set; }
        public DateTime input_date { get; set; }
        public string title { get; set; }
        public string sub_title { get; set; }
        public string description { get; set; }
    }
}
