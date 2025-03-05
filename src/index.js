import Core from "./core/index";

const DjsUtil = new Core();

// 브라우저 환경에서 전역 객체로 등록
if (typeof window !== "undefined") {
    window.DjsUtil = DjsUtil;
}

// 모듈 내보내기
export default DjsUtil;
