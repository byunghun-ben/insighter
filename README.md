# 실행 방법

### 라이브러리 설치

```bash
npm install
```

### json-server 실행 (Mock API)

```bash
npm run server
```

접근 주소: http://localhost:5001

### 프로젝트 실행

```bash
npm run dev
```

접속 주소: http://localhost:5173

# 과제 작업 내용

### 설치 라이브러리

- tailwindcss

  - 스타일링

- headlessui

  - UI 라이브러리(모달 컴포넌트)

- json-server

  - Mock API

- react-router-dom (리액트 라우터)

  - 페이지 기준 라우팅

- react-hook-form

  - 폼 관리

- zod

  - 유효성 검사

- hookform/resolvers

  - zod 라이브러리와 react-hook-form을 연결

### 프로젝트 구조

```
  /src
    /apis     (Mock API)
    /app      (페이지 단위 컴포넌트)
    /assets
    /schemas  (zod 스키마)
    /types    (zod 스키마 기반 타입)
    index.css
    main.tsx
```

### 라우트 구조

페이지 별 공통적으로 사용할 수 있는 구조(nav)를 정의하기 위해 RootLayout을 사용했습니다.

```ts
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/create",
        element: <EventCreatePage />,
      },
      {
        path: "/edit/:id",
        element: <EventEditPage />,
      },
    ],
  },
]);
```

## 페이지별 설명

### Root (이벤트 목록)

- 이벤트 이름과 일정을 기준으로 목록을 필터링할 수 있습니다.

  - 필터링으로 인해 결과가 없는 경우, 필터를 초기화할 수 있습니다.

- 이벤트 일정을 기준으로 목록을 정렬할 수 있습니다.

- 이벤트 아이템의 **수정** 버튼을 통해, 해당 이벤트 수정 페이지로 이동합니다.

- 이벤트 아이템의 **삭제** 버튼을 통해, 삭제 확인 모달을 활성화 합니다.

- 하단의 **더보기** 버튼을 통해, 추가 이벤트를 가져올 수 있습니다.

### Create (이벤트 생성)

- 이벤트를 생성할 수 있습니다.

- zod를 통해 각 필드 별, 유효성 검사를 진행합니다.

- 저장이 완료된 후, 홈으로 이동합니다.

### Edit (이벤트 수정)

- 이벤트를 수정할 수 있습니다.

- 저장이 완료된 후, 홈으로 이동합니다.

## 상태 관리 방식

로컬 상태 관리 대상으로는 이벤트 목록 / 이벤트 필터이며, Context를 통해 진행했습니다.

- EventContext
- EventFilterContext
