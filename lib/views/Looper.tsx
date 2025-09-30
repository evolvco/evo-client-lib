import nunjucks from 'nunjucks';
import React from 'react';
import { on as _on } from '../bus';
import * as Ui from '../ui';
import * as utils from '../utils';

function resolveBind(bind: string, ctx: Record<string, any>): any {
  if (bind.match(/\[(.*)\]/)) {
    const match = bind.match(/\[(.*)\]/);
    if (match) {
      const rel = match[1];
      const res = resolveBind(rel, ctx);
      bind = bind.replace(/\[(.*)\]/, '.' + res);
    }
  }

  const parts = bind.split('.');
  let pionter: Record<string, any> = { ...ctx };

  parts.forEach((part) => {
    pionter = pionter[part];
  });
  return pionter;
}

interface BindItem {
  type: string;
  item?: any;
  [key: string]: any;
}

interface JsonNode {
  type?: string;
  bind?: string;
  on?: string;
  item?: any;
  bind_item?: BindItem;
  children?: React.ReactNode;
  key?: string;
  [key: string]: any;
}

export function Looper(
  json: JsonNode,
  ctx: Record<string, any>
): React.ReactNode {
  const parse = (jn: JsonNode | string): React.ReactNode => {
    if (typeof jn === 'object' && jn !== null && jn.type) {
      let { type, bind, on, item, bind_item, children, ...props } = jn;

      //send down params to the next View
      if (type === 'View') {
        const pks = Object.keys(props.params);
        const cks = Object.keys(ctx);
        const pks_ctx = pks.filter((k: string) => cks.includes(k));

        pks_ctx.forEach((k: string) => {
          if (ctx[k]) {
            props.params[k] = ctx[k];
          }
        });
        console.log('---props', props);
      }

      props = props || {};
      Object.keys(props).forEach((k: string) => {
        if (props[k] && typeof props[k] === 'string') {
          if (props[k].includes('{{')) {
            if (type === 'ModelAttribute' && k === 'attribute') {
              console.log('same ModelAttribute template for runtime injection');
            } else {
              let _original = props[k];
              props[k] = nunjucks.renderString(_original, ctx);
            }
          }
          if (props[k].startsWith(':')) {
            props[k] = ctx[props[k].replace(':', '')];
            if (props[k + '_vo']) {
              if (Array.isArray(props[k])) {
                props[k] = props[k].map((rec: any) => {
                  if (typeof props[k + '_vo'] === 'string') {
                    return rec[
                      props[k + '_vo'].startsWith(':')
                        ? resolveBind(props[k + '_vo'].replace(':', ''), {
                            ...ctx,
                            item,
                          })
                        : props[k + '_vo']
                    ];
                  }
                  return props[k + '_vo'].map((k: string) => {
                    return rec[
                      k.startsWith(':')
                        ? resolveBind(k.replace(':', ''), { ...ctx, item })
                        : k
                    ];
                  });
                });
              }
            }
          }
        }
      });
      props.key = jn.key || `${type}-${Math.random()}`;

      let node = Ui[jn.type as keyof typeof Ui] || jn.type;

      let _template: string | null = null;

      if (children && Array.isArray(children)) {
        children = children.map((child: JsonNode | string) => {
          return parse(child);
        });
      } else if (
        children &&
        typeof children === 'object' &&
        children !== null
      ) {
        children = parse(children as JsonNode);
      } else if (
        children &&
        typeof children === 'string' &&
        children.startsWith(':')
      ) {
        children = resolveBind(children.replace(':', ''), { ...ctx, item });
      } else if (
        children &&
        typeof children === 'string' &&
        children.includes('{{')
      ) {
        _template = children;
        children = nunjucks.renderString(children, { ...ctx, item, utils });
      } else if (bind) {
        const val = resolveBind(bind, { ...ctx, item });

        if (Array.isArray(val) && bind_item) {
          children = val.map((item) => {
            return parse({ ...bind_item, item: item });
          });
        } else {
          children = resolveBind(bind, { ...ctx, item });
        }
      }

      if (on && typeof node === 'string') {
        class CompyWrapper extends React.PureComponent<
          {
            on: string;
            node: string;
            nprops: Record<string, any>;
          },
          {
            content: string;
          }
        > {
          private _e?: () => void;

          state = {
            content: '',
          };

          componentDidMount() {
            this._e = _on(this.props.on, (value: string) => {
              //console.log('----nnn', this.props, this.state, props, item)
              this.setState({
                content: _template
                  ? nunjucks.renderString(_template, { value, utils })
                  : value,
              });
            });
          }

          componentWillUnmount() {
            if (this._e) this._e();
          }

          render() {
            const NodeComponent = this.props.node as any;
            return (
              <NodeComponent {...this.props.nprops}>
                {this.state.content}
              </NodeComponent>
            );
          }
        }

        const { key, ...rest } = props;
        return <CompyWrapper key={key} on={on} node={node} nprops={rest} />;
      }

      if (on) {
        props.on = on;
      }

      return React.createElement(
        node as any,
        props,
        children as React.ReactNode
      );
    } else if (typeof jn === 'string') {
      return jn;
    }

    return null;
  };

  return parse(json);
}
