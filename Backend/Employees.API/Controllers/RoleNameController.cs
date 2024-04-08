using AutoMapper;
using Employees.API.Models;
using Employees.Core.DTOs;
using Employees.Core.Entities;
using Employees.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Employees.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleNameController : ControllerBase
    {
        private readonly IRoleNameService _roleNameService;
        private readonly IMapper _mapper;

        public RoleNameController(IRoleNameService roleNameService, IMapper mapper)
        {
            _roleNameService = roleNameService;
            _mapper = mapper;
        }

        // GET: api/<RoleNameController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roleNames = _roleNameService.GetAllAsync().Result;
            return Ok(roleNames);
        }

        // GET api/<RoleNameController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            RoleName r = _roleNameService.GetByIdAsync(id).Result;
            if (r is null)
                return NotFound("This role name doesn't exist");
            return Ok(r);
        }

        // POST api/<RoleNameController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] RoleNamePostModel roleName)
        {
            RoleName r = _mapper.Map<RoleName>(roleName);
            await _roleNameService.AddAsync(r);
            return Ok(r);
        }

        // PUT api/<RoleNameController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] RoleNamePostModel roleName)
        {
            RoleName r = _roleNameService.GetByIdAsync(id).Result;
            if (r is null)
                return NotFound();
            _mapper.Map(roleName, r);
            await _roleNameService.UpdateAsync(id, r);
            return Ok(r);
        }

        // DELETE api/<RoleNameController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            RoleName r = _roleNameService.GetByIdAsync(id).Result;
            if (r is null)
            {
                return NotFound();
            }
            await _roleNameService.DeleteAsync(id);
            return NoContent();
        }
    }
}
