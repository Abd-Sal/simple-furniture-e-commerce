namespace Furniture.API.Models;

public class Furniture
{
    public string Id { get; set; } = Guid.CreateVersion7().ToString();
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public Image[] Images { get; set; } = [];
    public decimal Discount { get; set; }
    public decimal Price { get; set; }
}
