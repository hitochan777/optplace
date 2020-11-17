namespace api.Dto {
    class DirectionRequest {
        public string[] Locations {get; set;}
        public Condition Condition {get; set;}
    }

    class Condition {
        public TransitMode TransitMode {get; set;}
        public SortCondition[] SortConditions  {get; set;}
    }

    public enum TransitMode {
        NONE,
        WALK,
        CAR,
        PUBLIC_TRANSPORTATION
    }

    public class SortCondition {
        public SortItem Value {get; set;}
        public SortDirection Direction {get; set;}

        // public static List<SortCondition> ParseConditionString(string str)
        // {
        //     return 
        // }
    }

    public enum SortItem {
        PRICE,
        DISTANCE 
    }

    public enum SortDirection {
        ASCENDING,
        DESCENDING
    }
}