import { getAccessToken, getRestDomain } from '../auth/store'
import type { ModelRecord, RecordSet, BuilderParams, ManyQuery, FindPageRecordsParams } from '../types';

export async function builder({ collection, id = '', method, path, query, body, secure }: BuilderParams): Promise<any> {
  try {
    let url = `${getRestDomain()}${path.replace(':collection', collection).replace(':id', id)}${query ? `?${query}` : ''}`
    let options: RequestInit = { method }
    if (secure) {
      options.headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    }
    if (body) {
      //console.log("--postbody", body)
      options.body = JSON.stringify(body)
    }
    const response = await fetch(url, options)
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function find(collection: string, query?: any): Promise<RecordSet> {
  try {
    let q = ''
    if (query) {
      Object.keys(query).forEach((key, i) => {
        q += `${i > 0 ? '&' : ''}${key}=${key === 'where' ? JSON.stringify(query[key]) : query[key]}`
      })
    }
    //console.log("---q", q)
    const response = await fetch(`${getRestDomain()}/api/${collection}${(query && Object.keys(query).length) ? `?${q}` : ''}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function findById(collection: string, id: string): Promise<ModelRecord> {
  try {
    const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json.record
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

interface FindOneQuery {
  where?: Record<string, any>;
  [key: string]: any;
}

export async function findOne(collection: string, q: FindOneQuery = {}): Promise<ModelRecord> {
  const query = new URLSearchParams({ ...q, where: JSON.stringify(q.where) }).toString()
  try {
    const response = await fetch(`${getRestDomain()}/api/${collection}/findone?${query}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json.record
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function create(collection: string, atts: Record<string, any>): Promise<any> {
  try {
    const response = await fetch(`${getRestDomain()}/api/${collection}`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(atts)
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function update(collection: string, id: string, atts: Record<string, any>): Promise<any> {
  try {
    console.log("---atts", atts)
    const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      },
      body: JSON.stringify(atts)
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function remove(collection: string, id: string): Promise<any> {
  try {
    const response = await fetch(`${getRestDomain()}/api/${collection}/${id}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

interface RemoveManyQuery {
  where?: Record<string, any>;
  [key: string]: any;
}

export async function removeMany(collection: string, q: RemoveManyQuery): Promise<any> {
  const query = new URLSearchParams({ ...q, where: JSON.stringify(q.where) }).toString()
  try {
    const response = await fetch(`${getRestDomain()}/api/${collection}/many?${query}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getAccessToken()}`
      }
    })
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    const json = await response.json();
    return json
  } catch (error) {
    console.error((error as Error).message)
    throw error
  }
}

export async function findPageRecords(collection: string, where: Record<string, any> = {}, { startRow, endRow, sortModel, filterModel }: FindPageRecordsParams): Promise<RecordSet> {
  let sort = sortModel ? sortModel.map(({ colId, sort }) => {
    return `${sort === 'asc' ? '' : '-'}${colId}`
  }).join(',') : ''

  if (filterModel) {
    Object.keys(filterModel).forEach((k) => {
      let { type, filterType, filter } = filterModel[k]
      if (filterType === 'text') {
        if (type === 'contains') {
          where[k] = { $regex: filter, $options: 'i' }
          return
        }
        if (type === 'equals') {
          where[k] = filter
          return
        }
        where[k] = filter
      }
      if (filterType === 'number') {
        where[k] = filter
      }
      if (filterType === 'boolean') {
        where[k] = !!filter
      }
    })
  }
  //console.log("-----where", where)
  let query: ManyQuery = { skip: startRow, limit: endRow - startRow }
  if (sort) {
    query.sort = sort
  }
  if (Object.keys(where).length) {
    query.where = where
  }
  //console.log("-----query", query)
  const response = await find(collection, query)
  return response
}


