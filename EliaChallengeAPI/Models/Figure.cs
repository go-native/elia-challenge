using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace EliaChallengeAPI.Models;

public class Figure
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    [BsonElement("position")]
    public Position Position { get; set; }

    [BsonElement("customSVG")]
    [BsonIgnoreIfNull]
    public string? CustomSVG { get; set; }

}


public class Position
{
    [BsonElement("x")]
    public int X { get; set; }

    [BsonElement("y")]
    public int Y { get; set; }
}