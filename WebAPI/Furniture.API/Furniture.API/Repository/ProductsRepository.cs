using Furniture.API.Models;

namespace Furniture.API.Repository;

public class ProductsRepository
{
    public static string origin = "http://localhost:5000";

    public static Furniture.API.Models.Furniture[] Data = [
        new Furniture.API.Models.Furniture{
            Id = "57082404-ba35-4e93-ae3f-82418e642acd",
            Name = "Loveseat Sofa",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Loveseat-Sofa.jpg", Color = "Black"},
                ],
            Price = 20.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "0b4ffcf7-c208-4279-be58-25f73b9d80af",
            Name = "Cozy Sofa.jpg",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Cozy-Sofa.jpg", Color = "Gray"},
                ],
            Price = 15.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "bf4d8c65-23f7-4e50-97b5-51a12061d662",
            Name = "Bamboo Basket",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Bamboo-Basket.jpg", Color = "brown"},
                ],
            Price = 5.99m,
            Discount = 0.05m
        },
        new Furniture.API.Models.Furniture{
            Id = "6cf44ab9-8ff8-499e-9b5e-2b3909b8e67b",
            Name = "Black Brow Side table",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Black-Brow-Side-table.jpg", Color = "Black"},
                ],
            Price = 11.05m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "e7bb8b71-902e-49cf-9883-0c2c9ec8a5fb",
            Name = "Tray table",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Black-Tray-table.jpg", Color = "Black"},
                new Image{ URL = $"{origin}/images/Red-Tray-table.jpg", Color = "Red"},
                new Image{ URL = $"{origin}/images/Gray-Tray-table.jpg", Color = "Gray"},
                new Image{ URL = $"{origin}/images/White-Tray-table.jpg", Color = "White"},
                new Image{ URL = $"{origin}/images/Zoom-Tray-table.jpg", Color = "Black"},
                new Image{ URL = $"{origin}/images/Show-Tray-table.jpg", Color = "Black"},
                new Image{ URL = $"{origin}/images/Show-Tray-table-2.jpg", Color = "Black"},
                new Image{ URL = $"{origin}/images/Show-Tray-table-3.jpg", Color = "Black"},
                new Image{ URL = $"{origin}/images/Show-Tray-table-4.jpg", Color = "Black"},
                ],
            Price = 16.99m,
            Discount = 0.15m
        },
        new Furniture.API.Models.Furniture{
            Id = "df557482-405d-4c12-952a-7e67606e94b8",
            Name = "Table Lamp",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Table-Lamp-2.jpg", Color = "White"},
                ],
            Price = 3.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "47718b74-0b65-4570-a973-7833e540ffb0",
            Name = "Table Lamp",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Table-Lamp.jpg", Color = "Black"},
                ],
            Price = 2.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "20d68597-9a1c-49c5-a4a1-4fe75215daab",
            Name = "White Drawer unit",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/White-Drawer-unit.jpg", Color = "White"},
                ],
            Price = 8.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "f4501ac5-9e88-4f91-a7a3-5e46e6157434",
            Name = "Lamp",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Lamp.jpg", Color = "Gray"},
                ],
            Price = 1.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "4377b349-5b72-4459-9eb0-12c3f69bc0d6",
            Name = "Luxury Sofa",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Luxury-Sofa.jpg", Color = "White"},
                ],
            Price = 17.5m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "9d5bb02d-9155-4faa-98bf-30582c026f50",
            Name = "Off white Pillow",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Off-white-Pillow.jpg", Color = "White"},
                ],
            Price = 0.99m,
            Discount = 0.00m
        },
        new Furniture.API.Models.Furniture{
            Id = "c7c7569b-d9ae-4730-ad95-83b3ff516a32",
            Name = "Light Beige Pillow",
            Category = "Furniture",
            Description = "Buy one or buy a few and make every space where you sit more convenient. Light and easy to move around with removable tray top, handy for serving snacks.",
            Images = [
                new Image{ URL = $"{origin}/images/Light-Beige-Pillow.jpg", Color = "White"},
                ],
            Price = 0.99m,
            Discount = 0.00m
        },
    ];
}
