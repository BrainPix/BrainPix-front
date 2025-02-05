---
name: "✨FEATURE"
about: Feature 작업 사항을 입력해주세요.
title: ''
labels: chore, feature
assignees: ''

---

name: "✨ FEATURE"
description: "Feature 작업 사항을 입력해주세요."
title: "✨ FEATURE: "
labels: ["feature"]
body:
  - type: markdown
    attributes:
      value: "Feature 작업 사항을 입력해주세요."
      
  - type: input
    id: related-issues
    attributes:
      label: "#️⃣ 연관된 이슈"
      description: "ex) #이슈번호, #이슈번호"
      placeholder: "#1, #2"
    
  - type: textarea
    id: work-description
    attributes:
      label: "📝 작업 내용"
      description: "이번 PR에서 작업한 내용을 간략히 설명해주세요(이미지 첨부 가능)"
      placeholder: "작업 내용을 설명해주세요"
    validations:
      required: true
      
  - type: textarea
    id: screenshots
    attributes:
      label: "스크린샷 (선택)"
      description: "필요한 경우 스크린샷을 첨부해주세요"
      
  - type: textarea
    id: review-requirements
    attributes:
      label: "💬 리뷰 요구사항 (선택)"
      description: "리뷰어가 특별히 봐주었으면 하는 부분이 있다면 작성해주세요"
      placeholder: "ex) 메서드 XXX의 이름을 더 잘 짓고 싶은데 혹시 좋은 명칭이 있을까요?"
