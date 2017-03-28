import { loadCanvasListRequest, saveCanvasToListRequest, removeCanvasFromListRequest } from "./CanvasSaga";
import { toggleDialogRequest, toggleDrawerRequest } from "./SettingsSaga";
import { loadDataTypesRequest, addDataTypeRequest } from "./DataTypesSaga";

export function* rootSaga() {
  yield [
    loadCanvasListRequest(),
    saveCanvasToListRequest(),
    removeCanvasFromListRequest(),
    toggleDialogRequest(),
    toggleDrawerRequest(),
    loadDataTypesRequest(),
    addDataTypeRequest()
  ]
}