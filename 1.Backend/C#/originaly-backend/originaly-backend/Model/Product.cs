using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;

namespace originaly_backend.Model
{
    public class Product
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public bool IsActive { get; set; }
        public double Assessment { get; set; }
        public DateTime UpdateAt { get; set; }
    }
}
