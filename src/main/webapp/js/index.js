$(function() {
	selectCheckBox()
	toPage(1);
	$("#btn-add").click(function() {
		$("#form1")[0].reset();// 每次关闭表单后重新打开表单需要清空表单的数据
		checkSameEmployee();
		add();// 点击新增按钮后查询depts
	});
	$("#btn-save").click(function() {
		if (validate()) {
			if ($("#btn-save").attr("ajax-value") == "false") {
				alert("无法插入");
			} else {
				save();// 点击保存按钮新增用户
			}
		}
	});
	$(document).on("click", ".edit", function() {// 为每个编辑按钮绑定事件弹出模态框
		getDepts($("#dId1 select"));// 修改前查出部门信息
		getEmp($(this).attr("edit-id"));// 修改前查出员工信息
		$("#btn-update").attr("edit-id", $(this).attr("edit-id"));
		update();
	})
	$("#btn-update")
			.click(
					function() {
						// alert("更新完成");
						// 验证邮箱是否合法
						var email = $("#email1").val();
						var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

						if (!regEmail.test(email)) {
							// alert("邮箱格式不对");
							show_validate_message($("#email1"), "error",
									"邮箱格式不正确")
							return false;
						} else {
							show_validate_message($("#email1"), "success", "")
							if ($("#btn-update").attr("ajax-value") == false) {
								alert("不成功");
								return false;
							}
							// 发送ajax请求保存员工
							var APP_PATH = $("#APP_PATH").val();
							$
									.ajax({
										url : APP_PATH + "/emp/"
												+ $(this).attr("edit-id"),
										type : "POST",
										data : $("#form2").serialize()
												+ "&_method=PUT",
										success : function(result) {
											alert(result.msg);
											$('#myModal1').modal('hide');// 关闭模态框
											toPage(1)// 回到首页
										}
									});
							return true;
						}

					});
	$(document).on("click", ".delete", function() {// 为每个删除按钮绑定事件
		var flag = confirm("是否删除" + $(this).attr("deleteName") + "?");
		if (flag == true) {
			deleteEmployee($(this));
		}
	});
	$(document)
			.on(
					"click",
					".check_item",
					function() {// 为每一个checkbox绑定事件
						// 判断选中的元素是不是全部,是的话checkAll要勾上
						$("#checkAll")
								.prop(
										"checked",
										$(".check_item:checked").length == $(".check_item").length);
					});

	$("#deleteAll").click(function() {// 批量删除按钮
		if($(".check_item:checked").length!=0){	
			deleteAll();
		}else{
			alert("您还未选择任何删除");
		}
	});
});

function buid_emps_table(result) { // 构建信息
	// 注意每次构建前都要清空表格
	$("#emps_table tbody").empty();
	var emps = result.data.pageInfo.list;
	$
			.each(
					emps,
					function(index, item) { // 构建表格
						// alert(item.empName);
						// 构建数据
						var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>")
						var empIdTd = $("<td></td>").append(item.empId);
						var empNameTd = $("<td></td>").append(item.empName);
						var empGenderTd = $("<td></td>").append(
								item.gender == 'M' ? '男' : '女');
						var empEmailTd = $("<td></td>").append(item.email);
						var deptNameTd = $("<td></td>").append(
								item.department.deptName);
						// 构建按钮
						var editBtn = $("<button></button>").addClass(
								"btn btn-info edit")
								.attr("edit-id", item.empId).append(
										$("<span></span>").addClass(
												"glyphicon glyphicon-pencil"))
								.append("编辑");
						var deleteBtn = $("<button></button>").addClass(
								"btn btn-primary delete").attr("delete-id",
								item.empId).append(
								$("<span></span>").addClass(
										"glyphicon glyphicon-remove")).append(
								"删除").attr("deleteName", item.empName);
						var btnTd = $("<td></td>").append(editBtn).append(" ")
								.append(deleteBtn);
						$("<tr></tr>").append(checkBoxTd).append(empIdTd)
								.append(empNameTd).append(empGenderTd).append(
										empEmailTd).append(deptNameTd).append(
										btnTd).appendTo("#emps_table tbody");
					})
}

function buid_page_info(result) {// 构建分页信息
	$("#page_info").empty();// 注意每次构建前都要清空分页
	$("#page_info").append(
			"当前第" + result.data.pageInfo.pageNum + "页,共"
					+ result.data.pageInfo.pages + "页,共"
					+ result.data.pageInfo.total + "条记录")
}

