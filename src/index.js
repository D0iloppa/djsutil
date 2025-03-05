import DJSUtil from "./core/core";

// ✅ 전역에서 바로 사용할 수 있도록 설정
if (typeof window !== "undefined") {
    window.DJSUtil = DJSUtil;
}

// ✅ 모듈에서도 싱글턴 인스턴스 내보내기
export default DJSUtil;