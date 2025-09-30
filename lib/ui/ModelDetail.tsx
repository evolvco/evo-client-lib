import React, { createContext, useEffect, useState } from 'react';
import { on as _on } from '../bus';
import { findOne } from '../models/services';
import { Loader } from './';
import { DetailContextType, ModelDetailProps } from '@lib/types';

export const DetailContext = createContext<DetailContextType>({});

export function ModelDetail({
  className,
  children,
  style,
  meta,
  on,
  value,
  populate,
}: ModelDetailProps): JSX.Element | null {
  const [record, setRecord] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
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
