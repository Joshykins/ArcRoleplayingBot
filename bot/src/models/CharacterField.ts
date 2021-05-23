
export interface CharacterFieldDefinition {
    slugID: string;
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
        slugID: "race",
        title: "Race",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        slugID: "sex",
        title: "Sex",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        slugID: "height",
        title: "Height",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        slugID: "outward-age",
        title: "Outward Age",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    },
    {
        slugID: "origin",
        title: "Origin",
        numeric: false,
        public: true,
        orderPriority: defaultOrderPriority
    }
]
