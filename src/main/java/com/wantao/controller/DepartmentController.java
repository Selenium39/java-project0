package com.wantao.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wantao.bean.Message;
import com.wantao.service.DepartmentService;

@Controller
public class DepartmentController {
	@Autowired
	DepartmentService departmentService;

	@GetMapping(value = "/depts")
	@ResponseBody
	public Message getAllDepts() {
		return Message.success().add("depts", departmentService.getAllDepts());
	}
}
