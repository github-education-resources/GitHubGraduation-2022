# GitHub 졸업식-2022

### Available Translations 🗣

*Read the instructions in your language or contribute a translation!*

[Additional Translations](translations/README.md)

![2022-github-graduation-social-card-1](/assets/GHG_Blog_1.jpg)


이 리포지토리에는 *GitHub Graduation 2022*  졸업 앨범이 있습니다. 이 리포지토리에 풀 리퀘스트를 하므로써 여러분은 2022년 GitHub 클래스에 등록을 요청할 수 있습니다. 

5월 27일까지 본 리포지토리에 성공적으로 병합된  처음 7,500개의 풀 리퀘스트는 맞춤형 트레이딩 카드, 스티커 및 편지를 우편으로 받게 됩니다.


## 개인정보에 관한 알림 👀
이 리포지토리에 추가된 모든 정보는 공개적으로 사용할 수 있습니다.

- 만약 여러분의 전체 이름을 공개하는 것이 불편하다면 짧은 이름 또는 별명을 사용할 수 있습니다.

# 신청 대상자 📝
저희는 2022년에 졸업했거나 졸업할 예정인 모든 학생 여러분들을 2022년 졸업 앨범에 등록할 수 있도록 초대 합니다. 부트캠프, 코드 캠프, 고등학교 졸업생, 석사 졸업생, 박사 졸업생도 등록 할 수 있습니다.

