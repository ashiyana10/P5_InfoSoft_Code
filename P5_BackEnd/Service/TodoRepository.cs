using Microsoft.EntityFrameworkCore;
using P5_BackEnd.Data;
using P5_BackEnd.Model;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace P5_BackEnd.Service
{
    public class TodoRepository : ITodoRepository
    {
        private readonly AppDbContext _context;

        public TodoRepository(AppDbContext dbContext)
        {
            _context = dbContext;
        }

        public async Task<IEnumerable<Todo>> GetAllTodos(int userId)
        {
            try
            {
                return await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<Todo> GetTodoById(int id)
        {
            try
            {
                return await _context.Todos.FirstOrDefaultAsync(t => t.Id == id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task AddTodo(Todo todo)
        {
            try
            {
                await _context.Todos.AddAsync(todo);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task UpdateTodo(Todo todo)
        {
            try
            {
                _context.Entry(todo).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task DeleteTodo(int id)
        {
            try
            {
                var todo = await _context.Todos.FindAsync(id);
                if (todo != null)
                {
                    _context.Todos.Remove(todo);
                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<bool> TodoExists(int id)
        {
            try
            {
                return await _context.Todos.AnyAsync(t => t.Id == id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
