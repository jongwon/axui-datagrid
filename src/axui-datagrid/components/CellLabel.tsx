import * as React from 'react';
import { isFunction } from '../utils';
import { IDataGrid } from '../common/@types';

const CellLabel: React.SFC<{
  columnHeight: number;
  lineHeight: number;
  columnBorderWidth: number;
  colAlign: string;
  col: IDataGrid.ICol;
  list: any[];
  li: number;
  predefinedFormatter: IDataGrid.IFormatter;
}> = ({
  columnHeight,
  lineHeight,
  columnBorderWidth,
  colAlign,
  col,
  list: data,
  li,
  predefinedFormatter,
}) => {
  const { key = '', columnAttr = '', formatter } = col;
  const formatterData = {
    data,
    item: data[li],
    index: li,
    key: col.key,
    value: data[li] && data[li][col.key || ''],
  };

  let labelValue: string | React.ReactNode = '';
  switch (key) {
    case '_line_number_':
      labelValue = li + 1 + '';
      break;

    case '_row_selector_':
      labelValue = (
        <div
          className="axui-datagrid-check-box"
          data-span={columnAttr}
          data-checked={data[li] && data[li]._selected_}
          style={{
            maxHeight: lineHeight + 'px',
            minHeight: lineHeight + 'px',
          }}
        />
      );
      break;

    default:
      if (typeof formatter === 'string' && formatter in predefinedFormatter) {
        labelValue = predefinedFormatter[formatter](formatterData);
      } else if (isFunction(formatter)) {
        labelValue = (formatter as IDataGrid.formatterFunction)(formatterData);
      } else {
        labelValue = data[li] && data[li][key];
      }
  }

  return (
    <span
      data-span={columnAttr}
      // data-pos={colIndex + ',' + rowIndex + ',' + li}
      style={{
        height: columnHeight - columnBorderWidth + 'px',
        lineHeight: lineHeight + 'px',
        textAlign: colAlign as any,
      }}
    >
      {labelValue}
    </span>
  );
};

export default CellLabel;
