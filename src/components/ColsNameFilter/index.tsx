import { Checkbox, Input } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React, { PropsWithChildren } from 'react';
import { listColsName } from 'src/assets/db';
import { ReactComponent as Close } from 'src/assets/icons/close.svg';

interface ColsNameFilterProps {
  colsNameChecked: number[];
  onClose?: () => void;
  onChangeColsSelection: (e: CheckboxChangeEvent) => void;
}
function ColsNameFilter({
  colsNameChecked,
  onClose,
  onChangeColsSelection,
}: PropsWithChildren<ColsNameFilterProps>) {
  return (
    <>
      <div
        className="w-full p-4 flex items-center justify-between"
        style={{ backgroundColor: 'var(--bg-main-color-lighter)' }}
      >
        <p className="title">Điều chỉnh cột hiển thị</p>
        <div className="cursor-pointer" onClick={onClose}>
          <Close />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 px-6 pt-8 pb-6 h-full">
        <div className="h-full main-border-full main-rounded-full pb-4">
          <div
            className="flex items-center justify-center p-4"
            style={{ borderBottom: 'var(--main-border)' }}
          >
            <p className="font-semibold">Thêm cột để hiển thị</p>
          </div>
          <div className="px-6 py-5">
            <Input
              size="large"
              placeholder="Tìm kiếm"
              style={{
                borderRadius: 'var(--main-rounded)',
              }}
            />
          </div>
          <div className="flex flex-col px-6 space-y-2">
            {listColsName.map((item, i) => (
              <div
                key={i}
                className="py-1 px-2 main-rounded-full"
                style={{
                  background: colsNameChecked.includes(item.value)
                    ? 'var(--bg-main-color-lighter)'
                    : 'transparent',
                }}
              >
                <Checkbox
                  rootClassName="cb-test-container"
                  onChange={onChangeColsSelection}
                  value={item.value}
                  checked={colsNameChecked.includes(item.value)}
                >
                  {item.label}
                </Checkbox>
              </div>
            ))}
          </div>
        </div>
        <div className="h-full main-border-full main-rounded-full pb-4">
          <div
            className="flex items-center justify-center p-4"
            style={{ borderBottom: 'var(--main-border)' }}
          >
            <p className="font-semibold">Cột hiển thị</p>
          </div>
          <div
            className="px-6 py-7 text-center"
            style={{ borderBottom: 'var(--main-border)' }}
          >
            <p style={{ color: 'var(--main-color)' }}>
              Di chuyển để sắp xếp cột hiển thị
            </p>
          </div>
          <div>
            {colsNameChecked.map((item, i) => (
              <div
                key={i}
                className="px-10 py-2 relative cursor-pointer"
                style={{ borderBottom: 'var(--main-border)' }}
              >
                <p>{listColsName[item].label}</p>
                <div className="absolute right-4 top-2 cursor-pointer">
                  <Close />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
export default ColsNameFilter;
