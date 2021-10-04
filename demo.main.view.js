import service from './demo.main.js';
import { CUR_PGM_NAME, LAYOUT_CONFIG, DATE_FORMAT } from '/assets/js/core/index.js';
import * as Commons from '/assets/js/utils/commons.js';

//RAW DATA
var selected = false;
var isChanged = false;
var selectedItem = null;
var tableData = [
  {
    no: 1,
    materialCode: 'NANI-19-99',
    catalog: 'NANI',
    volume: '19',
    itemNo: '99',
    itemNm: 'TRANSFORM',
    composition: 'NYLON 100%',
    finish: 'N-W',
    createDate: '2021-09-23'
  },
  {
    no: 2,
    materialCode: 'TAN-1-1',
    catalog: 'TAN',
    volume: '1',
    itemNo: '1',
    itemNm: 'bag',
    composition: 'Nilon 100%',
    finish: 'F-N',
    createDate: '2021-09-22'
  },
  {
    no: 3,
    materialCode: 'NAVI-11-90',
    catalog: 'NAVI',
    volume: '11',
    itemNo: '90',
    itemNm: '40 D DOUBLE R\\S',
    composition: 'NYLON 100%',
    finish: 'W-WAX',
    createDate: '2021-09-20'
  },
  {
    no: 4,
    materialCode: 'NAVI-13-90',
    catalog: 'NAVI',
    volume: '13',
    itemNo: '98',
    itemNm: 'TC 20\'S 2X',
    composition: 'T/C=65/35',
    finish: 'W-WAX',
    createDate: '2021-09-10'
  },
  {
    no: 5,
    materialCode: 'NAVI-19-97',
    catalog: 'NAVI',
    volume: '19',
    itemNo: '97',
    itemNm: '20 D DOUBLE R\\S',
    composition: 'NYLON 100%',
    finish: 'FACE SILICON BACK PU+FR',
    createDate: '2021-09-09'
  }
];
//END OF RAW DATA

//DATATABLE UI
const gridViewHeader = () => ({
  height: LAYOUT_CONFIG.HEIGHT_HEADER_TOOLBAR,
  type: 'clean',
  minWidth: 130,
  cols: [
    {
      template:
        `<div class='title_header'>
              <div class='title'>Fabric Material</div>
          </div>`
    }
  ]
});
const gridView = () => {
  return {
    id: 'materialTable',
    name: 'materialTable',
    view: 'datatable',
    select: 'row',
    editable: true,
    areaselect: true,
    columns: [
      {
        id: 'no',
        header: {
          text: 'No',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'center' },
        width: 60
      },
      {
        id: 'materialCode',
        header: {
          text: 'Material Code',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'center' },
        width: 120
      },
      {
        id: 'catalog',
        header: {
          text: 'Catalog',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'left' },
        width: 120
      },
      {
        id: 'volume',
        header: {
          text: 'Volume',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'center' },
        width: 100
      },
      {
        id: 'itemNo',
        header: {
          text: 'Item No',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'center' },
        width: 100
      },
      {
        id: 'itemNm',
        header: {
          text: 'Item Name',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'left' },
        width: 260
      },
      {
        id: 'composition',
        header: {
          text: 'Composition',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'left' },
        width: 180
      },
      {
        id: 'finish',
        header: {
          text: 'Finish',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'left' },
        width: 220
      },
      {
        id: 'createDate',
        header: {
          text: 'Created Date',
          css: { 'text-align': 'center' }
        },
        css: { 'text-align': 'center' },
        minWidth: 120,
        fillspace: true
      }
    ],
    data: tableData,
    scheme: {
      $init: function (obj) {
        obj.no = this.count();
      }
    }
  };
};
//

