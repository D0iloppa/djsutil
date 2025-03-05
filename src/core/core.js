import Swal from "sweetalert2";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import TabManager from "../tab/tabManager";
import Modal from "../modal/modal";

// ✅ Tabulator CSS CDN (로컬 파일을 배포하지 않으므로, CDN을 사용)
const TABULATOR_CSS_URL = "https://unpkg.com/tabulator-tables/dist/css/tabulator.min.css";

class DJSUtil {
    constructor() {
        if (!DJSUtil.instance) {

            // https://patorjk.com/software/taag/
            /*
            console.log(`
                ________        ___  ________  ___  ___  _________  ___  ___          
                |\   ___ \      |\  \|\   ____\|\  \|\  \|\___   ___\\  \|\  \         
                \ \  \_|\ \     \ \  \ \  \___|\ \  \\\  \|___ \  \_\ \  \ \  \        
                 \ \  \ \\ \  __ \ \  \ \_____  \ \  \\\  \   \ \  \ \ \  \ \  \       
                  \ \  \_\\ \|\  \\_\  \|____|\  \ \  \\\  \   \ \  \ \ \  \ \  \____  
                   \ \_______\ \________\____\_\  \ \_______\   \ \__\ \ \__\ \_______\
                    \|_______|\|________|\_________\|_______|    \|__|  \|__|\|_______|
                                        \|_________|                                   
                                                                                                       
                `);
            */


            console.group("DJSUtil Initialization");

            console.log(`                            
                ██████╗      ██╗███████╗██╗   ██╗████████╗██╗██╗     
                ██╔══██╗     ██║██╔════╝██║   ██║╚══██╔══╝██║██║     
                ██║  ██║     ██║███████╗██║   ██║   ██║   ██║██║     
                ██║  ██║██   ██║╚════██║██║   ██║   ██║   ██║██║     
                ██████╔╝╚█████╔╝███████║╚██████╔╝   ██║   ██║███████╗
                ╚═════╝  ╚════╝ ╚══════╝ ╚═════╝    ╚═╝   ╚═╝╚══════╝
                `)

            console.log(`🐋 [%cDJSUtil%c] is Loaded at ${new Date().toLocaleTimeString()} 

 - %c@author%c: doil
 - GitHub: https://github.com/D0iloppa/djsutil`, 
               "color: #4CAF50; font-weight: bold;", "", 
               "color: #f1b50e; font-weight: bold;", "");
           
            console.log(`🤔 [%cDJSUtil%c] Type %cDJSUtil.help()%c to see available methods.`, 
                "color: #4CAF50; font-weight: bold;", "", "color: #2196F3; font-weight: bold;", "");

            console.log(`🧪 [%cDJSUtil%c] Type %cDJSUtil.test()%c to generate _TESTBED_ area.`, 
                    "color: #4CAF50; font-weight: bold;", "", "color: #2196F3; font-weight: bold;", "");

            console.groupEnd();


            // ✅ 싱글턴 인스턴스 생성
            DJSUtil.instance = this;
            
            // ✅ 내부 상태 관리
            this.g_val = {};
            this.tabs = {};
            this.modals = {};
            this.tabulators = {};

            // ✅ 외부 라이브러리 연결
            this.swal = Swal;
            this.Tabulator = Tabulator;
            this.TabManager = TabManager;
            this.Modal = Modal;


            this.settings = { 
                verboseMode : true
            };

            this.loadTabulatorCSS(); // ✅ CSS 동적 로드
        }
        
        return DJSUtil.instance;
    }

    setVerboseMode(mode = true) {
        this.settings.verboseMode = mode;
        console.log(`🔧 [%cDJSUtil%c] Verbose Mode: %c${mode ? "ON" : "OFF"}`, 
                "color: #4CAF50; font-weight: bold;", "", 
                `color: ${mode ? "#4CAF50" : "#FF0000"}; font-weight: bold;`);
    }

