package com.wantao.controller;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.wantao.bean.Employee;
import com.wantao.bean.Message;
import com.wantao.service.EmployeeService;

/**
 * @author wantao
 * @date 2019-01-31 14:33
 * @description: talk is cheap show me your code
 */
/**
 * @author wantao
 * @date 2019-02-02 21:28
 * @description: talk is cheap show me your code
 */
/**
 * @author wantao
 * @date 2019-02-02 21:28
 * @description: talk is cheap show me your code
 */
@Controller
public class EmployeeController {
	Logger logger = Logger.getLogger("EmployeeController.class");
	@Autowired
	EmployeeService employeeService;

	/**
	 * @param
	 * @return String
	 * @description:查询所有员工(分页查询)
	 */
//	@GetMapping(value = "emps")
//	public String showEmployees(@RequestParam(defaultValue = "1", name = "pn") Integer pn,Model model) {
//		PageHelper.startPage(pn, 5);// 后面紧跟的查询为分页查询
//		List<Employee> employees = employeeService.findAllEmployee();
//		PageInfo pageInfo=new PageInfo(employees,5);//用pageInfo封装然后交给页面
//		model.addAttribute("pageInfo",pageInfo);
//		return "show";
//	}

	/**
	 * @param
	 * @return PageInfo
	 * @description:查询所有员工(分页查询),以ajax方式返回
	 */
	@GetMapping(value = "/emps")
	@ResponseBody
	public Message showEmployeesWithJson(@RequestParam(defaultValue = "1", name = "pn") Integer pn, Model model) {
		PageHelper.startPage(pn, 5);// 后面紧跟的查询为分页查询
		List<Employee> employees = employeeService.findAllEmployee();
		PageInfo pageInfo = new PageInfo(employees, 5);// 用pageInfo封装然后交给页面
		return Message.success().add("pageInfo", pageInfo);
	}

	/**
	 * @param
	 * @return Message
	 * @description:新增用户 支持jsr303,导入hibernate validator
	 */
	@PostMapping(value = "/emp")
	@ResponseBody
	public Message saveEmployee(@Valid Employee employee, BindingResult result) {
		// System.out.println(employee);
		if (result.hasErrors()) {// 后端校验失败,返回校验失败的信息
			Map<String, Object> map = new HashMap<>();
			List<FieldError> errors = result.getFieldErrors();
			for (FieldError error : errors) {
				map.put(error.getField(), error.getDefaultMessage());
			}
			return Message.fail().add("errorField", map);
		} else {
			employeeService.saveEmployee(employee);
			return Message.success();
		}
	}

	/**
	 * @param
	 * @return Message
	 * @description:检测用户是否存在 success表示用户不存在可用,fail表示用户存在不可用
	 */
	@PostMapping(value = "/checkSameEmployee")
	@ResponseBody
	public Message checkSameEmployee(@RequestParam("empName") String empName) {
		if (employeeService.checkSameEmployee(empName)) {// 用户名不存在
//    		logger.info(empName+"不存在");
			return Message.success();
		} else {
//    		logger.info(empName+"存在");
			return Message.fail();
		}
	}

	/**
	 * @param
	 * @return Message
	 * @description:修改前将要修改的employee查询出来表单回显
	 */
	@GetMapping(value = "/emp/{id}")
	@ResponseBody
	public Message getEmployee(@PathVariable("id") Integer id) {
		Employee employee = employeeService.getEmployee(id);
		return Message.success().add("employee", employee);
	}

	/**
	 * @param
	 * @return Message
	 * @description:员工更新 这里ajax请求直接发put请求而不是post请求,那么所有的参数都会获取不到,因为tomcat只会封装post的数据
	 *                   也就是说request.getParameter("empId")为空,springmvc也无法封装Bean
	 *                   解决方法: 1.发送post方法,通过HiddenHttpMethodFilter
	 *                   2.发送put请求,通过HttpPutFormContentFilter
	 */
	@PutMapping(value = "/emp/{empId}")
	@ResponseBody
	public Message saveUpdateEmployee(Employee employee) {
		// System.out.println(employee);
		logger.info(employee.toString());
		employeeService.updateEmployee(employee);
		return Message.success();
	}

	/**
	 * @param
	 * @return Message
	 * @description:单个批量删除 单个删除:1 批量删除:1-2-3
	 */
	@DeleteMapping(value = "/emp/{empIds}")
	@ResponseBody
	public Message deleteEmployee(@PathVariable("empIds") String empIds) {
		if (empIds.contains("-")) {
			String[] ids = empIds.split("-");
			List<Integer> idsList = new ArrayList<>();
			for (String id : ids) {
				idsList.add(Integer.parseInt(id));
			}
			employeeService.deleteBatch(idsList);
		} else {
			employeeService.deleteEmployee(Integer.parseInt(empIds));
		}
		return Message.success();
	}
}
