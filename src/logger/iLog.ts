export default interface iLog {
    level: string;
    title: string;
    scope: string;
    system: string;
    service: string;
    broken?: boolean;
    extraFields: extraFields;
}

interface extraFields {
    broken?: boolean;
}
