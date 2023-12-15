using originaly_backend.Enum;
using System.Text.RegularExpressions;
using System.Xml.Linq;

namespace originaly_backend.Model
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public bool IsActive { get; set; }
        public GroupUser Group { get;set; }
    }
}