//MATERIAL DETAIL UI
const gridDetailHeader = () => ({
  height: LAYOUT_CONFIG.HEIGHT_HEADER_TOOLBAR,
  type: 'clean',
  minWidth: 130,
  cols: [
    {
      template:
        `<div class='title_header'>
           <div class='title'>Material Detail</div>
           <div class='toolbar_buttons'>
             <button title="New" class="fa-sf fa-sf-add addMaterialBtn" id=${service.BUTTON_NEW}></button>
             <button title="Save" class="fa-sf fa-sf-save saveMaterialBtn" id=${service.BUTTON_SAVE}></button>
             <button title="Delete" class="fa-sf fa-sf-delete deleteMaterialBtn" id=${service.BUTTON_DELETE}></button>
           </div>
        </div>`
    }
  ]
});
const materialDetailView = () => ({
  id: 'materialDetailForm',
  name: 'materialDetailForm',
  view: 'form',
  minWidth: 305,
  responsive: CUR_PGM_NAME,
  elementsConfig: { labelWidth: 100 },
  elements: [
    {
      id: 'materialCode',
      view: 'text',
      name: 'materialCode',
      label: 'Material Code',
      invalidMessage: 'Must not empty!'
    },
    {
      view: 'text',
      id: 'catalog',
      name: 'catalog',
      require: true,
      css: 'engup-40',
      attributes: { maxlength: 50 },
      label: 'Catalog',
      invalidMessage: 'Must not empty!',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
          setMaterialCode();
        }
      }
    },
    {
      id: 'volume',
      view: 'text',
      name: 'volume',
      require: true,
      attributes: { maxlength: 3 },
      label: 'Volume',
      invalidMessage: 'Number only!',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
          setMaterialCode();
        }
      }
    },
    {
      id: 'itemNo',
      view: 'text',
      name: 'itemNo',
      require: true,
      attributes: { maxlength: 3 },
      label: 'Item No',
      invalidMessage: 'Number only!',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
          setMaterialCode();
        }
      }
    },
    {
      id: 'itemNm',
      view: 'text',
      name: 'itemNm',
      attributes: { maxlength: 50 },
      label: 'Item Name',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
        }
      }
    },
    {
      id: 'composition',
      view: 'text',
      name: 'composition',
      attributes: { maxlength: 50 },
      label: 'Composition',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
        }
      }
    },
    {
      id: 'finish',
      view: 'text',
      name: 'finish',
      attributes: { maxlength: 50 },
      label: 'Finish',
      on: {
        onTimedKeyPress: function () {
          isChanged = true;
        }
      }
    },
    {
      view: 'button',
      id: 'btnClear',
      value: 'Clear',
      click: () => {
        clearMaterialDetailForm();
      }
    }
  ],
  rules: {
    catalog: webix.rules.isNotEmpty,
    volume: webix.rules.isNumber,
    itemNo: webix.rules.isNumber
  }
});
//END OF MATERIAL DETAIL UI

