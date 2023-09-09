import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Dropdown,
  Input,
  MenuProps,
  Select,
  Tag,
} from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import classnames from 'classnames';
import { CustomTagProps } from 'rc-select/lib/BaseSelect';
import React, { PropsWithChildren, useRef, useState } from 'react';
import { LIST_FILTER_SAVED, STATUS_OPTIONS, TAG_OPTIONS } from 'src/assets/db';
import { ReactComponent as ArrowDownBlue } from 'src/assets/icons/arrow-down-blue.svg';
import { ReactComponent as ArrowRight } from 'src/assets/icons/arrow-right.svg';
import { ReactComponent as Close } from 'src/assets/icons/close.svg';
import { ReactComponent as Delete } from 'src/assets/icons/delete.svg';
import { ReactComponent as FilterSVG } from 'src/assets/icons/filter.svg';
import { ReactComponent as MenuIcon } from 'src/assets/icons/menu.svg';
import { ReactComponent as Pen } from 'src/assets/icons/pen.svg';
import { ReactComponent as Search } from 'src/assets/icons/search.svg';
import { ReactComponent as ThreeDotHoriz } from 'src/assets/icons/three-dot-horiz-black.svg';
import Modal from '../Common/Modal';

interface TopFilterProps {
  onClose?: () => void;
}

