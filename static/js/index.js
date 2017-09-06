$(function () {
  $('#submit').bind('click', function (e) {
    var url = $('#url').val();
    var check = /^[A-Za-z0-9]+@[A-Za-z0-9]+.[A-Za-z0-9]+$/;
    if ($('name').val().length == 0 || $('number').val().length == 0) {
      alert("请填写完整");
    } else if (!check.test(url) ) {
      alert("请输入正确格式的博客地址");
    }
  }, true);
})