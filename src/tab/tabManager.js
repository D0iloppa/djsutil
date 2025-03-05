import './tabManager.css';

class TabManager {
    constructor(selector, options = {}) {
        this.selector = selector;
        this.options = options;
        this.settings = options.core_settings;
        this.state = {
            tabCounter : 1,
            maxTabSize: options.maxTabSize || -1, // 0 이면 무제한
            activeTab: null,
            tabs: [],
        };

        this.dJSUtiIDFromSelector = options.methods.dJSUtiIDFromSelector;


        this.width = options.width || "100%";
        this.height = options.height || "auto";

        this.initTabs = options.initTabs || [];




        // ✅ 이벤트 리스너 저장 객체
        this.events = {}; 


        // ✅ 사용 가능한 이벤트 리스트 (잘못된 이벤트 등록 방지)
        this.eventList = [
            "beforeRender",         // ✅ 렌더링 전에 실행됨
            "rendered",             // ✅ 렌더링 후 실행됨
            "beforeTabAdd",         // ✅ 탭이 추가되기 전에 실행됨
            "tabAdded",             // ✅ 탭이 정상적으로 추가된 후 실행됨
            "beforeTabRemove",      // ✅ 탭이 삭제되기 전에 실행됨
            "tabRemoved",           // ✅ 탭이 정상적으로 삭제된 후 실행됨
            "tabClicked",           // ✅ 탭이 클릭되었을 때 실행됨
            "beforeTabActivate",    // ✅ 탭이 활성화되기 전에 실행됨
            "tabActivated",         // ✅ 탭이 활성화되었을 때 실행됨
            "beforeTabDeactivate",  // ✅ 기존 탭이 비활성화되기 전에 실행됨
            "tabDeactivated"        // ✅ 기존 탭이 비활성화될 때 실행됨
        ];

        // 이벤트 정의
        this.#defineEvents();




        this.init();
    }

