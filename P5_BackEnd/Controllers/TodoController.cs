using Microsoft.AspNetCore.Mvc;
using P5_BackEnd.Model;
using P5_BackEnd.Service;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P5_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : ControllerBase
    {
        private readonly ITodoRepository _todoRepository;

        public TodoController(ITodoRepository todoRepository)
        {
            _todoRepository = todoRepository;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos(int userId)
        {
            try
            {
                var todos = await _todoRepository.GetAllTodos(userId);
                return Ok(todos);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("id/{id}")]
        public async Task<ActionResult<Todo>> GetTodoById(int id)
        {
            try
            {
                var todo = await _todoRepository.GetTodoById(id);
                if (todo == null)
                {
                    return NotFound();
                }
                return Ok(todo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Todo>> CreateTodo(Todo todo)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                await _todoRepository.AddTodo(todo);
                return CreatedAtAction(nameof(GetTodoById), new { id = todo.Id }, todo);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTodo(int id, Todo todo)
        {
            try
            {
                if (id != todo.Id)
                {
                    return BadRequest();
                }
                await _todoRepository.UpdateTodo(todo);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            try
            {
                await _todoRepository.DeleteTodo(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
