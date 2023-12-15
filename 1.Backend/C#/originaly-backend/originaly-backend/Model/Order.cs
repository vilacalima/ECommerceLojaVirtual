using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Xml.Linq;
using originaly_backend.Enum;

namespace originaly_backend.Model
{
    public class Order
    {
        public int Id { get; set; }
        public int IdClient { get; set; }
        public PaymentOption paymentOption { get; set; }
        public double Subtotal { get; set; }
        public ShippingOption shippingOption { get; set; }
        public Situation Situation { get; set; }
        public DateTime Date { get; set; }
        public double ShippingValue { get; set; }
        public int IdAddress { get; set; }
    }
}
