import AbstractService from '/assets/js/core/abstract-service.js';
import Snackbar from '/assets/js/core/message.js';
import { COMPANY_CODE, CONSTANTS } from '/assets/js/core/index.js';
import * as Commons from '/assets/js/utils/commons.js';
import api from './api.js';

class Service extends AbstractService {

    IS_CREATE_NEW_CASE = false;
    IS_UPLOAD_IMAGE = false;
    // IS_DELETE_ENABLE = true;
    BUTTON_NEW = 'newbtn';
    BUTTON_DELETE = 'delbtn';
    BUTTON_SAVE = 'savebtn';
    MATERIAL_CODE = '';
    CATALOG = '';
    VOLUME = '';
    ITEM_NO = '';
    ITEM_NAME = '';
    COMPOSITION = '';
    FINISH = '';

    checkInputDate = (startDate, endDate) => {
      const stdt = new Date(startDate);
      const endt = new Date(endDate);
      stdt.setHours(0, 0, 0, 0);
      endt.setHours(0, 0, 0, 0);
      return stdt < endt;
    };

    filterDataGrid = async (rowIndex) => {
      webix.extend($$('materialTable'), webix.ProgressBar);
      $$('materialTable').showProgress({
        hide: false
      });
      let catalog = Commons.trimString($$('txtCatalog').getValue());
      let volume = Commons.trimString($$('txtVolume').getValue());
      let itemNo = Commons.trimString($$('txtItemNo').getValue());
      let itemNm = Commons.trimString($$('txtNameAndOther').getValue());
      let fromDate = Commons.trimString($$('startDt').getValue());
      let toDate = Commons.trimString($$('endDt').getValue());

      if (!this.checkInputDate(fromDate, toDate)) {
        Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'End date must be greater Start date!');
        $$('materialTable').hideProgress();
        return;
      }

      if ((!webix.rules.isNumber(volume) && volume !== '') || (!webix.rules.isNumber(itemNo) && itemNo !== '')) {
        $$('materialTable').hideProgress();
        Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Please enter inputs correctly');
        return;
      }

      const param = {
        coCd: COMPANY_CODE.PK,
        ctl: catalog,
        vol: volume,
        itmNo: itemNo,
        itmNm: itemNm,
        fromDate: fromDate,
        toDate: toDate
      };
      const modelList = await api.selectCatalogModelList(param);
      this.clearMaterialDetail();
      $$('materialDetailForm').clear();
      $$('materialTable').clearAll();
      $$('materialTable').parse(modelList.data.data);

