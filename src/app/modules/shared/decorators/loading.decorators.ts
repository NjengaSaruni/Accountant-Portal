export function ShowLoader() {
  return function (Class: Function) {
    Object.defineProperty(Class.prototype, 'showLoader', {
      value: true
    });
  }
}


export function HideLoader(triggerAction: string) {
  console.log(triggerAction);
  return function (Class: Function) {
    Object.defineProperty(Class.prototype, 'triggerAction', {
      value: triggerAction
    });
  }
}
