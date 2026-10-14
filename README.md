# 남상엽 — Backend Resume

포트폴리오(`leaf-nam/portfolio`)와 동일한 디자인 토큰으로 만든 정적 이력서 페이지입니다. 빌드 없이 `index.html`만으로 동작합니다.

## 로컬 확인

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## PDF 내보내기

1. 우상단 `PDF로 내보내기` 클릭
2. Chrome 인쇄 설정:
   - 대상: PDF로 저장
   - 용지: A4, 여백: 없음 (외곽 여백은 페이지 자체에 포함됨)
   - 배경 그래픽: ON
   - 머리글/바닥글: OFF

## 배포

- `main`에 push하면 GitHub Actions가 GitHub Pages로 자동 배포
- 원본 내용: `이력서(백엔드) - Google Docs.pdf`
- 포트폴리오: https://github.com/leaf-nam/portfolio
