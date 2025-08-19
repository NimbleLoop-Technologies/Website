using Xunit;

namespace NimbleLoop.WebApp.Tests;

public class SampleTests
{
    [Fact]
    public void SampleTest_ShouldPass()
    {
        // Arrange
        var expected = true;

        // Act
        var actual = true;

        // Assert
        Assert.Equal(expected, actual);
    }

    [Fact]
    public void SampleTest_WithCalculation_ShouldReturnCorrectResult()
    {
        // Arrange
        var a = 5;
        var b = 3;
        var expected = 8;

        // Act
        var actual = a + b;

        // Assert
        Assert.Equal(expected, actual);
    }
}