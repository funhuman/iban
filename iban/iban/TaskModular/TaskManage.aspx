<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="TaskManage.aspx.cs" Inherits="UI.TaskModular.TaskManage" %>

<%@ Register TagPrefix="Header" TagName="Header" Src="/AscxModular/Header.ascx" %>
<%@ Register TagPrefix="Footer" TagName="Footer" Src="/AscxModular/Footer.ascx" %>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1">
  <link href="/images/favicon.ico" rel="shortcut icon" type="image/x-icon">
  <title>任务管理 - iban 网</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/index.css">
  <link rel="stylesheet" href="/css/default.css">
</head>
<body>
    <Header:Header ID="Header" runat="server"></Header:Header>
  <form id="form1" runat="server">
    <div class="container">
      <div class="col-lg-12">
        <div class="panne panel-default">
          <div class="panel-heading">
            <h4><%=isAdmin ? "任务管理" : "更多任务"%></h4>
            <%--<div class="row">
              <div class="col-xs-12">
                任务标题：<asp:TextBox ID="TextBox1" runat="server" CssClass="form-control inline" Width="25%"></asp:TextBox>&nbsp;
                <div class="btn-group btn-group-toggle">
                  <asp:Button ID="Button1" runat="server" Text="模糊查询" CssClass="btn btn-primary" OnClick="LikeQuery" />
                  <asp:Button ID="Button2" runat="server" Text="精确查询" CssClass="btn btn-info"  OnClick="NotLikeQuery" />
                  <%=isAdmin ? "<a href='TaskChange.aspx' class='btn btn-success'>添加</a> " : ""%>
                </div>
              </div>
            </div>--%>
          </div>
          <div class="panel-body">
            <table class="table table-hover table-responsive text-center">
              <thead>
                <tr>
                  <th>
                    任务标题
                  </th>
                  <th>
                    创建时间
                  </th>
                  <th>
                    开始时间
                  </th>
                  <th>
                    结束时间
                  </th>
                   <%=isAdmin ? "<th>操作</th>" : ""%>
                </tr>
              </thead>
              <tbody>
                <asp:ListView ID="ListView1" runat="server">
                  <ItemTemplate>
                    <tr>
                      <td>
                        <a href="TaskRead.aspx?tid=<%# Eval("task_id")%>">
                          <%# Eval("task_name")%>
                        </a>
                      </td>
                      <td>
                        <%# Convert.ToDateTime(Eval("create_time")).ToString("yyyy-MM-dd HH:mm")%>
                      </td>
                      <td>
                        <%# Convert.ToDateTime(Eval("start_time")).ToString("yyyy-MM-dd HH:mm")%>
                      </td>
                      <td>
                        <%# Convert.ToDateTime(Eval("expiration_time")).ToString("yyyy-MM-dd HH:mm")%>
                      </td>
                      <td <%=isAdmin?"":"class='hidden'" %>>
                        <a href='TaskChange.aspx?tid=<%# Eval("task_id") %>' class="btn btn-sm btn-primary">编辑</a> 
                        <asp:LinkButton ID="LinkButton1" OnClick="deleteButton_Click" CommandArgument='<%#Eval("task_id") %>' class="btn btn-sm btn-danger" runat="server" Text="删除" />
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
  <script src="/js/default.js"></script>
</body>
</html>