function TopFilter({ onClose }: PropsWithChildren<TopFilterProps>) {
  const filterSavedOverlay = useRef<HTMLDivElement>(null);
  const filterSavedContainer = useRef<HTMLDivElement>(null);
  const [selectedStatusOptions, setSelectedStatusOptions] = useState<number[]>([
    0, 1,
  ]);
  const [tagOptionsSelected, setTagOptionsSelected] = useState<number[]>([
    0, 1, 2, 3,
  ]);
  const [filterSavedSelected, setFilterSavedSelected] = useState<number>(1);
  const [isOpenModalTypeNameFilter, setIsOpenModalTypeNameFilter] =
    useState(false);

  const tagOptions = TAG_OPTIONS.map((item, i) => ({ label: item, value: i }));

  const onOpenModalTypeNameFilter = () => {
    setIsOpenModalTypeNameFilter(true);
  };
  const onCloseModalTypeNameFilter = () => {
    setIsOpenModalTypeNameFilter(false);
  };

  const onFilterCompleted = async () => {
    onCloseModalTypeNameFilter();
    await new Promise((resolve) => setTimeout(() => resolve(true), 200));
    onClose && onClose();
  };

  const closeFilterSaved = (e?: MouseEvent) => {
    const overEl = filterSavedOverlay.current;
    const el = filterSavedContainer.current;
    if (!overEl || !el) return;
    overEl.classList.remove('open');
    el.classList.remove('open');
  };

  const onOpenFilterSaved = () => {
    const overEl = filterSavedOverlay.current;
    const el = filterSavedContainer.current;
    if (!overEl || !el) return;
    overEl.classList.add('open');
    el.classList.add('open');
    overEl.addEventListener('click', closeFilterSaved);
  };

  const onSelectFilterSaved = (index: number) => {
    const el = filterSavedContainer.current;
    if (!el) return;
    setFilterSavedSelected(index);
  };

  const onChangeStatusOptions = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    const isExist = selectedStatusOptions.includes(value);
    if (isExist)
      return setSelectedStatusOptions((prev) =>
        prev.filter((o) => o !== value)
      );
    return setSelectedStatusOptions((prev) => [...prev, value]);
  };

  const onChangeStatusOptionsAll = (e: CheckboxChangeEvent) => {
    let newSelectedRowKeys = [];
    if (e.target.checked) {
      newSelectedRowKeys = STATUS_OPTIONS.map((item) => item.value);
      setSelectedStatusOptions(newSelectedRowKeys);
    } else {
      setSelectedStatusOptions([]);
    }
  };

  const onChangeTagOptions = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    const isExist = tagOptionsSelected.includes(value);
    if (isExist)
      return setTagOptionsSelected((prev) => prev.filter((o) => o !== value));
    return setTagOptionsSelected((prev) => [...prev, value]);
  };

  const onChangeTagOptionsAll = (e: CheckboxChangeEvent) => {
    let newSelectedRowKeys = [];
    if (e.target.checked) {
      newSelectedRowKeys = tagOptions.map((item) => item.value);
      setTagOptionsSelected(newSelectedRowKeys);
    } else {
      setTagOptionsSelected([]);
    }
  };

  const tagRender = (props: CustomTagProps) => {
    const { label, closable, onClose } = props;
    const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
      event.preventDefault();
      event.stopPropagation();
    };
    return (
      <Tag
        onMouseDown={onPreventMouseDown}
        closable={closable}
        onClose={onClose}
        className="test-top-filter-tag"
        style={{ marginRight: 3 }}
        closeIcon={<Close />}
      >
        <p>{label}</p>
      </Tag>
    );
  };

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <div className="w-full flex items-center justify-between">
          <p>Trạng thái</p>
          {selectedStatusOptions.length > 0 ? (
            <div className="px-4 py-1 top-filter-badged">
              Đã chọn {selectedStatusOptions.length}
            </div>
          ) : null}
        </div>
      ),
      children: (
        <>
          <Select
            rootClassName="test-top-filter-select"
            mode="multiple"
            showSearch={false}
            suffixIcon={<ArrowDownBlue />}
            tagRender={tagRender}
            placeholder="Chọn trạng thái"
            value={selectedStatusOptions}
            onChange={setSelectedStatusOptions}
            style={{ width: '100%' }}
            options={STATUS_OPTIONS}
            dropdownRender={(menu) => (
              <div className="p-2">
                <div className="flex flex-col space-y-2">
                  <Input
                    className="border-none"
                    size="large"
                    placeholder="Tìm kiếm"
                    prefix={<Search />}
                    rootClassName="top-filter-modal"
                    style={{
                      borderRadius: 'var(--main-rounded)',
                      background: '#F4F4F4',
                    }}
                  />
                  <Checkbox
                    onChange={onChangeStatusOptionsAll}
                    checked={
                      selectedStatusOptions.length === STATUS_OPTIONS.length
                    }
                    style={{ color: 'var(--main-color)' }}
                  >
                    Chọn tất cả
                  </Checkbox>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div className="flex flex-col space-y-2">
                  {STATUS_OPTIONS.map((item, i) => (
                    <Checkbox
                      value={item.value}
                      checked={selectedStatusOptions.includes(item.value)}
                      onChange={onChangeStatusOptions}
                      style={{ color: 'var(--main-color)' }}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </div>
            )}
          />
        </>
      ),
    },
    {
      key: '2',
      label: (
        <div className="w-full flex items-center justify-between">
          <p>Danh mục</p>
          <div className="px-4 py-1 top-filter-badged">Đã chọn 4</div>
        </div>
      ),
      children: <p></p>,
    },
    {
      key: '3',
      label: (
        <div className="w-full flex items-center justify-between">
          <p>Người tạo</p>
          <div className="px-4 py-1 top-filter-badged">Đã chọn 1</div>
        </div>
      ),
      children: <p></p>,
    },
    {
      key: '4',
      label: (
        <div className="w-full flex items-center justify-between">
          <p>Tag</p>
          <div className="px-4 py-1 top-filter-badged">Đã chọn 5</div>
        </div>
      ),
      children: (
        <>
          <Select
            rootClassName="test-top-filter-select"
            mode="multiple"
            tagRender={tagRender}
            showSearch={false}
            suffixIcon={<ArrowRight />}
            placeholder="Chọn thẻ"
            value={tagOptionsSelected}
            onChange={setSelectedStatusOptions}
            style={{ width: '100%' }}
            options={tagOptions}
            maxTagCount={2}
            dropdownRender={(menu) => (
              <div className="p-2">
                <div className="flex flex-col space-y-2">
                  <Input
                    className="border-none"
                    size="large"
                    placeholder="Tìm kiếm"
                    prefix={<Search />}
                    rootClassName="top-filter-modal"
                    style={{
                      borderRadius: 'var(--main-rounded)',
                      background: '#F4F4F4',
                    }}
                  />
                  <Checkbox
                    onChange={onChangeTagOptionsAll}
                    checked={tagOptionsSelected.length === tagOptions.length}
                  >
                    Chọn tất cả
                  </Checkbox>
                </div>
                <Divider style={{ margin: '8px 0' }} />
                <div className="flex flex-col space-y-2">
                  {tagOptions.map((item, i) => (
                    <Checkbox
                      value={item.value}
                      checked={tagOptionsSelected.includes(item.value)}
                      onChange={onChangeTagOptions}
                    >
                      {item.label}
                    </Checkbox>
                  ))}
                </div>
              </div>
            )}
          />
        </>
      ),
    },
  ];

  const actions: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div className="flex items-center space-x-2">
          <Pen style={{ width: '21px' }} />
          <p>Đổi tên</p>
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className="flex items-center space-x-2">
          <Delete />
          <p>Xoá</p>
        </div>
      ),
    },
  ];

  return (
    <>
      <div
        className="absolute w-full top-0 left-0 h-full overlay"
        ref={filterSavedOverlay}
      ></div>
      <div
        className="w-full p-4 flex items-center justify-between"
        style={{ backgroundColor: 'var(--bg-main-color-lighter)' }}
      >
        <p className="title">Bộ lọc</p>
        <div className="cursor-pointer" onClick={onClose}>
          <Close />
        </div>
      </div>
      <div
        className="px-6 py-4 flex flex-col space-y-4"
        style={{ borderBottom: 'var(--main-border)' }}
      >
        <Input
          className="border-none"
          size="large"
          placeholder="Tìm kiếm bộ lọc"
          prefix={<Search />}
          rootClassName="top-filter-modal"
          style={{
            borderRadius: 'var(--main-rounded)',
            background: '#F4F4F4',
          }}
        />
        <p
          className="flex items-center cursor-pointer -ml-1"
          style={{ color: 'var(--main-color)' }}
          onClick={onOpenFilterSaved}
        >
          <FilterSVG /> Bộ lọc đã lưu
        </p>
      </div>
      <div className="relative" style={{ borderBottom: 'var(--main-border)' }}>
        <div
          className="filter-saved absolute w-full"
          ref={filterSavedContainer}
        >
          <div className="content bg-white">
            {LIST_FILTER_SAVED.map((item, i) => (
              <div
                key={i}
                className={classnames(
                  'flex items-center px-4 py-3 justify-between cursor-pointer item',
                  { active: filterSavedSelected === i }
                )}
                onClick={() => onSelectFilterSaved(i)}
              >
                <div className="flex items-center space-x-4">
                  <MenuIcon />
                  <p>{item}</p>
                </div>
                <Dropdown
                  menu={{ items: actions }}
                  trigger={['click']}
                  placement="bottomRight"
                  rootClassName="filter-saved-action"
                >
                  <ThreeDotHoriz />
                </Dropdown>
              </div>
            ))}
          </div>
        </div>
        <Collapse
          defaultActiveKey={[1, 4]}
          items={items}
          className="bg-white"
          bordered={false}
          rootClassName="top-filter-accord"
        />
      </div>
      <div
        className="bg-white absolute bottom-0 left-0 w-full"
        style={{ borderTop: 'var(--main-border)' }}
      >
        <div className="flex items-center justify-center p-4 space-x-4">
          <Button className="test-btn danger" onClick={onClose}>
            Huỷ
          </Button>
          <Button
            className="test-btn primary"
            onClick={onOpenModalTypeNameFilter}
          >
            Lọc
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isOpenModalTypeNameFilter}
        onClose={onCloseModalTypeNameFilter}
        style={{
          width: '373px',
          minHeight: '165px',
          borderRadius: 'var(--main-rounded)',
        }}
        classNames="!p-0"
      >
        <div className="filter-saved-type-name flex flex-col space-y-5">
          <div className="flex items-center justify-between">
            <p className="title">Lưu bộ lọc</p>
            <div
              className="cursor-pointer"
              onClick={onCloseModalTypeNameFilter}
            >
              <Close />
            </div>
          </div>
          <div className="flex flex-col items-center space-y-3">
            <Input
              size="large"
              placeholder="Nhập tên bộ lọc"
              style={{ borderRadius: '6px' }}
            />
            <div className="flex items-center justify-center p-4 space-x-4">
              <Button
                className="test-btn danger"
                onClick={onCloseModalTypeNameFilter}
              >
                Huỷ
              </Button>
              <Button className="test-btn primary" onClick={onFilterCompleted}>
                Lưu
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
export default TopFilter;
