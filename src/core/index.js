import $ from "jquery";
import Tab from "../tab/index";
import Modal from "../modal/index";

class Core {
    constructor() {
        this.tab = new Tab();
        this.modal = new Modal();
    }

    init() {
        console.log("DjsUtil Core Initialized");
        this.tab.setup();
        this.modal.setup();
    }
}

// 모듈 내보내기
export default Core;
