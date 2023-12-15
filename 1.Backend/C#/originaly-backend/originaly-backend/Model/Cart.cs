using System.Xml.Linq;

namespace originaly_backend.Model
{
    public class Cart
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
        public double PriceTotal { get; set; }
        
        /**
         Retorna o preço total
         */
        public double setPriceTotal(double price, int quantity)
        {
            return price * quantity;
        }
        

    }
}