    help() {
        console.groupCollapsed("😎 [%cDJSUtil%c] GUIDE | Click to expand ⬇", 
            "color: #4CAF50; font-weight: bold;", ""
        );
    
        console.log("%c📌 Available Methods:", "color: #2196F3; font-weight: bold;");
        /*
        console.table([
            { Method: "test", Parameters: "-", Description: "테스트용 div를 생성하여 body 최상단에 추가합니다." },
            { Method: "swal", Parameters: "-", Description: "SweetAlert2 객체입니다." },
            { Method: "generateTabManager", Parameters: "@selector {string}, @options {object}", Description: "TabManager을 생성합니다." },
            { Method: "generateModal", Parameters: "@id {string}, @options {object}", Description: "Modal을 생성합니다." },
            { Method: "generateTable", Parameters: "@selector {string}, @options {object}", Description: "Tabulator 테이블을 생성합니다." },
            { Method: "getTable", Parameters: "@identifier {string}", Description: "등록된 테이블을 가져옵니다." },
            { Method: "getTabManager", Parameters: "@identifier {string}", Description: "등록된 TabManager 객체를 가져옵니다." },
            { Method: "dJSUtiIDFromSelector", Parameters: "@selector {string}", Description: "Selector ID를 변환합니다." }
            { Method: "setVerboseMode", Parameters: "@mode {boolean}", Description: "모듈에서 출력하는 log레벨 콘솔로그의 출력여부를 설정합니다." }
            
        ]);
        */

        // ✅ 함수 목록 출력
        console.log("%c• test() : %c테스트용 div를 생성하여 body 최상단에 추가합니다.",
            "font-weight: bold;", "color: inherit;"
        );

        console.log("%c• swal : %cSweetAlert2 객체입니다.", 
            "font-weight: bold;", "color: inherit;"
        );

        console.log("%c• generateTabManager(%c@selector {string}, @options {object}%c) : %cTabManager을 생성합니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• generateModal(%c@id {string}, @options {object}%c) : %cModal을 생성합니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• generateTable(%c@selector {string}, @options {object}%c) : %cTabulator 테이블을 생성합니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• getTable(%c@identifier {string}%c) : %c등록된 테이블을 가져옵니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• getTabManager(%c@identifier {string}%c) : %c등록된 TabManager 객체를 가져옵니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• dJSUtiIDFromSelector(%c@selector {string}%c) : %cSelector ID를 변환합니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );

        console.log("%c• setVerboseMode(%c@mode {boolean}%c) : %c모듈에서 출력하는 log레벨 콘솔로그의 출력여부를 설정합니다.",
            "font-weight: bold;", "color: #2196F3;", "color: inherit;", "color: inherit;"
        );



        console.groupEnd();
    }
    
    
    

    test() {
        if (!document.getElementById("DJSUtil-Testbed")) {
            if (this.settings.verboseMode) {
                console.log("%c🔬 [DJSUtil] Testbed Created!", "color: #673AB7; font-weight: bold;");
            }

            // ✅ Testbed 컨테이너 생성
            const testbed = document.createElement("div");
            testbed.id = "DJSUtil-Testbed";
            testbed.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 10px;
                font-size: 14px;
                text-align: center;
                border-bottom: 2px solid #4CAF50;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
    
            // ✅ 테스트용 row div 생성 (탭 테스트 영역)
            const testTabRow = document.createElement("div");
            testTabRow.id = "djs-test-tab";
            testTabRow.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                min-height: 300px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `;
            testTabRow.innerHTML = `
                <b>🟢 Tab Test 영역</b><span style='margin-left:5px'>div id : djs-test-tab</span>
                <pre style="white-space: pre; background:#222; color:#fff; padding:10px; border-radius:5px; margin-top:5px; text-align: left; font-family: monospace; overflow-x: auto;">
    (* 예시) :
                
    DJSUtil.generateTabManager("#djs-test-tab",{
        height: "400px",
        width: "800px",
        initTabs : [
            { tab_title: "Tab 1", tab_content: "Content 1", isRemovable: true },
            { tab_title: "Tab 2", tab_content: "Content 2", isRemovable: false },
        ]
    });
                </pre>
                <button id="tab-test-btn" style="margin-top:10px; padding:5px 10px; background:#4CAF50; color:white; border:none; border-radius:3px; cursor:pointer;">
                    ▶ SAMPLE 실행
                </button>
            `;
    
            // ✅ 테스트용 row div 생성 (테이블 테스트 영역)
            const testTableRow = document.createElement("div");
            testTableRow.id = "djs-test-table";
            testTableRow.style.cssText = `
                background: rgba(255, 255, 255, 0.1);
                padding: 10px;
                border-radius: 5px;
                text-align: center;
                min-height: 300px; 
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            `;
            testTableRow.innerHTML = `
                <b>🔵 Tabulator Test 영역</b><span style='margin-left:5px'>div id : djs-test-table</span>
                  <pre style="white-space: pre; background:#222; color:#fff; padding:10px; border-radius:5px; margin-top:5px; text-align: left; font-family: monospace; overflow-x: auto;">
(* 예시) :

    DJSUtil.generateTable("#djs-test-table", {
        data: [
            { id: 1, name: "DJSUtil" },
            { id: 2, name: "Test Tabulator" }
        ],
        layout: "fitColumns",
        columns: [
            { title: "ID", field: "id", width: 50 },
            { title: "Name", field: "name" }
        ]
    });
</pre>
                <button id="table-test-btn" style="margin-top:10px; padding:5px 10px; background:#2196F3; color:white; border:none; border-radius:3px; cursor:pointer;">
                    ▶ SAMPLE 실행
                </button>
            `;

             // ✅ 테스트용 row div 생성 (탭 테스트 영역)
             const buttonsRow = document.createElement("div");
             buttonsRow.id = "djs-test-buttons";
             buttonsRow.style.cssText = `
                 background: rgba(255, 255, 255, 0.1);
                 padding: 10px;
                 border-radius: 5px;
                 text-align: center;
                 min-height: 100px;
                 display: flex;
                 flex-direction: column;
                 align-items: center;
                 justify-content: center;
             `;
             buttonsRow.innerHTML = `
                 <b>🟣 단순 함수 호출 영역</b>
                <pre style="white-space: pre; background:#222; color:#fff; padding:10px; border-radius:5px; margin-top:5px; text-align: left; font-family: monospace; overflow-x: auto;">
    (* 예시) :

    • DJSUtil.setVerboseMode(true);
    • DJSUtil.setVerboseMode(false);
    • DJSUtil.swal.fire('🔊 verboseMode HAS BEEN TURNED ON');
                </pre>
                 <div style="margin-top:10px; display:flex; gap:10px;">
                    <button id="btns-verebose-on" style="margin-top:10px; padding:5px 10px; background:#8d65c5; color:white; border:none; border-radius:3px; cursor:pointer;"> 🔊 verboseMode ON </button>
                    <button id="btns-verebose-off" style="margin-top:10px; padding:5px 10px; background:#8d65c5; color:white; border:none; border-radius:3px; cursor:pointer;"> 🔇 verboseMode OFF </button>
                    <button id="btns-swal-fire" style="margin-top:10px; padding:5px 10px; background:#8d65c5; color:white; border:none; border-radius:3px; cursor:pointer;">  🔥 Swal fire (HELLO WORLD) </button>
                 </div>
                 
             `;
    
            // ✅ 컨테이너에 추가
            testbed.appendChild(testTabRow);
            testbed.appendChild(testTableRow);
            testbed.appendChild(buttonsRow);
    
            document.body.prepend(testbed); // ✅ 화면 최상단에 삽입
    
            // ✅ 버튼 이벤트 리스너 추가 (샘플 코드 실행)
            document.getElementById("tab-test-btn").addEventListener("click", function() {
                window.DJSUtil.generateTabManager("#djs-test-tab",{
                    height: "400px",
                    width: "800px",
                    initTabs : [
                        { tab_title: "Tab 1", tab_content: "Content 1", isRemovable: true },
                        { tab_title: "Tab 2", tab_content: "Content 2", isRemovable: false },
                    ]
                });
            });
    
            document.getElementById("table-test-btn").addEventListener("click", function() {
                window.DJSUtil.generateTable("#djs-test-table", {
                    data: [
                        { id: 1, name: "DJSUtil" },
                        { id: 2, name: "Test Tabulator" },
                        { id: 2, name: `let table = DJSUtil.getTable("#djs-test-table") 로 확인해보세요` }
                    ],
                    layout: "fitColumns",
                    columns: [
                        { title: "ID", field: "id", width: 50 },
                        { title: "Name", field: "name" }
                    ]
                });
            });


            document.getElementById("btns-verebose-on").addEventListener("click", function() {
                window.DJSUtil.swal.fire('🔊 verboseMode HAS BEEN TURNED ON');
                window.DJSUtil.setVerboseMode(true);
            });

            document.getElementById("btns-verebose-off").addEventListener("click", function() {
                window.DJSUtil.swal.fire('🔇 verboseMode HAS BEEN TURNED OFF');
                window.DJSUtil.setVerboseMode(false);
            });

            document.getElementById("btns-swal-fire").addEventListener("click", function() {
                window.DJSUtil.swal.fire('😂 HELLO WORLD 😂')
            });


        } else {
            if (this.settings.verboseMode) {
                console.log("%c⚠️ [DJSUtil] Testbed already exists.", "color: #FFC107; font-weight: bold;");
            }
        }
    }
    
    
    
    
    

    /** ✅ 기본 CSS를 삽입하되, 사용자 정의 CSS가 있는 경우 기본 CSS를 비활성화 */
    loadTabulatorCSS() {
        const customCSS = document.querySelector("link[href*='custom-tabulator.css']");
        if (customCSS) {
            return; // ✅ 사용자가 custom-tabulator.css를 추가한 경우, 기본 CSS 로드 X
        }

        const existingCSS = document.querySelector("link[href*='tabulator.min.css']");
        if (!existingCSS) {
            const link = document.createElement("link");
            link.rel = "stylesheet";
            link.href = TABULATOR_CSS_URL; // ✅ CDN을 사용하여 기본 CSS 로드
            document.head.appendChild(link);
        }
    }

    dJSUtiIDFromSelector(selector) {
        return selector.replace("#", "").replace(/-/g, "_");
    }

    generateTabManager(selector, options = {}) {
        const id = this.dJSUtiIDFromSelector(selector); // ✅ selector 기반 ID 생성

        const finalOptions = {
            ...options,
            "core_settings" : this.settings,
            "methods" : {
                dJSUtiIDFromSelector : this.dJSUtiIDFromSelector.bind(this)
            }
        }
        
        if (!this.tabs[id]) {
            this.tabs[id] = new this.TabManager(selector, finalOptions); // ✅ 개별 selector에 대해 탭 인스턴스 생성
        }
    
        return this.tabs[id]; // ✅ 해당 selector의 탭 인스턴스 반환
    }
    

    generateModal(id = null, options = {}) {
        if (!id) {
            id = `modal_${Object.keys(this.modals).length + 1}`;
        }
        if (!this.modals[id]) {
            this.modals[id] = new this.Modal(id, options);
        }
        return this.modals[id];
    }

    

    generateTable(selector, options = {}) {
        
        const id = this.dJSUtiIDFromSelector(selector);
        if (this.settings.verboseMode) {
            console.log(`🏗️ [%cDJSUtil%c] Using Tabulator, ID: %c${id}`, 
                "color: #4CAF50; font-weight: bold;", "", 
                "color: #FFC107; font-weight: bold;"
            );
        }

        if (!this.tabulators[id]) {
            this.tabulators[id] = new this.Tabulator(selector, options);
        }
        return this.tabulators[id];
    }

    getTable(identifier) {
        if (this.tabulators[identifier]) {
            return this.tabulators[identifier];
        }
    
        const id = this.dJSUtiIDFromSelector(identifier);
        if (this.tabulators[id]) {
            return this.tabulators[id];
        }
    
        return undefined;
    }


    getTabManager(identifier) {
        if (this.tabs[identifier]) {
            return this.tabs[identifier];
        }
    
        const id = this.dJSUtiIDFromSelector(identifier);
        if (this.tabs[id]) {
            return this.tabs[id];
        }
    
        return undefined;
    }
}

// ✅ 싱글턴 인스턴스 생성 & 동결
const instance = new DJSUtil();
Object.freeze(instance);

if (typeof window !== "undefined") {
    window.DJSUtil = instance;
}

// ✅ 모듈에서도 동일한 싱글턴 인스턴스 내보내기
export default instance;
