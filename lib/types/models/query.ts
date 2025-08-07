import { Records } from './record';
import { ModelAdaptor } from './meta';

export interface Query extends ManyOptions {
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
    records: Records;
    query?: Query;
    cursor: any;
    parse(q?:Query): Promise<QueryBuilder>;
    processWhere(): void;
    processPopulate(): void;
    toRecords(): Records;    
}

export type WhereClause = Scaler | Scaler[] | WhereKey

export type Scaler = string | number | boolean | ObjectId


//custom complex types to be relocated to a lib
type RegexMatchedString<Pattern extends RegExp> = string & {
    __regexPattern: Pattern;
};
const ObjectIdRegex = /^[0-9a-fA-F]{24}$/; 

export type ObjectId = RegexMatchedString<typeof ObjectIdRegex>;
