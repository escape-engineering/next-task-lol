export type ItemDetail = {
    type: string;
    version: string;
    basic: Record<string, unknown>;
    data: {
        [key: string]: {
            name: string;
            description: string;
            colloq: string;
            plaintext: string;
            from?: string[];
            into?: string[];
            image: {
                full?: string;
                sprite?: string;
                group?: string;
                x?: number;
                y?: number;
                w?: number;
                h?: number;
            };
            gold: {
                base?: number;
                total?: number;
                sell?: number;
                purchasable?: number;
            };
            tags: string[];
            inStore?: boolean;
            maps: Record<string, boolean>;
            stats: Record<string, number>;
        };
    };
    groups: {
        id: string;
        MaxGroupOwnable: string;
    }[];
    tree: {
        header: string;
        tags: string[];
    }[];
};
