import {Routes, Route} from 'react-router-dom'
import {Loader} from '../ui'
import {RouteView} from '../views'
import { useModel } from '../models';
 import { ModelRoutesProps } from '@lib/types';

export function ModelRoutes({ query }: ModelRoutesProps) {
  console.log('------ModelRoutes query', query)
  let p:any = { model: 'sys_route' }
  if(query) {
    p.query = query
  }
  const { recordSet, loading } = useModel(p);
  
  if (loading || !recordSet) {
      return <Loader />
  }
  console.log('------ModelRoutes recordSet', recordSet?.records.length);
  return (
      <Routes>
          {recordSet.records.map((route: any) => {
              //console.log('------ route', route);
              return (
                  <Route
                      key={route.path}
                      path={route.path}
                      element={<RouteView view={route.view} params={route.params} />}
                  />
              );
          })}
      </Routes>
  );
}