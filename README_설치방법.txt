BIO CHALLENGE 온라인 연결 가이드

1. https://console.firebase.google.com 에서 새 프로젝트를 만듭니다.
2. 프로젝트 설정 > 내 앱 > 웹 앱 추가 (</>) > 앱 등록 > firebaseConfig 값을 복사합니다.
3. firebase-config.js의 PASTE_... 부분을 실제 설정값으로 바꿉니다.
4. Firebase Authentication > Sign-in method에서 Anonymous와 Google 로그인 제공업체를 활성화합니다.
5. Firestore Database를 생성합니다. 처음부터 '프로덕션 모드'로 생성하세요.
6. Authentication > Settings > Authorized domains에 GitHub Pages 도메인(사용자명.github.io)을 등록합니다.
7. GitHub에서 PUBLIC 저장소 biochallenge-online을 생성하고 index.html, admin.html, cloud.js, firebase-config.js, questions.json 파일을 루트에 올립니다.
8. GitHub 저장소 Settings > Pages > Deploy from a branch > main > /(root) > Save.
9. https://사용자명.github.io/biochallenge-online/ 에 접속합니다.
10. 관리자 페이지 https://사용자명.github.io/biochallenge-online/admin.html 에서 Google 로그인을 합니다.
11. 관리자 페이지에 보이는 관리자 UID를 복사해 firestore.rules의 REPLACE_WITH_ADMIN_UID를 바꿉니다.
12. Firebase Console > Firestore Database > Rules에 firestore.rules의 내용을 붙여넣고 Publish합니다.
13. 학생 휴대전화 2대로 각각 접속해 문제를 풀고 공동 리더보드를 확인합니다.
14. 사이트 주소를 QR 생성 도구에 넣어 QR 코드를 제작합니다.

중요:
- Firebase 프로젝트 설정값은 웹 클라이언트에 공개되는 식별 정보입니다. 서비스 계정 비밀키는 절대 업로드하지 마세요.
- 관리자 UID는 Google 로그인 후 확인합니다. 관리자만 응시 원본을 읽도록 보안 규칙을 설정했습니다.
- 로그인 전 Rules가 배포되지 않았다면 관리자 페이지 조회는 실패할 수 있습니다. UID 확인 후 Rules를 게시하면 됩니다.
- 같은 브라우저의 익명 사용자 ID 기준으로 최고기록이 갱신됩니다. 기기/브라우저 변경 시 새 참가자로 처리됩니다.
- 점수는 브라우저에서 계산합니다. 개발자 도구로 조작할 수 있으므로 공식 대회용이면 서버 검증이 추가로 필요합니다.
- 현재 문제는 20개이며 문제 순서가 랜덤입니다. 선택지 위치도 랜덤입니다.
- 오답 통계는 모든 응시를 누적하며, 관리자 페이지에서 CSV로 내려받을 수 있습니다.
- 무료 할당량과 요금 정책을 확인하고 예산 알림을 설정하세요.

[업데이트] 고2 1학기 수준 20문제로 교체. 기존 온라인 연결 및 관리자 페이지 유지. firebase-config.js의 설정값을 실제 Firebase 프로젝트 값으로 교체해야 온라인 기능이 작동합니다. 기존 문제의 오답 기록과 신규 문제 기록을 합쳐 분석하지 마세요.
