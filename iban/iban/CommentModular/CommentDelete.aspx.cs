using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using BLL;

namespace UI.CommentModular
{
    public partial class CommentDelete : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!Page.IsPostBack)
            {
                try
                {
                    if (CommentBLL.deleteCommentById(Convert.ToInt32(Request["cid"]), Convert.ToInt32(Session["uid"])))
                    {
                        Response.Redirect(Request.UrlReferrer.ToString());
                    }
                    else
                    {
                        Response.Write("<script>alert('删除失败');window.location.href='/index.aspx';</script>");
                    }
                }
                catch (NullReferenceException)
                {
                    Response.Write("<script>alert('删除失败');window.location.href='/index.aspx';</script>");
                }
            }
        }
    }
}