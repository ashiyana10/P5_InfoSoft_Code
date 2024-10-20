using P5_BackEnd.Model;

namespace P5_BackEnd.Service
{
    public interface ITodoRepository
    {
        Task<IEnumerable<Todo>> GetAllTodos(int userId);
        Task<Todo> GetTodoById(int id);
        Task AddTodo(Todo todo);
        Task UpdateTodo(Todo todo);
        Task DeleteTodo(int id);
        Task<bool> TodoExists(int id);
    }
}
