# 던지미

<br/>

## 프로젝트 소개

주변 사람들과 지난 한 해의 자신에 대한 퀴즈와 덕담을 주고 받는 서비스

<br/>

## 주요 기능

- 출제자는 로그인 후, 공유할 퀴즈와 덕담을 담은 복주머니를 만들 수 있습니다.
- 출제자는 복주머니를 만들 때, 퀴즈만 또는 퀴즈+덕담 둘 중 하나의 옵션을 선택할 수 있습니다.
- 문제와 덕담을 입력하면 복주머니가 생성되고, 이를 카카오톡 또는 링크 복사를 통해 공유할 수 있습니다.
- 각 복주머니를 누르면 그 복주머니를 공유받은 사람들이 어떤 답변을 했는지 볼 수 있습니다.
- 복주머니를 공유받은 응답자는 퀴즈를 풀고 덕담을 볼 수 있습니다.
- 응답자는 자신의 결과를 카카오톡 또는 링크 복사를 통해 출제자에게 공유할 수 있습니다.

<br/>

## 링크

[배포 링크](https://fortunetoss.vercel.app/)

<br/>

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Zustand
- axios

<br/>

## 설치 및 실행 방법

1. **레포지토리 클론**

   ```bash
   git clone https://github.com/fortunetoss/Front.git
   ```

2. **의존성 설치**

   ```bash
   npm install
   ```

3. **환경 변수 설정**

   `.env.local` 파일을 생성하고 다음을 추가합니다:

   ```
   NEXT_PUBLIC_URL = 클라이언트 주소
   NEXT_PUBLIC_SERVER_URL = 서버 주소
   NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY = 카카오 API JavaScript 키
   ```

4. **개발 서버 실행**

   ```bash
   npm run dev
   ```
