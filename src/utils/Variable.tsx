export const EMAIL = process.env.REACT_APP_EMAIL;
export const HOST = process.env.REACT_APP_HOST;
export const PORT = process.env.REACT_APP_PORT;
export const ADMIN_NAME = process.env.REACT_APP_ADMIN_NAME;
export const ADMIN_PASSWORD = process.env.REACT_APP_ADMIN_PASSWORD;
export const ADMIN_PAGE =  process.env.REACT_APP_ADMIN_PAGE; 
export const ADMIN_AUTH:string = process.env.REACT_APP_ADMIN_AUTH as string;
export const REST_API_KEY =  process.env.REACT_APP_REST_API_KEY; 
export const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

interface Project {
    title: string,
    description: string,
    descriptionDetail?: string,
    link: string,
    secondLink?: string; // secondLink를 선택적 속성으로 설정
    picture: string[]
}

export const CategoryList: string[] = ['전체', 'React', 'Vue', 'NodeJS', 'Backend', 'Game', 'Theory', 'Etc'];

export const ProjectList: Project[] = [
    {
      title: "Lecture Review",
      description: "학부생 기간 동안 배웠던 내용들을 기록한 저장소 입니다. 다양한 분야에서 학습했던 과제, cs 공부 등을 담고 있습니다.",
      link: "https://github.com/hesuhesu/Lecture-Review",
      picture: ["Lecture_Review.webp", "Lecture_Review2.webp"],
    },
    {
      title: "My Diary",
      description: "나의 일기 앱을 Kotlin 을 사용하여 만든 toy 프로젝트 입니다.",
      link: "https://github.com/hesuhesu/MyDiary",
      picture: ["MyDiary.webp", "MyDiary2.webp", "MyDiary3.webp", "MyDiary4.webp", "MyDiary5.webp"],
    },
    {
      title: "완성도 높은 WYSIWYG Editor 구축",
      description: "Javascript-Based 문서 편집 기능인 Quill Editor 와 ThreeJS 를 활용한 GLTF Editor 를 결합한 졸업 과제 프로젝트입니다.",
      link: "https://github.com/hesuhesu/SW_Project",
      picture: ["WYSIWYG_Editor.webp", "WYSIWYG_Editor2.webp"],
    },
    {
      title: "GLTF 3D Editor",
      description: "3D Editor 기능을 보강하여 코드 리팩토링과 기능 통합을 진행한 토이 프로젝트 입니다.",
      link: "https://github.com/hesuhesu/gltfeditor",
      picture: ["3D_Editor.webp", "3D_Editor2.webp"],
    },
    {
      title: "Portfolio",
      description: "포트폴리오 겸 개발 일기를 제작하였습니다. 개발 했던 일기를 바탕으로 고민했던 부분들을 다시 볼 수 있습니다.",
      link: "https://github.com/hesuhesu/ReactUITester",
      secondLink: "https://hesuhesu.o-r.kr",
      picture: ["MyBlog.webp", "MyBlog2.webp"],
    },
]