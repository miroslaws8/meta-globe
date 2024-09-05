export enum ModalEvent {
  OPEN_MODAL= 'open-modal',
  CLOSE_MODAL= 'close-modal',
}

class EventBus extends EventTarget {
  dispatch(event: ModalEvent, detail: any) {
    this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  subscribe(event: ModalEvent, callback: (event: any) => void) {
    this.addEventListener(event, callback);
    return () => this.removeEventListener(event, callback);
  }
}

export default new EventBus();
