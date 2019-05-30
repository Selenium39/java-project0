<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>show</title>
<%
	pageContext.setAttribute("APP_PATH", request.getContextPath());
%>
<link rel="stylesheet"
	href="${APP_PATH}/static/bootstrap-3.3.7-dist/css/bootstrap.min.css"></link>
<script type="text/javascript"
	src="${APP_PATH}/static/bootstrap-3.3.7-dist/js/bootstrap.min.js"></script>
<script type="text/javascript"
	src="${APP_PATH}/static/jquery-3.2.1.min.js"></script>
</head>
<body>
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
					<button class=" btn btn-danger">
						<span class="glyphicon glyphicon-plus" aria-hidden="true"></span>新增
					</button>
					<button class="btn btn-primary">
						<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
					</button>
				</div>
			</div>

		</div>
		<!--3.表格 -->
		<div class="row">
			<div class="col-md-12">
				<table class="table table-hover">
					<tr>
						<th>#</th>
						<th>empName</th>
						<th>gender</th>
						<th>email</th>
						<th>deptName</th>
						<th>oprate</th>
					</tr>
					<c:forEach items="${pageInfo.list}" var="emp">
						<tr>
							<th>${emp.empId }</th>
							<th>${emp.empName }</th>
							<th>${emp.gender }</th>
							<th>${emp.email}</th>
							<th>${emp.department.deptName }</th>
							<th>
								<button class=" btn btn-info">
									<span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>编辑
								</button>
								<button class="btn btn-primary">
									<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>删除
								</button>
							</th>
						</tr>
					</c:forEach>
				</table>
			</div>
		</div>
		<!--4.分页 -->
		<div class="row">
			<!-- 分页文字信息 -->
			<div class="col-md-6">
				<p>当前第${pageInfo.pageNum}页,共${pageInfo.pages}页,共${pageInfo.total }条记录</p>
			</div>
			<!-- 分页条信息 -->
			<div class="col-md-6">
				<nav aria-label="...">
					<ul class="pagination">
						<li><a href="${APP_PATH}/emps?pn=1">首页</a></li>
						<!-- 如果是首页则禁止点击前一页 -->
						<c:if test="${pageInfo.isFirstPage }">
							<li class="disabled"><a href="#" aria-label="Previous"><span
									aria-hidden="true">&laquo;</span></a></li>
						</c:if>
						<c:if test="${!pageInfo.isFirstPage }">
							<li><a href="${APP_PATH}/emps?pn=${pageInfo.prePage}"
								aria-label="Previous"><span aria-hidden="true">&laquo;</span></a></li>
						</c:if>

						<!-- 显示连续的页面并使得当前页面为高亮 -->
						<c:forEach items="${pageInfo.navigatepageNums }" var="pageNum">
							<c:if test="${pageNum==pageInfo.pageNum }">
								<li class="active"><a href="#">${pageNum }</a></li>
							</c:if>
							<c:if test="${pageNum!=pageInfo.pageNum }">
								<li><a href="${APP_PATH}/emps?pn=${pageNum}">${pageNum }</a></li>
							</c:if>
						</c:forEach>
						<!-- 如果是末页则禁止点击后一页 -->
						<c:if test="${pageInfo.isLastPage }">
							<li class="disabled"><a href="#" aria-label="Next"><span
									aria-hidden="true">&raquo;</span></a></li>
						</c:if>
						<c:if test="${!pageInfo.isLastPage }">
							<li><a href="${APP_PATH}/emps?pn=${pageInfo.nextPage}"
								aria-label="Next"><span aria-hidden="true">&raquo;</span></a></li>
						</c:if>
						<li><a href="${APP_PATH}/emps?pn=${pageInfo.pages}">末页</a></li>
					</ul>
				</nav>
			</div>
		</div>
	</div>

</body>
</html>