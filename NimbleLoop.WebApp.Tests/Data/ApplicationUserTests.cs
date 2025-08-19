using Microsoft.AspNetCore.Identity;
using NimbleLoop.WebApp.Data;
using Xunit;

namespace NimbleLoop.WebApp.Tests.Data;

public class ApplicationUserTests
{
    [Fact]
    public void ApplicationUser_ShouldInheritFromIdentityUser()
    {
        // Arrange & Act
        var user = new ApplicationUser();

        // Assert
        Assert.IsAssignableFrom<IdentityUser>(user);
    }

    [Fact]
    public void ApplicationUser_ShouldAllowSettingProperties()
    {
        // Arrange
        var user = new ApplicationUser();
        var testEmail = "test@example.com";
        var testUserName = "testuser";

        // Act
        user.Email = testEmail;
        user.UserName = testUserName;

        // Assert
        Assert.Equal(testEmail, user.Email);
        Assert.Equal(testUserName, user.UserName);
    }

    [Theory]
    [InlineData("user1@example.com", "user1")]
    [InlineData("user2@test.com", "user2")]
    [InlineData("admin@company.com", "admin")]
    public void ApplicationUser_ShouldHandleMultipleUserConfigurations(string email, string username)
    {
        // Arrange
        var user = new ApplicationUser
        {
            Email = email,
            UserName = username
        };

        // Act & Assert
        Assert.Equal(email, user.Email);
        Assert.Equal(username, user.UserName);
        Assert.NotNull(user.Id); // Should have a default GUID
    }
}