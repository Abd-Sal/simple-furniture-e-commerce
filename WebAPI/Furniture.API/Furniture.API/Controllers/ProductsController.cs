using Furniture.API.Models;
using Furniture.API.Repository;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Furniture.API.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly Furniture.API.Models.Furniture[] data = ProductsRepository.Data;

        [HttpGet]
        public IActionResult GetAllData([FromQuery(Name = "search")] string search = "")
            => (string.IsNullOrEmpty(search)) ?
                    Ok(data.OrderBy(x => x.Name)) :
                    Ok(data
                        .Where(x => x.Name.ToLower().Contains(search.ToLower()))
                        .OrderBy(x => x.Name));
        

        [HttpGet("{id}")]
        public IActionResult GetByID([FromRoute] string id)
        {
            var temp = data.FirstOrDefault(x => x.Id == id);
            if(temp is not null)
                return Ok(temp);
            return NotFound();
        }
    }
}
