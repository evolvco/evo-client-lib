import { useModelView } from './useModelView';
import { Loader } from '../ui';
import { Looper } from './Looper';
import type { ViewProps } from '../types'

export function View({ view, params }: ViewProps): JSX.Element {
  const [record, loading] = useModelView({ view, params });
  //console.log('---record', record, loading);
  if (loading || !record) {
    return <Loader />;
  }

  const ctx = {
    ...record.context,
    params,
    _context: record.context,
    _template: record.template,
    _query: record.query,
    _params: params,
  };

  const dom = Looper(record.template, ctx);

  return dom as JSX.Element;
}