function buid_page_line(result) {// 构建分页条
	$("#page_line").empty();// 注意每次构建前都要清空分页
	var ul = $("<ul></ul>").addClass("pagination")
	// 首页
	firstPageLi = $("<li></li>").append(
			$("<a></a>").append("首页").attr("href", "#"));
	// 前一页
	prePageLi = $("<li></li>").append(
			$("<a></a>").append("&laquo;").attr("href", "#"));
	if (result.data.pageInfo.hasPreviousPage == false) {// 如果当前页是第一页,禁止点击
		firstPageLi.addClass("disabled");
		prePageLi.addClass("disabled");
	}
	firstPageLi.click(function() {// 跳转首页
		toPage(1);
	});
	prePageLi.click(function() {// 跳转前一页(注意前面虽然禁止了首页跳转,但是只有禁止点击标志,还是可以点击)
		toPage(result.data.pageInfo.pageNum == 1 ? 1
				: result.data.pageInfo.pageNum - 1)
	})
	ul.append(firstPageLi).append(prePageLi);
	// 下一页
	nextPageLi = $("<li></li>").append(
			$("<a></a>").append("&raquo;").attr("href", "#"));
	// 末页
	lastPageLi = $("<li></li>").append(
			$("<a></a>").append("末页").attr("href", "#"));
	if (result.data.pageInfo.hasNextPage == false) {// 如果当前页是最后一页禁止点击
		lastPageLi.addClass("disabled");
		nextPageLi.addClass("disabled");
	}
	lastPageLi.click(function() {// 跳转最后一页
		toPage(result.data.pageInfo.pages);
	});
	nextPageLi
			.click(function() {// 跳转下一页(注意前面虽然禁止了末页跳转,但是只有禁止点击标志,还是可以点击,或者在pagehelper的配置中设置reasonable属性)
				toPage(result.data.pageInfo.pageNum == result.data.pageInfo.pages ? result.data.pageInfo.pages
						: result.data.pageInfo.pageNum + 1)
			})
	$.each(result.data.pageInfo.navigatepageNums, function(index, item) {// 页数的生成与跳转
		var numLi = $("<li></li>").append(
				$("<a></a>").append(item).attr("href", "#"));
		if (result.data.pageInfo.pageNum == item) {
			numLi.addClass("active");
		}
		numLi.click(function() {
			toPage(item);
		})
		ul.append(numLi);
	})
	ul.append(nextPageLi).append(lastPageLi);
	var nav = $("<nav></nav>").append(ul);
	$("#page_line").append(nav);
}

function toPage(pn) {// 页面跳转
	var APP_PATH = $("#APP_PATH").val();
	$.ajax({
		url : APP_PATH + '/emps',
		data : 'pn=' + pn,
		type : 'get',
		success : function(result) {
			// console.log(result);
			// 1.解析并显示员工信息
			buid_emps_table(result);
			// 2.解析并显示分页信息
			buid_page_info(result);
			// 3.解析并显示分页条
			buid_page_line(result);
		}
	})
}

// 新增
function add() {
	getDepts($("#dId select"));
	// 弹出之前发送ajax请求,查出部门信息并显示在下拉列表之中
	// 弹出模态框
	$('#myModal').modal({

	});
}

