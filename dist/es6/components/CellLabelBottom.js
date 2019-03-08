"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const utils_1 = require("../utils");
const CellLabelBottom = ({ columnHeight, lineHeight, columnBorderWidth, colAlign, col, list: data, predefinedFormatter, predefinedCollector, }) => {
    const { key, label = '', columnAttr = '', collector, formatter } = col;
    let collectorData = {
        data,
        key,
    };
    let formatterData = {
        data,
        key,
        value: '',
    };
    let labelValue = '';
    switch (key) {
        case '_line_number_':
            labelValue = '';
            break;
        case '_row_selector_':
            labelValue = (React.createElement("div", { className: "axui-datagrid-check-box", "data-span": columnAttr, "data-checked": false, style: {
                    maxHeight: lineHeight + 'px',
                    minHeight: lineHeight + 'px',
                } }));
            break;
        default:
            if (typeof collector === 'string' && collector in predefinedCollector) {
                labelValue = predefinedCollector[collector](collectorData);
            }
            else if (utils_1.isFunction(collector)) {
                labelValue = collector(collectorData);
            }
            else {
                labelValue = label;
            }
            // set formatterData.value by collector value
            formatterData.value = labelValue;
            if (typeof formatter === 'string' && formatter in predefinedFormatter) {
                labelValue = predefinedFormatter[formatter](formatterData);
            }
            else if (utils_1.isFunction(col.formatter)) {
                labelValue = col.formatter(formatterData);
            }
    }
    return (React.createElement("span", { "data-span": columnAttr, 
        // data-pos={colColIndex}
        style: {
            height: columnHeight - columnBorderWidth + 'px',
            lineHeight: lineHeight + 'px',
            textAlign: colAlign,
        } }, labelValue));
};
exports.default = CellLabelBottom;