//SEARCH OPTIONS UI
const searchBar = {
  id: 'searchOption',
  css: 'background-secondary',
  padding: LAYOUT_CONFIG.PADDING_SEARCH_OPTIONS,
  cols: [
    {
      view: 'text',
      id: 'txtCatalog',
      name: 'txtCatalog',
      css: 'engup-40',
      label: 'Catalog',
      labelAlign: 'right',
      labelWidth: 55,
      maxWidth: 150
    },
    { width: LAYOUT_CONFIG.MARGIN_ELEMENT_SEARCH_OPTIONS },
    {
      view: 'text',
      id: 'txtVolume',
      name: 'txtVolume',
      label: 'Volume',
      labelAlign: 'right',
      labelWidth: 60,
      maxWidth: 150
    },
    { width: LAYOUT_CONFIG.MARGIN_ELEMENT_SEARCH_OPTIONS },
    {
      view: 'text',
      id: 'txtItemNo',
      name: 'txtItemNo',
      label: 'Item No.',
      labelAlign: 'right',
      labelWidth: 60,
      maxWidth: 150
    },
    { width: LAYOUT_CONFIG.MARGIN_ELEMENT_SEARCH_OPTIONS },
    {
      view: 'datepicker',
      id: 'startDate',
      name: 'startDate',
      format: webix.Date.dateToStr(DATE_FORMAT.YMD),
      stringResult: true,
      label: 'Start Date',
      labelWidth: 70,
      maxWidth: 200
    },
    {
      view: 'datepicker',
      id: 'endDate',
      name: 'endDate',
      format: webix.Date.dateToStr(DATE_FORMAT.YMD),
      stringResult: true,
      labelWidth: 70,
      maxWidth: 125
    },
    {
      view: 'button',
      id: 'btnSearch',
      name: 'btnSearch',
      width: 100,
      label: 'Search',
      click: function () {
        $$('materialTable').clearAll();
        $$('materialTable').parse(tableData);
        let keyword = {
          txtCatalog: $$('txtCatalog').getValue(),
          txtVolume: $$('txtVolume').getValue(),
          txtItemNo: $$('txtItemNo').getValue(),
          startDate: $$('startDate').getValue(),
          endDate: $$('endDate').getValue()
        };
        let result = [];
        let startDate = keyword.startDate;
        let endDate = keyword.endDate;

        if (!keyword.txtCatalog && !keyword.txtVolume && !keyword.txtItemNo) {
          $$('materialTable').data.each((obj) => {
            if (searchDteBetw(startDate, obj.createDate, endDate)) {
              result.push(obj);
            }
          });
          setGridDefaultData(result);
        }
        else {
          let str = '';
          if (keyword.txtCatalog) {
            str += keyword.txtCatalog.toLowerCase() + '-';
          }
          if (keyword.txtVolume) {
            str += keyword.txtVolume + '-';
          }
          if (keyword.txtItemNo) {
            str += keyword.txtItemNo;
          }
          
          $$('materialTable').data.each((obj) => {
            let value = obj.materialCode.toLowerCase().indexOf(str);
            if (value != -1) {
              if (searchDteBetw(startDate, obj.createDate, endDate)){
                result.push(obj);
              }
            }
          });
          setGridDefaultData(result);
        }

      }
    },
    {
      view: 'button',
      id: 'ResetBtn',
      label: 'Reset',
      width: 100,
      click: () => {
        webix.confirm('Do you want to reset everything ?', 'confirm-warning').then(() => {
          $$('materialDetailForm').clear();
          $$('txtCatalog').setValue('');
          $$('txtVolume').setValue('');
          $$('txtItemNo').setValue('');
          setDefaultDate();
          setGridDefaultData(webix.storage.local.get('gridData'));
        });
      }
    }
  ]
};

//MAIN LAYOUT
const loadLayout = () => {
  webix.ui({
    id: CUR_PGM_NAME,
    container: 'page-content',
    type: 'space',
    css: 'main_layout',
    rows: [
      searchBar,
      {
        margin: LAYOUT_CONFIG.MARGIN_SPACE_05,
        cols: [
          {
            gravity: 8,
            rows: [gridViewHeader(), gridView()]
          },
          {
            rows: [gridDetailHeader(), materialDetailView(), {}]
          }
        ]
      }
    ]
  });
};
//

//TABLE EVENTS
var tableOnClickEvent = () => {
  $$('materialTable').attachEvent('onItemClick', function (id) {
    var item = this.getItem(id);
    if (isChanged) {
      webix.confirm('You have change your values. Do you want to replace it ?', 'confirm-warning').then(() => {
        setMaterialFormFields(item);
        isChanged = false;
      }).fail(() => { });
    }
    else {
      setDisableMaterialForm();
      setMaterialFormFields(item);
      selected = true;
    }
    selectedItem = item;
  });
};
var setMaterialFormFields = (item) => {
  $$('materialDetailForm').setValues({
    //materialCode catalog volume itemNo itemNm composition finish imgForm
    materialCode: `${item.catalog}-${item.volume}-${item.itemNo}`,
    catalog: item.catalog,
    volume: item.volume,
    itemNo: item.itemNo,
    itemNm: item.itemNm,
    composition: item.composition,
    finish: item.finish
  });
};
//END OF TABLE EVENTS

//SEARCH OPTIONS EVENTS
var searchDteBetw = (startDate, checkDate, endDate) => {
  let from = new Date(startDate.split(' ')[0]);
  let to = new Date(endDate.split(' ')[0]);
  let check = new Date(checkDate);

  return (check >= from && check <= to);
};

