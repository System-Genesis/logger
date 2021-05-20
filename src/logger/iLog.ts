export default interface iLog {
    level: string;
    message: string;
    system: string;
    service: string;
    broken?: boolean;
    extraFields: extraFields;
}

interface extraFields {
    broken?: boolean;
}
