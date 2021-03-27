# Online Hospital Project for IFN711

## 开发
This monorepo was built using TypeScript, Node.js and React.
前后端均在这一个 monorepo 里面
### 好处
* 方便本地开发调试
* 方便维护
* 前后端可以共用模型
* 开发效率高
* 方便打包发布
### 本地开发前  
* 先 `yarn install` 安装相应依赖包
* packages/hospital-backend/database/online-hospital.sql 存放 mysql 表信息。运行程序前需先导入
* 然后参考 /packages/hospital-backend/configs/environments/development.ts 结合本机环境作个性化配置
`yarn run app` 启动本地开发环境
或者
```
yarn workspace xxx run start
```
## 架构

* yarn (千万不要使用 npm!)
* typescript
* eslint + prettier
  
### 前端
* react（使用 functional components）
* antd
  
### 后端
* koa
* typeorm
* mysql
### common
 `packages/common` 存放前后端通用模型配置等

## 一些实现细节(待补充)
### 配置
/packages/hospital-backend/configs/environments/

通过 development 和 production 区分生产环境和测试环境
### 用户认证
JWT
[一文讲解JWT用户认证全流程](https://zhuanlan.zhihu.com/p/158186278?from_voters_page=true)

### 音视频
[Agora Web API Reference](https://docs.agora.io/cn/faq/API%20Reference/web/index.html)

### 实时聊天
[Websocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

### 部署发布
CICD： Docker + Github Actions

## git
* 在 merge master 前，先 squash 你的分支，并且 rebase master, 让我们的 master commits 是一条清爽的直线，又便于管理
* 发起 Pull Request 前，请保证本次变更所有的 commits 都位于最新的 master 前方
* 请使用英文, 不要使用 `update` 这种 commit 消息
* commit 规范: 基本格式是 `xxx: message`, 举个例子：
    * `feat: add xxx function`
    * `fix: fix xxx problem`
* 参考 [《Contributing to Angular - Commit Message Guidelines》](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

## Plan（初步）

| 分类 | 功能 | 工作量 | 计划启动时间 | 预计完成时间 | 实际完成时间 | 优先级 | 已完成
| :-- | :-- | :--: | :--: | :--: | :--: | :--: | :--: |
| **前端** | 页面框架搭建 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 用户登陆页 | 3d | xxxx | xxxx | xxxx | High | No |
| **后端** | 用户登录功能 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 首页 | 5d | xxxx | xxxx | xxxx | High | No |
| **前端** | 医生认证页 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 医生信息页 | 3d | xxxx | xxxx | xxxx | High | No |
| **后端** | 医生认证 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 用户信息页 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 用户搜索预约医生 | 5d | xxxx | xxxx | xxxx | High | No |
| **后端** | 预约医生功能 | 5d | xxxx | xxxx | xxxx | High | No |
| **前端** | 音视频聊天页 | 5d | xxxx | xxxx | xxxx | High | No |
| **后端** | 音视频聊天 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 医生开具电子处方页 | 5d | xxxx | xxxx | xxxx | High | No |
| **后端** | 电子处方（保存，邮件发送） | 5d | xxxx | xxxx | xxxx | High | No |
| **前端** | 用户展示所有电子处方页 | 5d | xxxx | xxxx | xxxx | High | No |
| **部署发布** | 发布到线上服务器 | 3d | xxxx | xxxx | xxxx | High | No |
| **前端** | 医生评价页面 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **后端** | 医生评价 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **前端** | 在线会话 | 5d | xxxx | xxxx | xxxx | Mid | No |
| **后端** | 在线会话 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **前端** | 送药服务 | 10d | xxxx | xxxx | xxxx | Low | No |
| **前端** | 医疗信息科普 | 5d | xxxx | xxxx | xxxx | Low | No |

