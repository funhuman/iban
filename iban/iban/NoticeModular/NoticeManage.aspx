<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="NoticeManage.aspx.cs" Inherits="UI.NoticeModular.NoticeManage" %>
<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title><%=isAdmin ? "通知管理" : "更多通知"%></title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/default.css">
</head>
<body>
  <Header:Header ID="Header" runat="server"></Header:Header>
  <form id="form1" runat="server">
    <div class="container">
      <div class="col-lg-12">
        <div class="panne panel-default">
          <div class="panel-heading">
            <h4><%=isAdmin ? "通知管理" : "更多通知"%></h4>
            <div class="row">
              <div class="col-xs-12">
                通知标题：<asp:TextBox ID="TextBox1" runat="server" CssClass="form-control inline" Width="25%"></asp:TextBox>&nbsp;
                <div class="btn-group btn-group-toggle">
                  <asp:Button ID="Button1" runat="server" Text="模糊查询" CssClass="btn btn-primary" OnClick="LikeQuery" />
                  <asp:Button ID="Button2" runat="server" Text="精确查询" CssClass="btn btn-info"  OnClick="NotLikeQuery" />
                  <%=isAdmin ? "<a href='NoticeChange.aspx' class='btn btn-success'>添加</a>" : ""%>
                </div>
              </div>
            </div>
          </div>
          <div class="panel-body">
            <table class="table table-hover table-responsive text-center">
              <thead>
                <tr>
                  <th>
                    通知编号
                  </th>
                  <th>
                    通知标题
                  </th>
                  <th>
                    通知时间
                  </th>
                  <th>
                    最后编辑
                  </th>
                   <%=isAdmin ? "<th>操作</th>" : ""%>
                </tr>
              </thead>
              <tbody>
                <asp:ListView ID="ListView1" runat="server">
                  <ItemTemplate>
                    <tr>
                      <td>
                        <%# Eval("notice_id")%>
                      </td>
                      <td>
                        <a href="ReadNotice.aspx?nid=<%# Eval("notice_id")%>">
                          <%# Eval("notice_title")%>
                        </a>
                      </td>
                      <td>
                        <%# Convert.ToDateTime(Eval("notice_time")).ToString("yyyy-MM-dd HH:mm")%>
                      </td>
                      <td>
                        <%# Eval("notice_editor")%>
                      </td>
                      <td <%=isAdmin?"":"class='hidden'" %>>
                        <a href='NoticeChange.aspx?nid=<%# Eval("notice_id") %>' class="btn btn-sm btn-primary">编辑</a> 
                        <asp:LinkButton OnClick="deleteButton_Click" CommandArgument='<%#Eval("notice_id") %>' class="btn btn-sm btn-danger" runat="server" Text="删除" />
                      </td>
                    </tr>
                  </ItemTemplate>
                </asp:ListView>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <asp:DataPager ID="DataPager1" runat="server" PagedControlID="ListView1" 
        onprerender="DataPager1_PreRender">
          <Fields>
              <asp:NextPreviousPagerField ButtonType="Button" ShowFirstPageButton="True" 
                  ShowNextPageButton="False" ShowPreviousPageButton="False" />
              <asp:NumericPagerField />
              <asp:NextPreviousPagerField ButtonType="Button" ShowLastPageButton="True" 
                  ShowNextPageButton="False" ShowPreviousPageButton="False" />
          </Fields>
      </asp:DataPager>
    </div>
  </form>
  <Footer:Footer ID="Footer" runat="server"></Footer:Footer>
  <script src="/js/jquery.min.js" type="text/javascript"></script>
  <script src="/js/bootstrap.min.js" type="text/javascript"></script>
</body>
</html>
