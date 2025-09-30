import { findPageRecords } from './services';
import { setRecordsRelatedModels } from './store';
import { Meta, ModelRecord, RecordSet, WhereKey } from '../types';
import { useMeta } from '../meta/MetaProvider';
import { FindPageRecordsParams } from '@lib/types';

interface UseModelGridDataProps {
  meta: Meta;
  where?: WhereKey;
  onRecords?: (records: ModelRecord[]) => void;
}

export const useModelGridData = ({
  meta,
  where,
  onRecords,
}: UseModelGridDataProps) => {
  const { metaModels } = useMeta();

  const fetchDocuments = async (params: FindPageRecordsParams) => {
    try {
      let response: RecordSet = await findPageRecords(
        meta.name,
        where,
        params
      );
      await setRecordsRelatedModels({
        meta: meta.name,
        metaModels: metaModels,
        records: response.records
      });
      onRecords && onRecords(response.records);
      return {
        data: response.records,
        totalCount: response.count.filtered,
      };
    } catch (error) {
      console.error(error);
    }
  };

  return {
    dataSource: { getRows: fetchDocuments },
    isLoading: false,
  };
};
