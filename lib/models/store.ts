import { find } from '../models/services';
import { Field, Meta, ModelRecord, RecordSet } from '../types';

interface ModelHash {
  [key: string]: ModelRecord;
}

export let models: Record<string, ModelHash> = {};

export function getRecords(model: string) {
  //console.log('-----getRecords', model, models[model]);
  return Object.values(models[model] || {});
}

export function setRecords(model: string, records: ModelRecord[]) {
  //console.log('-----setRecords', model, records);
  models[model] = models[model] || {};
  records.forEach((record) => {
    models[model][record.id] = record;
  });
}

export function setRecord(model: string, record: ModelRecord) {
  models[model] = models[model] || {};
  models[model][record.id] = record;
}

export function getRecord(model: string, id: string) {
  return models[model][id];
}

export function invalidateRecord(model: string, id: string) {
  delete models[model][id];
}

export function invalidateModel(model: string) {
  delete models[model];
}

export function invalidateAllModels() {
  models = {};
}

interface SetRecordsRelatedModelsParams {
  meta: string;
  metaModels: Meta[];
  records: ModelRecord[];
}

interface RelatedModel {
  model: Meta;
  field: string;
  items: ModelRecord[];
  ids: string[];
}
export async function setRecordsRelatedModels({
  meta,
  metaModels,
  records,
}: SetRecordsRelatedModelsParams): Promise<void | Record<
  string,
  RelatedModel
>> {
  const model = metaModels.find((m) => m.name === meta);
  let relatedModels: Record<string, RelatedModel> = {};
  if (!model) {
    console.log(`Model ${meta} not found`);
    return;
  }
  // find all related models
  Object.keys(model.schema).forEach((field) => {
    const fieldMeta = model.schema[field] as Field;
    if (fieldMeta.ref) {
      const ref = fieldMeta.ref;
      const refModel = metaModels.find((m) => m.name === ref);
      if (!refModel) {
        console.log(`Related Model ${ref} not found`);
        return;
      }
      relatedModels[ref] = {
        model: refModel,
        field: field,
        items: [],
        ids: [],
      };
    }
  });
  // loop through records and collect related model ids
  records.forEach((record) => {
    Object.keys(relatedModels).forEach((modelName) => {
      const rm = relatedModels[modelName];
      if (record[rm.field]) {
        relatedModels[modelName].ids.push(record[rm.field] as any);
      }
    });
  });
  // set related models
  const fns = Object.keys(relatedModels).map(async (modelName) => {
    const rm = relatedModels[modelName];
    const recordSet: RecordSet = await find(modelName, {
        where: {
          id: rm.ids,
        },
      })
    relatedModels[modelName].items = recordSet.records;
    setRecords(modelName, recordSet.records);
  });
  await Promise.all(fns);
  //console.log('---relatedModels', relatedModels, models);
  return relatedModels;
}