<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Index</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<script type="text/javascript"
	src="${APP_PATH}/static/jquery-3.2.1.min.js"></script>
<link rel="stylesheet"
	href="${APP_PATH}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
<script type="text/javascript"
	src="${APP_PATH}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript" src="${APP_PATH}/js/index.js"></script>
</head>
<body>
	<!-- 这是使用一个小技巧,在外部的js中使用el的值可以先把这个值放到隐藏域中,然后通过element获取 -->
	<input type="hidden" id="APP_PATH" value="${APP_PATH }" />
	<!-- 搭建显示页面 -->
	<div class="container">
		<!--1.标题  -->
		<div class="row">
			<div class="col-md-12">SSM-CRUD</div>
		</div>
		<!--2.按钮 -->
		<div class="row">
			<div>
				<div class="col-md-4 col-md-offset-8">
					<button id="btn-add" class=" btn btn-danger">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button class="btn btn-primary" id="deleteAll">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
			</div>

		</div>
		<!--3.表格 -->
		<div class="row">
			<div class="col-md-12">
				<table class="table table-hover" id="emps_table">
					<thead>
						<tr>
						    <th><input type="checkbox" id="checkAll"></input></th>
							<th>#</th>
							<th>empName</th>
							<th>gender</th>
							<th>email</th>
							<th>deptName</th>
							<th>oprate</th>
						</tr>
					</thead>
					<tbody>


					</tbody>
				</table>
			</div>
		</div>
		<!--4.分页 -->
		<div class="row">
			<!-- 分页文字信息 -->
			<div class="col-md-6" id="page_info"></div>
			<!-- 分页条信息 -->
			<div class="col-md-6" id="page_line"></div>
		</div>
	</div>

	<!-- 新增界面(模态框)-->
	<div class="modal fade" id="myModal" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel">添加员工</h4>
				</div>
				<!-- 员工新增 -->
				<div class="modal-body">
					<form class="form-horizontal" id="form1">
						<div class="form-group">
							<label for="empName" class="col-sm-2 control-label">姓名:</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="empName"
									name="empName" placeholder="姓名"> <span
									class="help-block"></span>
							</div>
						</div>
						<div class="form-group">
							<label for="gender" class="col-sm-2 control-label">性别:</label>
							<div class="col-sm-10">
								<label class="radio-inline"> <input type="radio"
									name="gender" id="gender" value="M" checked="checked">
									男
								</label> <label class="radio-inline"> <input type="radio"
									name="gender" id="gender" value="F"> 女
								</label>
							</div>
						</div>
						<div class="form-group">
							<label for="email" class="col-sm-2 control-label">邮箱:</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="email" name="email"
									placeholder="邮箱"> <span class="help-block"></span>
							</div>
						</div>
						<div class="form-group">
							<label for="dId" class="col-sm-2 control-label">部门:</label>
							<div class="col-sm-10" id="dId">
								<select class="form-control" name="dId">
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="btn-save"
						ajax-value="true">保存</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 员工修改 -->
	<!-- 修改界面(模态框)-->
	<div class="modal fade" id="myModal1" tabindex="-1" role="dialog"
		aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
					<h4 class="modal-title" id="myModalLabel1">修改员工</h4>
				</div>
				<!-- 员工修改 -->
				<div class="modal-body">
					<form class="form-horizontal" id="form2">
						<div class="form-group">
							<label for="empName" class="col-sm-2 control-label">姓名:</label>
							<div class="col-sm-10">
								<p class="form-control-static" id="empName1"
									name="empName" placeholder="姓名"></p>
							</div>
						</div>
						<div class="form-group">
							<label for="gender" class="col-sm-2 control-label">性别:</label>
							<div class="col-sm-10">
								<label class="radio-inline"> <input type="radio"
									name="gender"  value="M" checked="checked">
									男
								</label> <label class="radio-inline"> <input type="radio"
									name="gender" value="F"> 女
								</label>
							</div>
						</div>
						<div class="form-group">
							<label for="email" class="col-sm-2 control-label">邮箱:</label>
							<div class="col-sm-10">
								<input type="text" class="form-control" id="email1" name="email"
									placeholder="邮箱"> <span class="help-block"></span>
							</div>
						</div>
						<div class="form-group">
							<label for="dId" class="col-sm-2 control-label">部门:</label>
							<div class="col-sm-10" id="dId1">
								<select class="form-control" name="dId">
								</select>
							</div>
						</div>
					</form>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
					<button type="button" class="btn btn-primary" id="btn-update"
						ajax-value="true">更新</button>
				</div>
			</div>
		</div>
	</div>
</body>
</html>