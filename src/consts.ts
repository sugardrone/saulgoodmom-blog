export const SITE = {
  title: 'SaulGoodMom',
  tagline: '在代码与文字之间，记录思考。',
  description: 'SaulGoodMom 的个人博客 —— 记录工程实践、开源观察与日常思考。',
  author: 'SaulGoodMom',
  github: 'sugardrone',
  githubUrl: 'https://github.com/sugardrone',
  email: 'hello@example.com',
  url: 'https://suncar.live',
} as const;

export const NAV = [
  { href: '/', label: '首页' },
  { href: '/blog', label: '文章' },
  { href: '/projects', label: '项目' },
  { href: '/about', label: '关于' },
] as const;

export const GISCUS = {
  repo: 'sugardrone/saulgoodmom-blog',
  repoId: '',
  category: 'Announcements',
  categoryId: '',
  mapping: 'pathname',
  reactionsEnabled: '1',
  inputPosition: 'top',
  lang: 'zh-CN',
} as const;