자격 기준은 다음과 같습니다.
1. GitHub 학생 개발자 팩을 통해 학생임을 인증해야 합니다. 아직 가입을 하시지 않으셨다면 [여기](https://education.github.com/discount_requests/student_application?utm_source=2022-06-11-GitHubGraduation)에서 신청하세요. 
2. 과거 GitHub 졸업식에 참여한 적이 없어야 합니다.
3. 2022년에 졸업한 것을 확인되어야 합니다. 

# 2022년 클래스에 참여하는 방법
졸업식에 참여하고 맞춤형 트레이딩 카드와 스티커를 우편으로 받는 방법은 다음과 같습니다.
1. [**배송 신청서**에 정보를 입력해 주세요.](https://airtable.com/shrVMo8ItH4wjsO9f)
 ⚠️ 제출된 정보는 졸업 트레이딩 카드 발송에만 사용 됩니다. 풀 리퀘스트를 생성하기 전에 배송 신청서를 제출해야 하며 신청서를 제출하였다고 하여 이벤트 참여를 보장하지 않습니다. 여러분의 PR 이 성공적으로 병합되어야 하며 처음 7,500개의 병합된 PR 만이 우편으로 받을 수 있습니다.
2. 여러분의 프로필 정보를 졸업 앨범에 등록하고 졸업식에 빛내기 위해 **풀 리퀘스트를 해주세요**  
 
## 1. 배송 신청서를 작성하기
멋진 [배송 신청서](https://airtable.com/shrVMo8ItH4wjsO9f)에 제출한 정보는 졸업 기념 트레이딩 카드 발송에만 사용됩니다. 신청서를 제출한다고 하여 우편으로 받을 수 있다는 보장은 업습니다. GitHub 졸업 앨범에 병합된 7,500명의 졸업생만 배송을 받게 됩니다.

## 2. 여러분이 스스로 졸업 앨범에 추가하기 🏫
이 가이드에 따라 <YOUR-USERNAME>를 여러분의 GitHub 사용자 이름으로 바꿔주세요. 대소문자를 구별하여 적어주셔야 합니다. 예를 들어 사용자 이름이 `MonaTheOctocat` 라고 했을 때 `monatheoctocat` 또는 `monaTheoctocat` 와 같이 다르게 적었다면 풀 리퀘스트를 제출했을 때 오류가 발생합니다. 폴더 이름과 파일 이름 모두 여러분의 사용자 이름이 대소문자까지 정확하게 맞도록 적어주셔야 합니다.

### 첫번째, _data/YOUR-USERNAME/ 폴더를 만들기
이 리포지토리를 포크하여, `_data` 폴더 안에 새 폴더를 만들고 여러분의 사용자 이름으로  바꿉니다. 아래 예시와 같이 `_data/<사용자-이름>/` 형태여야 합니다.
```
_data/MonaTheOctocat/
``` 

### 두번째, 여러분의 프로필 정보를 추가하기
아래 예시처럼 `<사용자-이름>.md` 형태로 방금 전 생성한 폴더에 마크다운 파일을 만듭니다.

```
_data/MonaTheOctocat/MonaTheOctocat.md
```

아래 템플릿을 복사하여 여러분의 마크다운 파일에 붙여 넣고 보일러 플레이트의 정보를 지우고 여러분의 정보를 채웁니다.

```
---
name: 전체이름-또는-닉네임 # 영문으로 작성, 28자를 초과할  수 없습니다.
institution: 기관-이름 🚩 # 영문으로 작성, 58자를 초과할 수 없습니다.
quote: 여러분의-선배의-한마디 # 영문으로 작성, 100글자를 초과할 수 있습니다. 형식이 동일하게 유지 될 수 있도록 인용부호(") 사용을 피해주세요. 
github_user: 여러분의-GitHub-사용자이름
---
```

_특수문자를 사용하지 마십시오.


### 세번째, 풀 리퀘스트를 통해 제출하기
여러분의 제출물이 유효한지 확인하려면 풀 리퀘스트 템플릿의 체크리스트를 살펴보세요. GitHub Education 팀은 여러분의 신청서를 검토하고 양식에 맞다면 여러분의 풀리퀘스트를 병합합니다. 만약 그렇지 않다면 풀 리퀘스트의 댓글로 관련 알림을 받게 됩니다.

풀 리퀘스트를 제출하는데 문제가 있다면 [GitHub 커뮤니티](https://github.com/orgs/github-community/discussions/categories/github-education)에 도움을 요청할 수 있습니다!

# 2022 졸업 이야기 ‍👩‍🏫👨‍🏫 (선택 사항)
GitHub 졸업식에 보다 더 적극적으로 참여하고 소셜 네트워크에 등장할 방법을  찾고 계신가요?

저희는 여러분들이 학기동안 달성한 놀라운 일들과 GitHub가 여러분의 목표를 달성할 수 있도록 어떻게 도움이 되었는지 듣고 싶습니다. 잠시 시간을 내어 비디오나 메시지를 만들고 작성하여 저희와 여러분의 선생님, 친구들과 함께 공유해주세요.

[참여 방법](https://drive.google.com/file/d/1AcgUKLXx6WIC5s4eanzOfj8EsiYHARrt/view?usp=sharing)

여러분의 의견을 기다리고 있겠습니다. 커뮤니티의 일원이 되어주셔서 감사드립니다.
💖 잊지마세요: 5월 30일까지 여러분의 이야기를 보내주셔야 합니다!


# 주의사항 🛍
성공적으로 병합된 7,500개의 PR 은 GitHub 상태가 포함된 맞춤형 홀로그램 개발자 트레이딩 카드를 우편으로 받게 됩니다.

즉, 공개된 GitHub 프로필 정보를 사용하여 트레이딩 카드를 만듭니다. 트레이딩 카드가 여러분을 잘 반영할 있도록 하려면 GitHub 프로필 사진과 정보의 상태와 카드에 어떤 내용이 표시될지 확인하세요. 

# 졸업식 날 🎓
생방송 시청을 잊지 마세요!

- 📆 2022년 6월 11일
- ⏰ 오전 9:00 PT | 16:00 GMT | 21:30 IST | 2022년 06월 12일 오전 1:00 KST 
- 📍 [GitHub Education 트위치 채널](https://twitch.tv/githubeducation)의 알림을 설정하세요.
- 📎여러분의 캘린더에 이벤트를 추가할 수 있습니다.:
  - [Google Calendar](https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20220611T160000Z%2F20220611T180000Z&details=&location=https%3A%2F%2Fwww.twitch.tv%2Fgithubeducation&text=%F0%9F%8E%89%F0%9F%8E%8A%20GitHub%20Graduation%202022%20%F0%9F%8E%89%F0%9F%8E%8A)
  - [Outlook Calendar](https://outlook.live.com/calendar/0/deeplink/compose?allday=false&body=&enddt=2022-06-11T18%3A00%3A00%2B00%3A00&location=https%3A%2F%2Fwww.twitch.tv%2Fgithubeducation&path=%2Fcalendar%2Faction%2Fcompose&rru=addevent&startdt=2022-06-11T16%3A00%3A00%2B00%3A00&subject=%F0%9F%8E%89%F0%9F%8E%8A%20GitHub%20Graduation%202022%20%F0%9F%8E%89%F0%9F%8E%8A)
  - [Yahoo Calendar](https://calendar.yahoo.com/?desc=&dur=&et=20220611T180000Z&in_loc=https%3A%2F%2Fwww.twitch.tv%2Fgithubeducation&st=20220611T160000Z&title=%F0%9F%8E%89%F0%9F%8E%8A%20GitHub%20Graduation%202022%20%F0%9F%8E%89%F0%9F%8E%8A&v=60)
