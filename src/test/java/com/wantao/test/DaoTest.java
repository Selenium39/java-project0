package com.wantao.test;

import java.util.List;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.wantao.bean.Department;
import com.wantao.bean.Employee;
import com.wantao.dao.DepartmentMapper;
import com.wantao.dao.EmployeeMapper;

/**
 * @author wantao
 * @date 2019-01-31 10:47
 * @description: 方法一:通过原始方法进行测试
		           1.创建spring容器
		           2.获取mapper
 */
public class DaoTest {

	@Test
	public void testCRUD() {
		ApplicationContext ac=new ClassPathXmlApplicationContext("spring.xml");
//		DepartmentMapper departmentMapper=ac.getBean(DepartmentMapper.class);
//		Department department=new Department();
//		department.setDeptId(2);
//		department.setDeptName("科学部");
//		departmentMapper.insert(department);
		EmployeeMapper employeeMapper=ac.getBean(EmployeeMapper.class);
//		Employee employee=new Employee();
//		employee.setdId(1);
//		employee.setEmpName("selenium");
//		employee.setGender("male");
//		employee.setdId(1);
//		employeeMapper.insert(employee);
		List<Employee> employees=employeeMapper.selectByExampleWithDept(null);	
	    for(Employee employee :employees) {
	    	System.out.println(employee);
	    }
	}

}
