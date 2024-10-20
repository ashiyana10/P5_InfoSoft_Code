using P5_BackEnd.Model;

namespace P5_BackEnd.Service
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetAllUsers();
        Task<User> GetUserById(int id);
        Task AddUser(User user);
        Task UpdateUser(User user);
        Task DeleteUser(int id);
        Task<bool> UserExists(int id);
    }
}
