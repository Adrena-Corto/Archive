import type { Translations } from './en';

/**
 * Chinese (Simplified) translations
 */
export const zhCN: Translations = {
  // Navigation
  nav: {
    artifacts: '文物',
    coins: '古币',
    timeline: '时间线',
    library: '图书馆',
    about: '关于',
    search: '搜索',
    articles: '文章',
    books: '书籍',
  },
  
  // Common UI
  common: {
    close: '关闭',
    open: '打开',
    back: '返回',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    submit: '提交',
    cancel: '取消',
    readMore: '阅读更多',
    viewDetails: '查看详情',
    skipToContent: '跳转到内容',
    toggleMenu: '切换导航菜单',
    scrollToTop: '返回顶部',
  },
  
  // Non-English accuracy notice
  accuracyNotice: {
    title: '翻译声明',
    message: '本文章为自动翻译。发现不准确之处？',
    reportIssue: '报告问题',
  },
  
  // Report page
  report: {
    title: '报告问题',
    subtitle: '帮助我们改进内容',
    description: '发现翻译错误？请告诉我们，我们会进行审核。',
    urlLabel: '页面网址',
    urlPlaceholder: 'https://theantiquearchive.com/...',
    localeLabel: '语言',
    issueLabel: '问题类型',
    issuePlaceholder: '选择问题类型',
    issueTypes: {
      translation: '翻译错误',
      formatting: '格式问题',
      missing: '内容缺失',
      other: '其他',
    },
    detailsLabel: '详细说明',
    detailsPlaceholder: '请详细描述问题...',
    submitButton: '发送报告',
    submitVia: '或通过邮件发送：',
    emailSubject: '翻译问题报告',
    successMessage: '感谢您的反馈！报告已提交。',
    required: '必填',
    optional: '选填',
  },
  
  // Footer
  footer: {
    stayUpdated: '保持更新',
    getNotified: '获取新文章和藏品更新的通知。',
    support: '支持',
    personalCollection: '个人收藏展示',
    location: '香港',
  },
  
  // Meta
  meta: {
    siteName: 'The Antique Archive',
    siteDescription: '精心策划的古币、美索不达米亚滚筒印章、拜占庭珠宝和跨越5000年的稀有文物收藏。',
    articleListDescription: '关于古币、滚筒印章和古董收藏的散文与指南。',
  },
  
  // Articles
  articles: {
    title: '文章',
    subtitle: '知识库',
    description: '关于收藏和鉴定的散文、指南和笔记。',
    noArticles: '暂无已发布的文章',
    readTime: '分钟阅读',
    publishedOn: '发布于',
    updatedOn: '更新于',
    backToArticles: '返回文章列表',
    tags: '标签',
    filterByTag: '按标签筛选',
    clearFilter: '清除筛选',
    allArticles: '全部',
  },
  
  // Structured data
  structuredData: {
    websiteName: 'The Antique Archive',
    organizationName: 'The Antique Archive',
    collectionName: '档案馆',
  },
};
