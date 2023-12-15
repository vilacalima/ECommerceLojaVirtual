using System.Xml.Linq;

namespace originaly_backend.Model
{
    public class Address
    {
        public int Id { get; set; }
        public Client IdCliente { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string Complement { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string ZipCode { get; set; }
        public bool IsBillingAddress { get; set; }
        public bool IsDefaultAddress { get; set; }
        public bool IsDeliveryAddress { get; set; }
        public bool IsActive { get; set;}
    }
}
