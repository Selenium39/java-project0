package com.wantao.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wantao.bean.Department;
import com.wantao.bean.Message;
import com.wantao.dao.DepartmentMapper;

@Service
public class DepartmentService {
	@Autowired
    private DepartmentMapper departmentMapper;
	public Message getAllDepts() {
		List<Department> departments=departmentMapper.selectByExample(null);
		return Message.success().add("depts",departments);
	}
}
