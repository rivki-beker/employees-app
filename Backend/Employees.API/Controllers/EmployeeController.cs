using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService employeeService, IMapper mapper)
        {
            _employeeService = employeeService;
            _mapper = mapper;
        }

        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var employees = _employeeService.GetAllAsync().Result;
            return Ok(employees);
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Employee e = _employeeService.GetByIdAsync(id).Result;
            if (e == null)
                return NotFound("This employee doesn't exist");
            return Ok(e);
        }

        // POST api/<EmployeeController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel employee)
        {
            Employee e = _mapper.Map<Employee>(employee);
            string result = _employeeService.CheckValidity(e);
            if (result != "Ok")
                return BadRequest(result);
            await _employeeService.AddAsync(e);
            return Ok(e);
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] EmployeePostModel employee)
        {

            Employee e = _employeeService.GetByIdAsync(id).Result;
            if (e is null)
                return NotFound();
            _mapper.Map(employee, e);
            string result = _employeeService.CheckValidity(e);
            if (result != "Ok")
                return BadRequest(result);
            await _employeeService.UpdateAsync(id, e);
            return Ok(e);
        }

        // DELETE api/<EmployeeController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            Employee e = _employeeService.GetByIdAsync(id).Result;
            if (e is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteAsync(id);
            return NoContent();
        }
    }
}
