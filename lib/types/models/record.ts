export interface Record {
  id?: string;
  _id?: string;
  [key: string]: any;
}

export type Records = Record[]

export interface RecordSet {
  records: Records;
  count: {
    collection: number;
    filtered: number; 
  };
}

export type AsyncRecord = Promise<Record | undefined> 
