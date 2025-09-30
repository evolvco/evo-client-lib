import { ModelRecords, ModelAdaptor, ObjectId } from './ModelAdaptor.types';

export interface SingleQuery extends SingleOptions {
    where?: WhereKey | string   
}

export interface ManyQuery extends ManyOptions {
    where?: WhereKey | string   
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
    query?: ManyQuery;
    cursor: any;
    parse(q?:ManyQuery): Promise<QueryBuilder>;
    processWhere(): void;
    processPopulate(): void;
    toRecords(): ModelRecords;    
}

export type WhereClause = Scaler | Scaler[] | WhereKey

export type Scaler = string | number | boolean | ObjectId