    #log(...args){
        if (this.settings.verboseMode){
            console.log(...args);
        }
    }

    #defineEvents() {


        this.on("beforeRender", async ({ isInit }) => {
            this.#log(`🔄 [%cTabManager%c] Running beforeRender (isInit: %c${isInit})`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #2196F3; font-weight: bold;"
            );
            return true; // ✅ 기본적으로 렌더링을 허용
        });

        this.on("rendered", ({ isInit }) => {
            this.#log(`🎨 [%cTabManager%c] ${isInit ? "Initialized" : "Redrawn"}: %c${this.selector}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FFC107; font-weight: bold;"
            );
        });


        this.on("beforeTabAdd", async (tab) => {
            this.#log(`🔄 [%cTabManager%c] Running beforeTabAdd for: %c${tab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #2196F3; font-weight: bold;"
            );
            return true;
        });

        this.on("tabAdded", (tab) => {
            this.#log(`📌 [%cTabManager%c] Tab Added: %c${tab.tab_id} (%c${tab.tab_title}%c)`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #4CAF50; font-weight: bold;", 
                "color: #2196F3; font-weight: bold;", ""
            );
        });

        this.on("beforeTabRemove", async (tab) => {
            this.#log(`🔄 [%cTabManager%c] Running beforeTabRemove for: %c${tab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF9800; font-weight: bold;"
            );
            return true;
        });

        this.on("tabRemoved", (tab) => {
            this.#log(`❌ [%cTabManager%c] Tab Removed: %c${tab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
        });

        this.on("tabClicked", (tab) => {
            this.#log(`🖱️ [%cTabManager%c] Tab Clicked: %c${tab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #2196F3; font-weight: bold;"
            );
        });



        this.on("beforeTabDeactivate", async ({ prevTab, newTab }) => {
            this.#log(`🔄 [%cTabManager%c] Checking beforeTabDeactivate for: %c${prevTab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF9800; font-weight: bold;"
            );
            return true; // ✅ 기본적으로 허용
        });
    
        this.on("beforeTabActivate", async ({ prevTab, newTab }) => {
            this.#log(`🔄 [%cTabManager%c] Checking beforeTabActivate: %c${newTab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #2196F3; font-weight: bold;"
            );
            return true; // ✅ 기본적으로 허용
        });
    
        // ✅ 비활성화 후 실행되는 이벤트 (void 함수)
        this.on("tabDeactivated", ({ prevTab, newTab }) => {
            this.#log(`🔻 [%cTabManager%c] Tab Deactivated: %c${prevTab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF9800; font-weight: bold;"
            );
        });
    
        // ✅ 활성화 후 실행되는 이벤트 (void 함수)
        this.on("tabActivated", ({ prevTab, newTab }) => {
            this.#log(`✅ [%cTabManager%c] Tab Activated: %c${newTab.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #4CAF50; font-weight: bold;"
            );
        });


    }

    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    

    async emit(eventName, payload) {
        if (!this.events[eventName]) return true; // ✅ 기본적으로 true 반환 (이벤트가 없으면 차단하지 않음)
    
        const results = await Promise.all(
            this.events[eventName].map(async (callback) => {
                try {
                    return await callback(payload) !== false; // ✅ 하나라도 false 반환 시 false 리턴
                } catch (error) {
                    console.error(`⚠️ [%cTabManager%c] Error in event handler for %c${eventName}: %c${error.message}`, 
                        "color: #673AB7; font-weight: bold;", "", 
                        "color: #2196F3; font-weight: bold;", 
                        "color: #FF0000; font-weight: bold;"
                    );
                    return true; // ✅ 오류 발생 시 기본적으로 이벤트를 계속 진행
                }
            })
        );
    
        return results.every(result => result === true); // ✅ 모든 결과가 true이면 true 반환
    }
    

    off(eventName, callback = null) {
        if (!this.events[eventName]) return;

        if (callback) {
            // ✅ 특정 콜백 제거
            this.events[eventName] = this.events[eventName].filter(cb => cb !== callback);
        } else {
            // ✅ 전체 리스너 제거
            delete this.events[eventName];
        }
    }


    
    async redraw(isInit = false) {
        const canRender = await this.emit("beforeRender", {isInit});
        if (canRender === false) {
            console.warn(`🚫 [%cTabManager%c] Render blocked by beforeRender event`, 
                "color: #673AB7; font-weight: bold;", ""
            );
            return;
        }
    
        const container = document.querySelector(this.selector);
        if (!container) {
            console.error(`❌ [%cTabManager%c] Invalid selector: %c${this.selector}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ 기존 내용 초기화 및 스타일 적용
        container.innerHTML = "";
        container.removeAttribute("style");
        container.style.width = this.width;
        container.style.height = this.height;
        container.style.overflow = "hidden";
    
        // ✅ tabArea 생성
        this.tabArea = document.createElement("div");
        this.tabArea.className = "tab-area";
    
        // ✅ contArea 생성
        this.contArea = document.createElement("div");
        this.contArea.className = "cont-area";
        this.contArea.style.cssText = "padding: 10px;";
    
        // ✅ 컨테이너에 추가
        container.appendChild(this.tabArea);
        container.appendChild(this.contArea);
    
        // ✅ 기존 탭 복원 (addTab 재실행)
        for (const tab of this.state.tabs) {
            await this.addTab(tab, false); // ✅ `emit` 실행 방지
        }
    
        this.emit("rendered", {isInit}); // ✅ 렌더링 완료 후 이벤트 실행
    }
    


    // ✅ 초기화 함수: selector 기준으로 tabArea & contArea 생성
    init() {
        const tabId = this.dJSUtiIDFromSelector(this.selector);
    
        const container = document.querySelector(this.selector);
        if (!container) {
            console.error(`❌ [%cTabManager%c] Invalid selector: %c${this.selector}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ `tabMng-id` 속성 추가 (기존 속성이 없다면)
        if (!container.hasAttribute("tabMng-id")) {
            container.setAttribute("tabMng-id", tabId);
        }

        container.classList.add("tabManager");

    
        // ✅ `redraw(true)` 호출 → 초기화 플래그 전달
        this.redraw(true).then(() => {
            
            // ✅ 비동기 작업이 완료된 후 탭 추가
            if (this.initTabs) {
                for (const tab of this.initTabs) {
                    this.addTab(tab);
                }
            }
        }).catch(error => {
            console.error("Error during redraw:", error);
        });
    
        this.#log(`📑 [%cTabManager%c] Initialized: %c${this.selector} (tabMng-id: ${tabId})`, 
            "color: #673AB7; font-weight: bold;", "", 
            "color: #FFC107; font-weight: bold;"
        );
    }
    


    generateTabID() {
        return `djsTab_${this.state.tabCounter++}`;
    }
    

    async addTab({ tab_id = false, tab_title, tab_content = '', load_model = false, icon = '', isRemovable = true }, emitEvent = true) {
        if (!tab_id) {
            tab_id = this.generateTabID();
        }
    
        let tabObj = { tab_id, tab_title, icon, tabData : {} };
    
        // ✅ `beforeTabAdd` 이벤트 실행 → 결과가 false이면 탭 추가 차단
        if (emitEvent) {
            const canProceed = await this.emit("beforeTabAdd", tabObj);
            if (!canProceed) {
                console.warn(`🚫 [%cTabManager%c] Tab addition blocked: %c${tab_id}`, 
                    "color: #673AB7; font-weight: bold;", "", 
                    "color: #FF9800; font-weight: bold;"
                );
                return;
            }
        }
    
    
        // ✅ 중복 체크
        if (this.state.tabs.find(tab => tab.tab_id === tabObj.tab_id)) {
            console.error(`❌ [%cTabManager%c] Duplicate tab_id: %c${tabObj.tab_id}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ `load_model`이 존재하면 API 호출하여 `tab_content` 설정
        if (load_model) {
            try {
                this.#log(`🔄 [%cTabManager%c] Loading external content for tab: %c${tabObj.tab_id}`, 
                    "color: #673AB7; font-weight: bold;", "", 
                    "color: #2196F3; font-weight: bold;"
                );
               
                const response = await fetch(load_model);
                if (!response.ok) throw new Error(`Failed to load content: ${response.status}`);
    
                tab_content = await response.text();
                

                this.#log(`✅ [%cTabManager%c] Content loaded successfully for tab: %c${tabObj.tab_id}`, 
                    "color: #673AB7; font-weight: bold;", "", 
                    "color: #4CAF50; font-weight: bold;"
                );
             
            } catch (error) {
                console.error(`⚠️ [%cTabManager%c] Error loading model: %c${error.message}`, 
                    "color: #673AB7; font-weight: bold;", "", 
                    "color: #FF0000; font-weight: bold;"
                );
                tab_content = "⚠️ Error loading content.";
            }
        }
    
        // ✅ 탭 추가
        this.state.tabs.push(tabObj);
    
        // ✅ container 찾기 (tabMng-id 기준)
        const container = document.querySelector(`[tabMng-id="${this.dJSUtiIDFromSelector(this.selector)}"]`);
        if (!container) {
            console.error(`❌ [%cTabManager%c] Tab container not found: %c${this.selector}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ tab-title 요소 생성
        const tabTitle = document.createElement("div");
        tabTitle.className = "tab-title";
        tabTitle.setAttribute("role", "tab");
        tabTitle.setAttribute("data-tab-id", tab_id);
    
        // ✅ 아이콘 추가 (있을 경우)
        if (icon) {
            const tabIcon = document.createElement("span");
            tabIcon.style.marginRight = "5px";
    
            if (typeof icon === "string") {
                tabIcon.innerHTML = icon; // ✅ 문자열이면 그대로 사용
            } else if (typeof icon === "function") {
                try {
                    tabIcon.innerHTML = icon(tab_id); // ✅ 함수 실행 후 반환값을 innerHTML에 삽입
                } catch (error) {
                    console.error(`❌ [%cTabManager%c] Icon function error: %c${error.message}`, 
                        "color: #673AB7; font-weight: bold;", "", 
                        "color: #FF0000; font-weight: bold;"
                    );
                    tabIcon.innerHTML = "❓"; // 기본 아이콘 설정 (에러 발생 시)
                }
            }
            tabTitle.appendChild(tabIcon);
        }
    
        // ✅ 탭 라벨 추가
        const tabLabel = document.createElement("span");
        tabLabel.innerText = tab_title;
        tabTitle.appendChild(tabLabel);
    
        // ✅ 닫기 버튼 추가

        if(isRemovable){
            const closeButton = document.createElement("button");
            closeButton.innerText = "✖";
            closeButton.addEventListener("click", (event) => {
                event.stopPropagation(); // 탭 활성화 방지
                this.removeTab(tab_id);
            });
            tabTitle.appendChild(closeButton);
        }
    
        // ✅ tab-content 요소 생성
        const tabContent = document.createElement("div");
        tabContent.className = "tab-content";
        tabContent.setAttribute("role", "tabpanel");
        tabContent.setAttribute("data-tab-id", tab_id);
        tabContent.innerHTML = tab_content;
    
        // ✅ 탭 클릭 이벤트 추가 (탭 활성화)
        tabTitle.addEventListener("click", () => {
            this.emit("tabClicked", tabObj);
            this.setActiveTab(tab_id)
        });
    
        // ✅ container에 추가
        container.querySelector(".tab-area").appendChild(tabTitle);
        container.querySelector(".cont-area").appendChild(tabContent);
    
        // ✅ 첫 번째 탭 활성화
        if (this.state.tabs.length === 1) {
            this.setActiveTab(tab_id);
        }
    
        if (emitEvent) {
            this.emit("tabAdded", tabObj);
        }
    
    }
    
    async removeTab(tabId) {
        const tab = this.state.tabs.find(tab => tab.tab_id === tabId);
        if (!tab) {
            console.error(`❌ [%cTabManager%c] Invalid tabId: %c${tabId} (Tab not found)`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ `beforeTabRemove` 이벤트 실행 → 결과가 false이면 탭 삭제 차단
        const canProceed = await this.emit("beforeTabRemove", tab);
        if (!canProceed) {
            console.warn(`🚫 [%cTabManager%c] Tab removal blocked: %c${tabId}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF9800; font-weight: bold;"
            );
            return;
        }
    
        // ✅ 탭 삭제
        this.state.tabs = this.state.tabs.filter(tab => tab.tab_id !== tabId);
    
        // ✅ container 찾기 (tabMng-id 기준)
        const container = document.querySelector(`[tabMng-id="${this.dJSUtiIDFromSelector(this.selector)}"]`);
        if (!container) {
            console.error(`❌ [%cTabManager%c] Tab container not found: %c${this.selector}`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ 탭 제거
        const tabTitle = container.querySelector(`[data-tab-id="${tabId}"]`);
        const tabContent = container.querySelector(`.tab-content[data-tab-id="${tabId}"]`);
    
        if (tabTitle) {
            tabTitle.remove();
        }
    
        if (tabContent) {
            tabContent.remove();
        }
    
        // ✅ 활성 탭이 삭제된 경우
        if (this.state.activeTab === tabId) {
            const newActiveTab = this.state.tabs[0];
            if (newActiveTab) {
                this.setActiveTab(newActiveTab.tab_id);
            }
        }
    
        this.emit("tabRemoved", tab);
    }
    





    // ✅ 상태 업데이트 메서드
    async setActiveTab(tabId) {
        const prevActiveTabId = this.state.activeTab;
    
        // ✅ 현재 활성 탭 객체 찾기
        const prevTab = this.state.tabs.find(tab => tab.tab_id === prevActiveTabId) || null;
        const newTab = this.state.tabs.find(tab => tab.tab_id === tabId);
    
        if (!newTab) {
            console.error(`❌ [%cTabManager%c] Invalid tabId: %c${tabId} (Tab not found)`, 
                "color: #673AB7; font-weight: bold;", "", 
                "color: #FF0000; font-weight: bold;"
            );
            return;
        }
    
        // ✅ 현재 활성 탭을 비활성화하기 전에 검사
        if (prevTab && prevActiveTabId !== tabId) {
            const canDeactivate = await this.emit("beforeTabDeactivate", { prevTab, newTab });
            if (canDeactivate === false) {
                return; // ❌ 비활성화 차단
            }
        }
    
        // ✅ 새로운 탭 활성화 검사
        const canActivate = await this.emit("beforeTabActivate", { prevTab, newTab });
        if (canActivate === false) {
            return; // ❌ 활성화 차단
        }
    
        // ✅ 기존 탭 비활성화
        if (prevTab && prevActiveTabId !== tabId) {
            this.emit("tabDeactivated", { prevTab, newTab });
    
            // ✅ 이전 탭에서 `tab-activated` 클래스 제거
            const container = document.querySelector(`[tabMng-id="${this.dJSUtiIDFromSelector(this.selector)}"]`);
            const prevTabTitle = container.querySelector(`[data-tab-id="${prevTab.tab_id}"]`);
            const prevTabContent = container.querySelector(`.tab-content[data-tab-id="${prevTab.tab_id}"]`);

            
            if (prevTabTitle) {
                prevTabTitle.classList.remove("tab-activated");
            }
            
            if (prevTabContent) {
                prevTabContent.classList.remove("tab-activated");
            }
        }
    
        // ✅ 새로운 활성 탭 설정
        this.state.activeTab = tabId;
    
        // ✅ 새로운 탭 활성화 이벤트 실행
        this.emit("tabActivated", { prevTab, newTab });
    
        // ✅ 새로운 탭에 `tab-activated` 클래스 추가
        const container = document.querySelector(`[tabMng-id="${this.dJSUtiIDFromSelector(this.selector)}"]`);
        // `tab-title`과 `tab-content`를 같은 부모 아래에서 찾기
        const newTabTitle = container.querySelector(`[data-tab-id="${newTab.tab_id}"]`);
        const newTabContent = container.querySelector(`.tab-content[data-tab-id="${newTab.tab_id}"]`);

        
        if (newTabTitle) {
            newTabTitle.classList.add("tab-activated");
        }
        
        if (newTabContent) {
            newTabContent.classList.add("tab-activated");
        }
    }
    
    
    
    
    

    getState() {
        return this.state;
    }
   
    
}

export default TabManager;
