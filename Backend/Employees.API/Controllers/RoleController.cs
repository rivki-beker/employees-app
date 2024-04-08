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
    public class RoleController : ControllerBase
    {
        private readonly IRoleService _roleService;
        private readonly IMapper _mapper;

        public RoleController(IRoleService roleService, IMapper mapper)
        {
            _roleService = roleService;
            _mapper = mapper;
        }

        // GET: api/<RoleController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var roles = _roleService.GetAllAsync().Result;
            return Ok(_mapper.Map<IEnumerable<RoleDto>>(roles));
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            Role r = _roleService.GetByIdAsync(id).Result;
            if (r == null)
                return NotFound("This role doesn't exist");
            return Ok(r);
        }

        // POST api/<RoleController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] RolePostModel role)
        {
            Role r = _mapper.Map<Role>(role);
            await _roleService.AddAsync(r);
            return Ok(_mapper.Map<RoleDto>(role));
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] RolePostModel role)
        {
            Role r = _roleService.GetByIdAsync(id).Result;
            if (r is null)
                return NotFound();
            _mapper.Map(role, r);
            await _roleService.UpdateAsync(id, r);
            return Ok(_mapper.Map<RoleDto>(r));
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            Role r = _roleService.GetByIdAsync(id).Result;
            if (r is null)
            {
                return NotFound();
            }
            await _roleService.DeleteAsync(id);
            return NoContent();
        }
    }
}