function getDepts(element) {// 获取所有的部门并且显示出来
	var APP_PATH = $("#APP_PATH").val();
	$.ajax({
		url : APP_PATH + "/depts",
		type : "GET",
		success : function(result) {
			// console.log(result);
			buildDepts(result, element);
		}
	});
}
function buildDepts(result, element) {// 将查询的部门显示出来
	$(element).empty();// 注意每次构建前都要清空
	$.each(result.data.depts.data.depts, function(index, item) {
		var deptOption = $("<option></option>").append(item.deptName).attr(
				"value", item.deptId).appendTo(element);
	})
}
function save() {// 保存员工
	var APP_PATH = $("#APP_PATH").val();
	// alert($("#form1").serialize()); 将表单数据序列化为key:value形式
	$.ajax({
		url : APP_PATH + "/emp",
		type : "POST",
		data : $("#form1").serialize(),
		success : function(result) {
			if (result.code == 200) {
				alert(result.msg);
				$('#myModal').modal('hide');// 关闭模态框
			} else {
				alert(result.msg);
				// alert("老子终于跳过了前端验证"); 浏览器f12把id=empName改成id=empName1,跳过前端验证
			}
		}

	});
}
function update() {
	$('#myModal1').modal({

	});
}
function validate() {// 校验表单数据
	var empName = $("#empName").val();
	var regName = /^[\u4E00-\u9FA5A-Za-z]+$/;
	if (!regName.test(empName)) {
		// alert("姓名格式不对");
		show_validate_message($("#empName"), "error", "姓名格式不正确")
		return false;
	} else {
		show_validate_message($("#empName"), "success", "")
	}
	var email = $("#email").val();
	var regEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

	if (!regEmail.test(email)) {
		// alert("邮箱格式不对");
		show_validate_message($("#email"), "error", "邮箱格式不正确")
		return false;
	} else {
		show_validate_message($("#email"), "success", "")
		if ($("#btn-save").attr("ajax-value") == false) {
			alert("不成功");
			return false;
		}
		return true;
	}
}
function checkSameEmployee() {
	$("#empName").change(function() {// 为姓名输入框绑定一个change事件,发送ajax请求,检测是否用户已经注册
		var empName = $("#empName").val();
		var APP_PATH = $("#APP_PATH").val();
		$.ajax({
			url : APP_PATH + "/checkSameEmployee",
			data : {
				"empName" : empName
			},
			type : "POST",
			success : function(result) {
				if (result.code == 200) {
					show_validate_message($("#empName"), "success", "");
					$("#btn-save").attr("ajax-value", true);
				} else {
					show_validate_message($("#empName"), "error", "用户名不可用");
					$("#btn-save").attr("ajax-value", false);
				}
			}
		})
	});
}
function show_validate_message(element, status, msg) {// 显示校验的结果和信息
	clear(element);
	if (status == "success") {
		$(element).parent().addClass("has-success");
	}
	if (status == "error") {
		$(element).parent().addClass("has-error");
		$(element).next("span").text(msg);
	}
}
function clear(element) {
	// 每次显示前要清空
	$(element).parent().removeClass("has-success");
	$(element).parent().removeClass("has-error");
	$(element).next("span").empty();
}
function getEmp(id) {// 获取修改员工的信息
	var APP_PATH = $("#APP_PATH").val();
	$.ajax({
		url : APP_PATH + "/emp/" + id,
		type : "GET",
		success : function(result) {
			// console.log(result);
			var empName = result.data.employee.empName;
			var email = result.data.employee.email;
			var gender = result.data.employee.gender;
			var dId = result.data.employee.dId;
			$("#empName1").text(empName);
			$("#email1").val(email);
			$("#myModal1 input[name=gender]").val([ gender ]);
			$("#myModal1 select").val([ dId ]);
		}
	});
}
function deleteEmployee(element) {
	var APP_PATH = $("#APP_PATH").val();
	$.ajax({
		url : APP_PATH + "/emp/" + element.attr("delete-id"),
		type : "POST",
		data : "_method=delete",
		success : function(result) {
			alert(result.msg);
			toPage(1);// 返回首页
		}

	});
}

// 完成全选or全不选
function selectCheckBox() {
	$("#checkAll").prop("checked", null);
	$(".check_item").click(function() {
		if ($("input[type=checkbox].check_item:checked").length ==$(".check_item").length) {
			$("#checkAll").prop("checked", "checked");
		} else {
			$("#checkAll").prop("checked", null);
		}
	});

function deleteAll() {// 批量删除
	var empNames = "";
	var delIds = "";
	$.each($(".check_item:checked"), function() {
		// alert($(this).parents("tr").find("td:eq(2)").text());
		empNames += $(this).parents("tr").find("td:eq(2)").text() + ","
		delIds += $(this).parents("tr").find("td:eq(1)").text() + "-";
	})
	empNames = empNames.substring(0, empNames.length - 1);
	delIds =delIds.substring(0, delIds.length - 1);
	//alert(delIds);
	var flag = confirm("确认删除" + empNames + "?");
	if (flag) {
		var APP_PATH = $("#APP_PATH").val();
		$.ajax({
			url : APP_PATH + "/emp/" + delIds,
			type : "POST",
			data : "_method=delete",
			success : function(result) {
				alert(result.msg);
				toPage(1);// 返回首页
			}

		});
	}
}
}
