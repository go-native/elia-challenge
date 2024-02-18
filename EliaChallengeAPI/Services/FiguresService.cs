using EliaChallengeAPI.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using MongoDB.Driver;

namespace EliaChallengeAPI.Services;

public class FiguresService
{
    private readonly IMongoCollection<Figure> _figureCollection;

    public FiguresService(
      IOptions<FigureDatabaseSettings> figureDatabaseSettings
    )
    {
        var mongoClient = new MongoClient(figureDatabaseSettings.Value.ConnectionString);

        var mongoDB = mongoClient.GetDatabase(figureDatabaseSettings.Value.DatabaseName);

        _figureCollection = mongoDB.GetCollection<Figure>(figureDatabaseSettings.Value.FiguresCollectionName);
    }

    public async Task<List<Figure>> GetAsync() =>
        await _figureCollection.Find(new BsonDocument()).ToListAsync();

    public async Task<Figure> GetAsync(string id) =>
        await _figureCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

    public async Task CreateAsync(Figure figure) =>
        await _figureCollection.InsertOneAsync(figure);
    public async Task UpdateAsync(string id, Figure figure) =>
        await _figureCollection.ReplaceOneAsync(x => x.Id == id, figure);

}
