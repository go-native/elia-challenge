namespace EliaChallengeAPI.Models;

public class FigureDatabaseSettings
{
  public string ConnectionString { get; set; } = null!;
  public string DatabaseName { get; set; } = null!;
  public string FiguresCollectionName { get; set; } = null!;

}
