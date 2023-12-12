using originaly_backend.Enum;
using System.Xml.Linq;

namespace originaly_backend.Model
{
    public class ShowCase
    {
        public int Id { get; set; }
        public int IdProduct { get; set; }
        public string Route { get; set; }
        public ImageOrder imageOrder { get; set; }
    }
}
