
export interface CharacterFieldDefinition {
    title: string;
    numeric: boolean;
    public: boolean;
    orderPriority?: number;
}

export interface CharacterField extends CharacterFieldDefinition {
    textValue?: string;
    numericValue?: number;
}

export const defaultOrderPriority = 1;

//These are the default fields provided to each server when the bot initializes.
export const DefaultFieldsForServer: CharacterFieldDefinition[] = [
    {
        title: "Race",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        title: "Sex",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        title: "Height",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        title: "Outward Age",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        title: "Origin",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    }
]
