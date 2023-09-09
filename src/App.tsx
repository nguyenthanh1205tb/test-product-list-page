import { PlusOutlined } from '@ant-design/icons';
import { Checkbox, ConfigProvider, Input, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import Table, { ColumnsType } from 'antd/es/table';
import { TableRowSelection } from 'antd/es/table/interface';
import React, { useState } from 'react';
import { ReactComponent as CloseBlue } from 'src/assets/icons/close-blue.svg';
import { ReactComponent as FilterSVG } from 'src/assets/icons/filter.svg';
import { ReactComponent as JumpLeftSVG } from 'src/assets/icons/jump-left.svg';
import { ReactComponent as JumpRightSVG } from 'src/assets/icons/jump-right.svg';
import { ReactComponent as Search } from 'src/assets/icons/search.svg';
import { ReactComponent as Setting } from 'src/assets/icons/setting.svg';
import { ReactComponent as SortGrayIcon } from 'src/assets/icons/sort-gray.svg';
import { ReactComponent as SortIcon } from 'src/assets/icons/sort.svg';
import { ReactComponent as ThreeDotHoriz } from 'src/assets/icons/three-dot-horiz.svg';
import {
  randomKind,
  randomPrice,
  randomProductName,
  randomStatus,
  randomTechName,
} from './assets/db';
import ColsNameFilter from './components/ColsNameFilter';
import ButtonCus from './components/Common/Button';
import Modal from './components/Common/Modal';
import FilterStatus from './components/FilterStatus';
import TopFilter from './components/TopFilter';
import { getKindProperties, getStatusProperties, numToPrice } from './helpers';
import theme from './theme';
import { Status, TableDataType } from './types';

const PageSize = [10, 20, 30, 50];
const DefaultPageSize = PageSize[0];
const DefaultColsChecked = [0, 3, 4, 5, 6, 7, 8, 12];
const data: TableDataType[] = [];
for (let i = 0; i < 100; i++) {
  data.push({
    key: i,
    ticketCode: `XKLK21738${i}`,
    productName: randomProductName(),
    price: randomPrice(),
    warehouse: `TLM ${i}`,
    ticketCodeService: `PBH98142${i}`,
    status: randomStatus(),
    kind: randomKind(),
    technician: randomTechName(),
  });
}
const filterStatus = [
  { label: 'Đang lọc', value: '' },
  ...Object.keys(Status).map((key) => {
    const value = Status[key as keyof typeof Status];
    return { label: getStatusProperties(value).text, value };
  }),
];

function App() {
  const [isOpenModalTableView, setIsOpenModalTableView] =
    useState<boolean>(false);
  const [isOpenModalTopFilter, setIsOpenModalTopFilter] =
    useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [filterData, setFilterData] = useState({
    status: '',
    colsNameChecked: [...DefaultColsChecked] as number[],
    pageSize: DefaultPageSize,
  });

  const onChangePageSize = (value: number) => {
    setFilterData((prev) => ({ ...prev, pageSize: value }));
  };

  // NOTE [Top Filter bar]
  // filter by status
  const onChangeFilterStatus = (payload: string) => {
    setFilterData((prev) => ({ ...prev, status: payload }));
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  // NOTE [Modal] table view
  // Close modal
  const onCloseModalTableView = () => {
    setIsOpenModalTableView(false);
  };
  // open modal
  const onOpenModalTableView = () => {
    setIsOpenModalTableView(true);
  };

  const onChangeColsSelection = (e: CheckboxChangeEvent) => {
    const value = e.target.value;
    const isExist = filterData.colsNameChecked.includes(value);
    const data = isExist
      ? filterData.colsNameChecked.filter((d) => d !== value)
      : [...filterData.colsNameChecked, value];
    setFilterData((prev) => ({ ...prev, colsNameChecked: data }));
  };

  // NOTE [Modal] top filter
  // Close modal
  const onCloseModalTopFilter = () => {
    setIsOpenModalTopFilter(false);
  };
  // open modal
  const onOpenModalTopFilter = () => {
    setIsOpenModalTopFilter(true);
  };

  // NOTE [Table] data source and columns
  const columns: ColumnsType<TableDataType> = [
    {
      title: 'Mã phiếu',
      dataIndex: 'ticketCode',
      width: '150px',
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'productName',
      width: '500px',
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: false,
      className: 'cell-product-name',
      sorter: (a, b) => a.productName.localeCompare(b.productName),
      sortIcon: ({ sortOrder }) => {
        if (sortOrder === 'ascend') return <SortIcon className="rotate-180" />;
        if (sortOrder === 'descend') return <SortIcon />;
        return <SortGrayIcon style={{ marginRight: '13px' }} />;
      },
      render: (value: string) => {
        return <p style={{ color: 'var(--main-color)' }}>{value}</p>;
      },
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      width: '150px',
      sortDirections: ['ascend', 'descend'],
      showSorterTooltip: false,
      render: (value: string) => {
        return numToPrice.format(parseInt(value));
      },
      sorter: (a, b) => parseInt(a.price) - parseInt(b.price),
      sortIcon: ({ sortOrder }) => {
        if (sortOrder === 'ascend') return <SortIcon className="rotate-180" />;
        if (sortOrder === 'descend') return <SortIcon />;
        return <SortGrayIcon style={{ marginRight: '13px' }} />;
      },
    },
    {
      title: 'Kho',
      dataIndex: 'warehouse',
    },
    {
      title: 'Mã phiếu dịch vụ',
      dataIndex: 'ticketCodeService',
      render: (value: string) => {
        return <p style={{ color: 'var(--main-color)' }}>{value}</p>;
      },
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      render: (value: string) => {
        const { text, color } = getStatusProperties(value);
        return <p style={{ color }}>{text}</p>;
      },
    },
    {
      title: 'Loại',
      dataIndex: 'kind',
      render: (value: string) => {
        const { text, color } = getKindProperties(value);
        return <p style={{ color }}>{text}</p>;
      },
    },
    {
      title: 'Kỹ thuật',
      dataIndex: 'technician',
    },
  ];

  const rowSelection: TableRowSelection<TableDataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
    renderCell: (_value, _record, _index, originNode) => ({
      props: { className: 'test-selection-cb' },
      children: originNode,
    }),
    columnTitle: (
      <div className="flex items-center space-x-2">
        <div className="cursor-pointer" onClick={onOpenModalTableView}>
          <Setting />
        </div>
        <Checkbox
          onChange={(e) => {
            let newSelectedRowKeys = [];
            if (e.target.checked) {
              newSelectedRowKeys = data.map((item) => item.key);
              setSelectedRowKeys(newSelectedRowKeys);
            } else {
              setSelectedRowKeys([]);
            }
          }}
        />
      </div>
    ),
  };

  return (
    <ConfigProvider theme={theme}>
      <div className="flex flex-col justify-center items-center bg-sla">
        <h1 className="text-5xl font-medium py-8">Test</h1>
        <div className="w-full p-8 flex flex-col space-y-4">
          <div className="flex">
            <div className="w-144">
              <Input
                size="large"
                placeholder="Tìm kiếm theo mã khách hàng, tên khách hàng, và số điện thoại"
                prefix={<Search />}
              />
            </div>
            <div className="flex-1 flex justify-end items-center space-x-4">
              <div className="flex items-center space-x-5 filter-status">
                <FilterStatus
                  data={filterStatus}
                  onChange={onChangeFilterStatus}
                  selectedItem={filterData.status}
                  max={4}
                />
              </div>
              <ButtonCus.Outlined
                icon={<FilterSVG />}
                onClick={onOpenModalTopFilter}
              >
                Bộ lọc
              </ButtonCus.Outlined>
              <div className="flex">
                <ButtonCus
                  icon={<PlusOutlined />}
                  className="!rounded-r-none mr-0.5"
                >
                  Thêm mới
                </ButtonCus>
                <ButtonCus
                  icon={<ThreeDotHoriz />}
                  className="!rounded-l-none"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 top-filter-showed">
            <div className="flex items-center space-x-2 item">
              <p>Trạng thái: Đã xuất kho, Đã xác nhận</p>
              <div className="cursor-pointer">
                <CloseBlue />
              </div>
            </div>
            <div className="flex items-center space-x-2 item">
              <p>Kho: TLM, LK247</p>
              <div className="cursor-pointer">
                <CloseBlue />
              </div>
            </div>
            <div className="flex items-center space-x-2 item">
              <p>Kỹ thuật: Bình, Khoa</p>
              <div className="cursor-pointer">
                <CloseBlue />
              </div>
            </div>
          </div>
          <div className="relative">
            <Table
              rowSelection={rowSelection}
              columns={columns}
              dataSource={data}
              pagination={{
                pageSize: filterData.pageSize,
                prevIcon: <JumpLeftSVG />,
                nextIcon: <JumpRightSVG />,
                className: 'pagination-test',
                showSizeChanger: false,
              }}
            />
            <div className="flex items-center absolute bottom-2 left-2">
              <p className="mr-8">Hiển thị 1 - 10 của {data.length}</p>
              <Select
                defaultValue={DefaultPageSize}
                value={filterData.pageSize}
                style={{ width: 60 }}
                options={PageSize.map((p) => ({ label: p, value: p }))}
                onChange={(value) => onChangePageSize(value)}
              />
            </div>
          </div>
          <Modal
            isOpen={isOpenModalTableView}
            onClose={onCloseModalTableView}
            style={{
              width: '750px',
              minHeight: '785px',
              borderRadius: 'var(--main-rounded)',
            }}
            classNames="!p-0"
          >
            <ColsNameFilter
              colsNameChecked={filterData.colsNameChecked}
              onChangeColsSelection={onChangeColsSelection}
              onClose={onCloseModalTableView}
            />
          </Modal>
          <Modal
            isOpen={isOpenModalTopFilter}
            onClose={onCloseModalTopFilter}
            style={{
              width: '410px',
              minHeight: '785px',
              borderRadius: 'var(--main-rounded)',
            }}
            classNames="!p-0"
          >
            <TopFilter onClose={onCloseModalTopFilter} />
          </Modal>
        </div>
      </div>
    </ConfigProvider>
  );
}

export default App;