//MATERIAL FORM EVENTS
const newMaterialItem = () => {
  let value = $$('materialDetailForm').getValues();
  if (value.materialCode) {
    const found = tableData.find(
      element => {
        let a = element.materialCode.toLowerCase();
        let b = value.materialCode.toLowerCase();
        return a == b;
      }
    );
    if (found) {
      webix.message({
        text: 'Already exist an element that has the same material code',
        type: 'error',
        expire: 4000
      });
    }
    else {
      webix.confirm('Do you want to save with these information ?', 'confirm-warning').then(() => {
        value.no = tableData.length;
        tableData.push(value);
        tableData.sort((a, b) => a.no - b.no);
        isChanged = false;
        selected = false;
        setGridDefaultData(tableData);
        setDisableMaterialForm();
        $$('materialDetailForm').clear();
      });
    }
  }

};
const updateMaterialItem = (item) => {
  if (isChanged) {
    const index = tableData.findIndex(element => element.no == item.no);
    tableData[index].itemNm = $$('itemNm').getValue();
    tableData[index].composition = $$('composition').getValue();
    tableData[index].finish = $$('finish').getValue();

    webix.confirm('Do you satisfy with these new information ?', 'confirm-warning').then(() => {
      setGridDefaultData(tableData);
      $$('materialDetailForm').clear();
      selected = false;
      isChanged = false;
    });
  }
};
var addMaterialItemBtn = () => {
  if ($$('materialDetailForm').validate()) {
    if (selected) {
      updateMaterialItem(selectedItem);
    } else {
      newMaterialItem();
    }
  }
  else {
    webix.message({
      text: 'Invalid material form detail',
      type: 'error',
      expire: 4000
    });
  }

};

var deleteMaterialItem = () => {
  if (selectedItem) {
    webix.confirm('Do you want to delete this item ?', 'confirm-warning').then(() => {
      selected = false;
      isChanged = false;
      tableData = tableData.filter((obj) => {
        return obj.materialCode != selectedItem.materialCode;
      });
      selectedItem = null;
      setGridDefaultData(tableData);
      $$('materialDetailForm').clear();
    }).fail(() => { });
  }
};

var materialFormControlsEvents = () => {
  $(`#${service.BUTTON_NEW}`).on('click', () => {
    if (!selected){
      setEnableMaterialForm();
    }
    else {
      webix.message({
        text: 'You have selected an element to update. Click clear and add button to work',
        type: 'error',
        expired: 6000
      });
    }
  });
  $(`#${service.BUTTON_SAVE}`).on('click', () => {
    addMaterialItemBtn();
  });
  $(`#${service.BUTTON_DELETE}`).on('click', () => {
    deleteMaterialItem();
  });
};
const setMaterialCode = () => {
  const catalog = Commons.trimString($$('catalog').getValue().toUpperCase());
  const volume = Commons.trimString($$('volume').getValue());
  const itemNo = Commons.trimString($$('itemNo').getValue());
  const materialCode = catalog + '-' + volume + '-' + itemNo;
  $$('materialCode').setValue(materialCode);
};
var clearMaterialDetailForm = () => {
  if (selected || isChanged) {
    webix.confirm('Do you want clear your data ?', 'confirm-warning').then(() => {
      $$('materialDetailForm').clear();
      selected = false;
      isChanged = false;
      selectedItem = null;
    }).fail(function () { });
  }
};
//END OF EVENTS

//DEFAULT SETUP
var setGridDefaultData = (data) => {
  $$('materialTable').clearAll();
  $$('materialTable').parse(data);
};
var setDefaultDate = () => {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 10);
  $$('startDate').setValue(startDate);
  $$('endDate').setValue(new Date());
};

var setDisableMaterialForm = () => {
  $$('materialCode').disable();
  $$('catalog').disable();
  $$('volume').disable();
  $$('itemNo').disable();
};

var setEnableMaterialForm = () => {
  $$('catalog').enable();
  $$('volume').enable();
  $$('itemNo').enable();
};

const defaultSetup = () => {
  setDefaultDate();
  tableOnClickEvent();
  materialFormControlsEvents();
  setDisableMaterialForm();
};
//END OF DEFAULT SETUP 

service.$ready(() => {
  loadLayout();
  defaultSetup();
  webix.storage.local.put('gridData', tableData);
});