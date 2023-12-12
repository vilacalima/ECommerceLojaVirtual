using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using originaly_backend.Enum;

namespace originaly_backend.Model
{
    public class Client : Login
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Cpf { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public Sex Sex { get; set; }
    }
}
