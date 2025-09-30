import { ObjectId, ModelRecords, ModelAdaptor } from "./ModelAdaptor.types";

export interface Query extends ManyOptions {
    where?: WhereKey 
}

export interface SingleOptions {
    select?: Array<string> | string;
    populate?: any; //todo document the optional nesting populates
}

export interface ManyOptions extends SingleOptions {
    limit?: number;
    skip?: number;
    sort?: Array<string> | string;
}

export interface WhereKey {
    [field: string]: WhereClause
}

export interface QueryBuilder {
    model:ModelAdaptor;
    records: ModelRecords;
    query?: Query;
    cursor: any;
    parse(q?:Query): Promise<QueryBuilder>;
    processWhere(): void;
    processPopulate(): void;
    toRecords(): ModelRecords;    
}


export type WhereClause = Scaler | Scaler[] | WhereKey

export type Scaler = string | number | boolean | ObjectId

