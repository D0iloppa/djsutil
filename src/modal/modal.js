class Modal {
    constructor(id, options = {}) {
        this.id = id;
        this.options = options;
        this.state = {
            isOpen: false,
        };
    }

    // ✅ 모달 열기
    open() {
        this.state.isOpen = true;
    }

    // ✅ 모달 닫기
    close() {
        this.state.isOpen = false;
    }

    getState() {
        return this.state;
    }
}

export default Modal;