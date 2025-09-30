import { BookOpen } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dispatch as _dispatch, on } from '../bus';
import * as utils from '../utils/string';
import { Card, Input, Menu, MenuItem, Option, Select, Tooltip } from './';
import { cn } from '@lib/utils';
import { ListFilterProps } from '@lib/types';

function getAllTags(
  options: any[],
  tagsFn?: (opt: any) => string[]
): { name: string; count: number }[] | undefined {
  let tags: Record<string, number> = {};
  if (!tagsFn) {
    return undefined;
  }
  options.forEach((opt) => {
    let tgs = tagsFn(opt);
    if (!tgs || !tgs.length) {
      return;
    }
    tgs.forEach((tg) => {
      if (!tags[tg]) {
        tags[tg] = 0;
      }
      tags[tg] = tags[tg] + 1;
    });
  });
  let allTags: { name: string; count: number }[] = [];
  Object.keys(tags).forEach((nm) => {
    allTags.push({ name: nm, count: tags[nm] });
  });
  return allTags;
}

export function ListFilter({
  id,
  title,
  subTitle,
  placeholder = 'filter',
  onChange,
  onCreate,
  onUpdate,
  onRemove,
  filter,
  options = [],
  ItemComponent,
  sort = 'asc',
  method = 'includes', //includes|startsWith
  itemFn,
  tagsFn,
  infoFn,
  memberFormat,
  minCount = 10,
  member,
  tagsMember,
  infoMember,
  className,
  headerClassName,
  itemClassName,
  menuClassName,
  clearable = true,
  dispatch,
  value = '',
  style,
  to,
}: ListFilterProps): JSX.Element | null {
  const [fltr, setFilter] = useState<string>(
    localStorage.getItem(`${id}-filter`) || ''
  );
  const [tag, setTag] = useState<string>(
    localStorage.getItem(`${id}-tag`) || ''
  );
  const [selected, setSelected] = useState<string | number | boolean>(value);
  const [_options, setOptions] = useState<any[]>(options);
  
  useEffect(() => {
    setOptions(options);
  }, [options]);

  const navigate = useNavigate();
  if (!tagsFn && tagsMember) {
    tagsFn = (opt) => {
      return opt[tagsMember];
    };
  }
  if (!infoFn && infoMember) {
    infoFn = (opt) => {
      return opt[infoMember];
    };
  }
  const allTags = useMemo(
    () => getAllTags(_options, tagsFn),
    [_options, tagsFn]
  );

  useEffect(() => {
    setSelected(value);
  }, [value]);

  useEffect(() => {
    if (onCreate) {
      on(onCreate, (value: any) => {
        setOptions([..._options, value]);
      });
    }
    if (onUpdate) {
      on(onUpdate, (value: any) => {
        setOptions(
          _options.map((opt) => (opt[member] === value[member] ? value : opt))
        );
      });
    }
    if (onRemove) {
      on(onRemove, (value: any) => {
        setOptions(_options.filter((opt) => opt[member] !== value[member]));
      });
    }
  }, [onCreate, onUpdate, onRemove]);

  function selectHandler(value: string, opt: any): void {
    setSelected(value);
    if (onChange) {
      onChange(value, opt);
    }
    if (dispatch) {
      _dispatch(dispatch, value);
    }
    if (to) {
      let url = to.replace(/\:value/g, value);
      navigate(url);
    }
  }
  if (!_options || !Array.isArray(_options)) return null;

  let tagged = [..._options];

  if (tag && minCount && _options.length) {
    tagged = tagged.filter((opt) => {
      let tgs = tagsFn?.(opt);
      if (!tgs || !tgs.length) {
        return false;
      }
      return tgs.includes(tag);
    });
  }

  let filtered = [...tagged];

  if (fltr && minCount && tagged.length > minCount) {
    filtered = tagged.filter((val) => {
      if (member) {
        val = val[member];
      }
      return val.toLowerCase() === fltr.toLowerCase();
    });

    if (filtered.length === 0) {
      filtered = tagged.filter((val) => {
        if (filter) {
          return filter(val, fltr);
        }
        if (member) {
          val = val[member];
        }
        return val.toLowerCase()[method](fltr.toLowerCase());
      });
    }
  }

  if (sort === 'asc') {
    filtered = filtered.sort((a, b) => {
      if (member) {
        return a[member].toLowerCase() > b[member].toLowerCase() ? 1 : -1;
      }
      return a.toLowerCase() > b.toLowerCase() ? 1 : -1;
    });
  } else if (sort === 'desc') {
    filtered = filtered.sort((a, b) => {
      if (member) {
        return a[member].toLowerCase() < b[member].toLowerCase() ? 1 : -1;
      }
      return a.toLowerCase() < b.toLowerCase() ? 1 : -1;
    });
  }
  console.log('filtered', filtered, _options, options, member);
  return (
    <Card
      title={title}
      headerClassName={headerClassName}
      contentClassName={'overflow-hidden flex flex-col gap-2 p-2'}
      style={style}
      className={cn(`flex py-0 flex-col overflow-hidden`, className)}
    >
      {subTitle && <div className="m-2">{subTitle}</div>}
      {minCount && _options.length > minCount && (
        <Input
          onChange={(ev: any) => {
            setFilter(ev.target.value);
            if (id) {
              localStorage.setItem(`${id}-filter`, ev.target.value);
            }
          }}
          placeholder={placeholder}
          clearable={clearable}
          autocomplete="off"
          onClear={() => {
            setFilter('');
            if (id) {
              localStorage.removeItem(`${id}-filter`);
            }
          }}
          value={fltr}
        />
      )}
      {tagsFn &&
        allTags &&
        allTags.length > 0 &&
        minCount &&
        _options.length > minCount && (
          <Select
            placeholder={'filter by tags'}
            value={encodeURIComponent(tag)}
            onClear={() => {
              setTag('');
              if (id) {
                localStorage.removeItem(`${id}-tag`);
              }
            }}
            clearable={clearable}
            onChange={(value: any) => {
              const tg = decodeURIComponent(value);
              if (id) {
                localStorage.setItem(`${id}-tag`, tg);
              }
              setTag(tg);
            }}
          >
            {allTags.map((tg) => (
              <Option key={tg.name} value={encodeURIComponent(tg.name)}>
                <div className="flex justify-between">
                  {tg.name}
                  <div className="rounded-full bg-gray-200 text-xs px-2.5 m-0.5">
                    {tg.count}
                  </div>
                </div>
              </Option>
            ))}
          </Select>
        )}
      <Menu className={`flex flex-col overflow-auto ${menuClassName || ''}`}>
        {filtered.map((opt, i) => {
          let info = infoFn ? infoFn(opt) : undefined;
          let tags = tagsFn ? tagsFn(opt) : undefined;

          const p = { selected, index: i, option: opt, info, tags };
          const k = member ? opt[member] : opt;

          if (itemFn) {
            return itemFn(p);
          }
          if (ItemComponent) {
            return <ItemComponent key={k} {...p} />;
          }

          return (
            <MenuItem
              className={`text-sm ${itemClassName} ${
                selected === k
                  ? 'text-sidebar-accent-foreground'
                  : 'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              }`}
              key={k}
              selected={selected === k}
              onClick={() => selectHandler(k, opt)}
            >
              <div className="flex flex-grow">
                <div className={`flex-grow text-left`}>
                  {memberFormat
                    ? utils[memberFormat as keyof typeof utils](k)
                    : k}
                </div>
                <div className="flex ml-2">
                  {tags && (
                    <Tooltip content={tags.join(' ')}>
                      <div className="rounded-full bg-gray-200 text-xs px-2.5 m-0.5">
                        {tags.length}
                      </div>
                    </Tooltip>
                  )}
                  {info && (
                    <Tooltip content={info}>
                      <BookOpen
                        size={16}
                        strokeWidth={1.75}
                        className="text-gray-400 hover:text-gray-900"
                      />
                    </Tooltip>
                  )}
                </div>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </Card>
  );
}
