<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Register.aspx.cs" Inherits="UI.UserModular.Register" %>
<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
  <title>用户注册</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css">
  <link rel="stylesheet" href="/css/login.min.css">
  <link rel="stylesheet" href="/SlideToUnlock/css/verify.css">
  <link rel="stylesheet" href="/css/fileinput.min.css">
  <link rel="stylesheet" href="/css/register.min.css">
</head>
<body>
  <div class="login-bg">
    <div class="container">
      <div class="row center">
        <div class="login-box tile">
          <form id="Form1" method="post" runat="server" class="form-horizontal">
            <h2 class="login-title">注册</h2>
            <div class="form-group">
              <label class="col-xs-3">用户名</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <asp:TextBox ID="usernameTextBox" CssClass="form-control" runat="server" MaxLength="20" placeholder="用户名不能修改"></asp:TextBox>
              </div>
            </div><!-- /.form-group -->
            <div class="form-group">
              <label class="col-xs-3">密码</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <asp:TextBox ID="passwordTextBox" CssClass="form-control" runat="server" MaxLength="16" TextMode="Password" placeholder="密码不超过16字符哦" autocomplete="current-password"></asp:TextBox>
              </div>
            </div><!-- /.form-group -->
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
            <div class="form-group">
              <div class="remember-pwd pull-right">
                <a href="#" class="hyper-link">忘记密码？</a>&nbsp;
                <a href="/UserModular/Login.aspx">登录</a>
              </div>
            </div><!-- /.form-group -->
            <div class="login-warning" id="warn" runat="server" style="display:none">
              <span class="glyphicon glyphicon-minus-sign"></span>
              <asp:Label ID="warnText" runat="server" Text="Label"></asp:Label>
            </div><!-- /.form-group -->

            <div class="form-group">
              <button class="btn btn-primary btn-block" type="button" id="login-button" onclick="login()">注册</button>
            </div>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content center">
                  <div id="SlideToUnlock">
                  </div>
                  <asp:Button ID="SubmitButton" CssClass="btn btn-primary hidden" runat="server" Text="注册" OnClick="SubmitButton_Click" /> 
                </div><!-- /.modal-dialog -->
              </div>
            </div><!-- /.modal -->
          </form>
      </div>
    </div>
  </div>
  <div class="login-copy container">
    <p>
      Copyright &copy; <span id="copyyear"></span>&nbsp;XX网
    </p>
  </div>
  <!-- JavaScript -->
  <script src="/js/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/default.js"></script>
  <script src="/js/login.js"></script>
  <script src="/js/register.js"></script>
  <script src="/js/fileinput/piexif.min.js"></script>
  <script src="/js/fileinput/fileinput.min.js"></script>
  <script src="/js/fileinput/theme.js"></script>
  <script src="/js/fileinput/zh.js"></script>
</body>
</html>