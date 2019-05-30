<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Index</title>
<% pageContext.setAttribute("APP_PATH",request.getContextPath()); %>
<link rel="stylesheet" href="${APP_PATH}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
<script type="text/javascript" src="${APP_PATH}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${APP_PATH}/static/jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="${APP_PATH}/js/index.js"></script>
</head>
<body>
<button style="margin-left:350px" id="btn1" class="btn btn-primary">SSM-CRUD</button>
</body>
</html>