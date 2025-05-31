public class RegisterDto
{
    public string Email { get; set; }
    public string Username { get; set; }
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }
    public string? FullName { get; set; } 
    public string? PhoneNumber { get; set; }
    public bool IsOwner { get; set; } 
}
