<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="UserChange.aspx.cs" Inherits="UI.UserModular.UserChange" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
  <title>用户信息维护</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/login.min.css">
  <link rel="stylesheet" href="/css/fileinput.min.css">
</head>
<body>
  <div class="login-bg">
    <div class="container">
      <div class="row center">
        <div class="login-box tile">
          <form id="Form1" method="post" runat="server">
            <h2 class="login-title">用户信息维护</h2>
            <div class="form-group">
              <label class="col-xs-3">用户名</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <asp:TextBox ID="usernameTextBox" CssClass="form-control" runat="server" MaxLength="20" ReadOnly></asp:TextBox>
              </div>
            </div><!-- /.form-group -->
<%--        <div class="form-group">
              <label class="col-xs-3">密码</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <asp:TextBox ID="passwordTextBox" CssClass="form-control" runat="server" MaxLength="16" TextMode="Password" placeholder="密码不超过16字符哦" autocomplete="current-password"></asp:TextBox>
              </div>
            </div><!-- /.form-group -->--%>
            <div class="form-group">
              <label class="col-xs-3">昵称</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-pencil"></span></span>
                <asp:TextBox ID="nicknameTextBox" CssClass="form-control" runat="server" MaxLength="16" placeholder="昵称（选填）"></asp:TextBox>
              </div>
            </div><!-- /.form-group -->
            <%--<div class="form-group">
              <label class="col-xs-3">头像</label>
              <div class="input-group col-xs-9">
                <input id="profileInput" type="file" name="image" width="288px"/>
              </div>
            </div><!-- /.form-group -->--%>
            <div class="login-warning" id="warn" runat="server" style="display:none">
              <span class="glyphicon glyphicon-minus-sign"></span>
              <asp:Label ID="warnText" runat="server" Text="Label"></asp:Label>
            </div>
            <div class="form-group">
              <div class="col-xs-1"></div>
              <div class="col-xs-4">
                <asp:Button ID="SubmitButton" CssClass="btn btn-primary btn-block" runat="server" Text="修改" OnClick="SubmitButton_Click" /> 
              </div>
              <div class="col-xs-2"></div>
              <div class="col-xs-4">
                <a class="btn btn-primary btn-block" href="/index.aspx">返回</a>
              </div>
              <div class="col-xs-1"></div>
            </div>
          </form>
      </div>
    </div>
  </div>
    <div class="login-copy container">
      <p>
        Copyright &copy; <span id="copyyear"></span>&nbsp;XX网
      </p>
    </div>
  </div>
  <!-- JavaScript -->
  <script src="/js/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/default.js"></script>
  <%--<script src="/js/login.js"></script>--%>
  <%--<script src="/js/register.js"></script>--%>
  <script src="/js/fileinput/piexif.min.js"></script>
  <script src="/js/fileinput/fileinput.min.js"></script>
  <script src="/js/fileinput/theme.js"></script>
  <script src="/js/fileinput/zh.js"></script>
</body>
</html>