namespace Employees.Core.Entities
{
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Identity { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime BirthDate { get; set; }
        public bool IsMale { get; set; }
        public List<Role> Roles { get; set; }
        public bool IsActive { get; set; }
    }
}