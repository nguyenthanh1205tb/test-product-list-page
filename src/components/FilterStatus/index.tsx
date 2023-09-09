import { DownOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import classnames from 'classnames';
import React, { PropsWithChildren, useMemo } from 'react';

interface FilterStatusProps {
  max?: number;
  data: { label: string; value: string }[];
  selectedItem?: string;
  onChange?: (payload: string) => void;
}
function FilterStatus({
  max,
  data,
  selectedItem,
  onChange,
}: PropsWithChildren<FilterStatusProps>) {
  const items = useMemo(() => {
    const list = data.map((d, index) => ({ ...d, key: index }));
    return list;
  }, [data]);

  return (
    <>
      {data.map((fts, i) =>
        !max || max > i ? (
          <div
            key={i}
            className={classnames('p-2 item', {
              active: fts.value === selectedItem,
            })}
            onClick={() => onChange && onChange(fts.value)}
          >
            <p>{fts.label}</p>
          </div>
        ) : max === i ? (
          <Dropdown
            key={i}
            menu={{ items: items.slice(i, items.length) }}
            trigger={['click']}
          >
            <div
              className="item !ml-1"
              style={{ color: 'var(--main-color)' }}
              onClick={(e) => e.preventDefault()}
            >
              <DownOutlined />
            </div>
          </Dropdown>
        ) : null
      )}
    </>
  );
}
export default FilterStatus;