      if (rowIndex !== undefined && webix.rules.isNumber(rowIndex)) {
        const selectedRowId = $$('materialTable').getIdByIndex(rowIndex);
        $$('materialTable').select(selectedRowId);
      }
      $$('materialTable').hideProgress();
    };

    onBtnNewClick = () => {
      this.clearMaterialDetail();
      $$('materialDetailForm').clear();
      $$('catalog').define('disabled', false);
      $$('volume').define('disabled', false);
      $$('itemNo').define('disabled', false);
      $$('imgForm').setValues({ data: '' });
      this.IS_CREATE_NEW_CASE = true;
      $$('materialDetailForm').clearValidation();
    };

    // helper function: generate a new file from base64 String
    dataURLtoFile = (dataurl, filename) => {
      const arr = dataurl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n) {
        u8arr[n - 1] = bstr.charCodeAt(n - 1);
        n -= 1; // to make eslint happy
      }
      return new File([u8arr], filename, { type: mime });
    };

    onBtnSaveClick = async () => {
      webix.extend($$('materialTable'), webix.ProgressBar);
      $$('materialTable').showProgress({
        hide: false
      });

      $$('materialDetailForm').clearValidation();
      const rules = {
        materialCode: webix.rules.isNotEmpty,
        catalog: webix.rules.isNotEmpty,
        volume: webix.rules.isNumber,
        itemNo: webix.rules.isNumber
      };
      $$('materialDetailForm').define('rules', rules);
      $$('materialDetailForm').refresh();
      if (!$$('materialDetailForm').validate()) {
        Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Save failed');
        $$('materialTable').hideProgress();
        return;
      }

      let materialCode = Commons.trimString($$('materialCode').getValue());
      let catalog = Commons.trimString($$('catalog').getValue());
      let volume = Commons.trimString($$('volume').getValue());
      let itemNo = Commons.trimString($$('itemNo').getValue());
      let itemNm = Commons.trimString($$('itemNm').getValue());
      let composition = Commons.trimString($$('composition').getValue());
      let finish = Commons.trimString($$('finish').getValue());
      let imagePath = '';

      if (itemNm === this.ITEM_NAME && composition === this.COMPOSITION
            && finish === this.FINISH && !this.IS_UPLOAD_IMAGE
            && !this.IS_CREATE_NEW_CASE) {
        $$('materialTable').hideProgress();
        Snackbar.showMessage(CONSTANTS.WARNING_MESSAGE, 'There is no update to save!');
        return;
      }

      this.MATERIAL_CODE = materialCode;
      const image = $('#img-cat').attr('src').toString();
      if (this.IS_UPLOAD_IMAGE) {
        try {
          imagePath = await this.uploadModelImages(image);
          $$('imgForm').setValues({ data: imagePath });
        } catch (e) {
          $$('materialTable').hideProgress();
          Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Save failed');
          return;
        }
      } else {
        imagePath = image;
      }

      const data = {
        coCd: COMPANY_CODE.PK,
        mtrCd: materialCode,
        ctl: catalog,
        vol: volume,
        itmNo: itemNo,
        itmNm: itemNm,
        cz: composition,
        fsh: finish,
        imgPth: imagePath
      };
      let response = {};
      if (this.IS_CREATE_NEW_CASE === true) {
        response = await api.createCatalogModelList(data);
      } else {
        response = await api.updateCatalogModelList(data);
      }
      if (response.data.errors.length > 0) {
        Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Save failed');
      } else {
        if (this.IS_CREATE_NEW_CASE) {
          Snackbar.showMessage(CONSTANTS.SUCCESS_MESSAGE, 'Create catalog successfully!');
        } else {
          Snackbar.showMessage(CONSTANTS.SUCCESS_MESSAGE, 'Update catalog successfully!');
        }
      }
      this.resetGrid();
      $$('catalog').define('disabled', true);
      $$('volume').define('disabled', true);
      $$('itemNo').define('disabled', true);
      this.IS_CREATE_NEW_CASE = false;
      this.IS_UPLOAD_IMAGE = false;
      this.ITEM_NAME = itemNm;
      this.COMPOSITION = composition;
      this.FINISH = finish;
      $$('materialTable').hideProgress();

    };

    resetGrid = () => {
      const selectedRowId = $$('materialTable').getSelectedId();
      if (this.IS_CREATE_NEW_CASE) {
        this.filterDataGrid();
      } else {
        const rowIndex = $$('materialTable').getIndexById(selectedRowId);
        this.filterDataGrid(rowIndex);
      }
    };

    uploadModelImages = async (image) => {
      const file = this.dataURLtoFile(image);
      const data = new FormData();
      data.append('files', file);
      data.append('materialCode', this.MATERIAL_CODE);
      const response = await api.saveImage(data);
      return response.data.replace(/\\/g, '/');
    };

    onBtnDeleteClick = () => {
      const materialCode = $$('materialCode').getValue();
      if (this.IS_CREATE_NEW_CASE) {
        return;
      }
      if (materialCode === '') {
        Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Mandatory field is missing!', null);
        return;
      }

      Snackbar.showConfirm('Are you sure want to delete Catalog?', null, async () => {
        $$('materialDetailForm').clearValidation();
        const mtrCd = {
          materialCode: materialCode
        };

        const partIds = await api.checkUseMaterialCode(mtrCd);
        if (partIds.data.length > 0) {
          Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Material Code is using in some parts');
          return;
        }

        const data = {
          mtrCd: materialCode
        };
        const response = await api.deleteCatalogModelList(data);
        if (response.data.errors.length > 0) {
          Snackbar.showMessage(CONSTANTS.ERROR_MESSAGE, 'Delete failed');
        } else {
          Snackbar.showMessage(CONSTANTS.SUCCESS_MESSAGE, 'Detele catalog successfully!');
          $$('materialDetailForm').clear();
          $$('imgForm').setValues({ data: '' });
        }
        this.filterDataGrid();
      });
    };

    clearMaterialDetail = () => {
      this.CATALOG = '';
      this.VOLUME = '';
      this.ITEM_NO = '';
      this.ITEM_NAME = '';
      this.COMPOSITION = '';
      this.FINISH = '';
      $$('imgForm').setValues({ data: '' });
    };

    bindDataToCatalogForm = (data) => {
      if (this.isDataChanged()) {
        Snackbar.showConfirm(i18next.t('msg:COM0030') + '?', null, () => {
          this.onBtnSaveClick().then(() => this.loadDatatoForm(data));
        }, () => {
          this.loadDatatoForm(data);
        });
      } else {
        this.loadDatatoForm(data);
      }
    };

    loadDatatoForm = (data) => {
      $$('materialCode').define('disabled', true);
      $$('materialDetailForm').clear();
      $$('materialDetailForm').parse(data);
      $$('imgForm').setValues({ data: data.imagePath });
      $$('materialDetailForm').clearValidation();
      $$('catalog').define('disabled', true);
      $$('volume').define('disabled', true);
      $$('itemNo').define('disabled', true);

      this.IS_CREATE_NEW_CASE = false;
      this.IS_UPLOAD_IMAGE = false;
      // this.IS_DELETE_ENABLE = true;
      this.CATALOG = Commons.trimString($$('catalog').getValue());
      this.VOLUME = Commons.trimString($$('volume').getValue());
      this.ITEM_NO = Commons.trimString($$('itemNo').getValue());
      this.ITEM_NAME = Commons.trimString($$('itemNm').getValue());
      this.COMPOSITION = Commons.trimString($$('composition').getValue());
      this.FINISH = Commons.trimString($$('finish').getValue());
    };

    isDataChanged = () => {
      const itemNm = Commons.trimString($$('itemNm').getValue());
      const composition = Commons.trimString($$('composition').getValue());
      const finish = Commons.trimString($$('finish').getValue());
      if (this.IS_CREATE_NEW_CASE) {
        const catalog = Commons.trimString($$('catalog').getValue());
        const volume = Commons.trimString($$('volume').getValue());
        const itemNo = Commons.trimString($$('itemNo').getValue());
        return catalog !== this.CATALOG || volume !== this.VOLUME
                || itemNo !== this.ITEM_NO || itemNm !== this.ITEM_NAME
                || composition !== this.COMPOSITION || finish !== this.FINISH
                || this.IS_UPLOAD_IMAGE;
      }
      return itemNm !== this.ITEM_NAME || composition !== this.COMPOSITION
            || finish !== this.FINISH || this.IS_UPLOAD_IMAGE;
    };

    setMaterialCode = () => {
      const catalog = Commons.trimString($$('catalog').getValue());
      const volume = Commons.trimString($$('volume').getValue());
      const itemNo = Commons.trimString($$('itemNo').getValue());
      const materialCode = catalog + '-' + volume + '-' + itemNo;
      $$('materialCode').setValue(materialCode);

    };
}

export default new Service();
