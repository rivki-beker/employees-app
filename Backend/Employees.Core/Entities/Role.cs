namespace Employees.Core.Entities
{
    public class Role
    {
        public int Id { get; set; }
        public int RoleNameId { get; set; }
        public RoleName RoleName { get; set; }
        public bool IsManager { get; set; }
        public DateTime StartDate { get; set; }
        public int EmployeeId { get; set; }
        public Employee Employee { get; set; }
    }
}