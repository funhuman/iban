using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using DAL;
using Model;

namespace BLL
{
    public static class CarouselBLL
    {
        public static bool CarouselChange(CarouselModel carouse)
        {
            return CarouselDAL.CarouselChange(carouse);
        }
    }
}
