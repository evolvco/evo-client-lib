import React, { createContext, useEffect, useState } from 'react';
import { on as _on } from '../bus';
import { findById, findOne } from '../models/services';
import { Loader } from './';
import { DetailContextType, ModelDetailProps, ModelRecord } from '@lib/types';

export const DetailContext = createContext<DetailContextType>({});

export function ModelDetail({
  className,
  children,
  style,
  meta,
  on,
  recId,
  value,
  populate,
}: ModelDetailProps): JSX.Element | null {
  const [record, setRecord] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if(!on) return;
    return _on(on, async (value: any) => {
      if (!value) {
        setRecord({});
        return;
      }
      //console.log('---value', value, token);
      await fetchRecord(value);
    });
  }, []);

  async function fetchRecord(value: string): Promise<void> {
    setLoading(true);
    let q: any = { where: { [meta.recordName]: value } };
    if (populate) {
      q.populate = populate;
    }
    const record = await findOne(
      meta.name,
      q,
    );
    setRecord(record);
    setLoading(false);
  }

  useEffect(() => {
    if (value) {
      fetchRecord(value);
    }
  }, [value]);

  useEffect(() => {
    if (recId) {
        setLoading(true);
        findById(meta.name, recId).then((record: ModelRecord) => {
          setRecord(record);
          setLoading(false);
        }).catch((error: any) => {
          setLoading(false);
        });
    }
  }, [recId, meta]);

  if (loading) return <Loader />;
  if (!record) return null;

  return (
    <div className={className} style={style}>
      <DetailContext.Provider
        value={{
          record,
          meta,
        }}
      >
        {children}
      </DetailContext.Provider>
    </div>
  );
}
