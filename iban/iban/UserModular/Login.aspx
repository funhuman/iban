<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="UI.UserModular.Login" %>

<!DOCTYPE html>
<html lang="zh-cn">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no">
  <title>用户登录</title>
  <link rel="stylesheet" href="/css/bootstrap.min.css" />
  <link rel="stylesheet" href="/css/login.min.css" />
  <link rel="stylesheet" href="/SlideToUnlock/css/verify.css">
</head>
<body>
  <div class="login-bg">
    <div class="container">
      <div class="row center">
        <div class="login-box tile">
          <form id="Form1" method="post" runat="server" class="form-horizontal" onkeypress="return event.keyCode != 13;">
            <h2 class="login-title">登录</h2>
            <div class="form-group">
              <label class="col-xs-3">用户名</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-user"></span></span>
                <asp:TextBox ID="usernameTextBox" CssClass="form-control" runat="server" MaxLength="20" placeholder="Username" onkeydown="textChanged()"></asp:TextBox>
              </div>
            </div><!-- /.form-group -->
            <div class="form-group">
              <label class="col-xs-3">密码</label>
              <div class="input-group col-xs-9">
                <span class="input-group-addon"><span class="glyphicon glyphicon-lock"></span></span>
                <asp:TextBox ID="passwordTextBox" CssClass="form-control" runat="server" MaxLength="16" TextMode="Password" placeholder="Password" autocomplete="current-password" onkeydown="textChanged()"></asp:TextBox>
                </div>
              </div><!-- /.form-group -->
            <div class="form-group">
              <div class="remember-pwd pull-right">
                <asp:CheckBox ID="CheckBox1" runat="server" />&nbsp;<label>7天内记住密码</label>&nbsp;
                <a href="javascript:alert('请联系管理员！')">忘记密码？</a>&nbsp;
                <a href="/UserModular/Register.aspx">注册</a>
              </div>
            </div><!-- /.form-group -->
            <div class="login-warning" id="warn" runat="server" style="display:none">
              <span class="glyphicon glyphicon-minus-sign"></span>
              <asp:Label ID="warnText" runat="server" Text="Label"></asp:Label>
            </div>
            <div class="form-group">
              <button class="btn btn-primary btn-block" type="button" id="login-button" onclick="login()">登录</button>
            </div>
            <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content center">
                  <div id="SlideToUnlock">
                  </div>
                  <input type="text" class="form-control" style="display:none" />
                  <asp:Button ID="SubmitButton" CssClass="btn btn-primary hidden" runat="server" Text="登录" OnClick="LoginButton_Click" />
                </div><!-- /.modal-dialog -->
              </div>
            </div><!-- /.modal -->
          </form>
      </div>
    </div>
  </div>
  <div class="login-copy container">
    <p>
      Copyright &copy; 2021-<span id="copyyear"></span>&nbsp;iban
    </p>
  </div>
  <!-- JavaScript -->
  <script src="/js/jquery.min.js"></script>
  <script src="/js/bootstrap.min.js"></script>
  <script src="/js/default.js"></script>
  <script src="/js/login.js"></script>
</body>
</html>
