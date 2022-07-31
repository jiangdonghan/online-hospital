# Online Hospital Project for IFN711

## Demo

## Login Page
![](./static/login.png)

## Index page
![](./static/demo-index.png)
![](./static/demo-index2.png)
![](./static/demo-index3.png)
## Meeting page
![](./static/meeting.png)

## Appointment page
![](./static/appointment.png)

# Build Setup

## Development
This monorepo was built using TypeScript, Node.js and React.
All backend and frontend in the same monorepo

### Benefits
* easy to development
* easy to maintain
* backend and frontend shares same models
* easy to deploy

### Before Development  
* run `yarn install` 
* packages/hospital-backend/database/online-hospital.sql saves mysql table info
* reference /packages/hospital-backend/configs/environments/development.ts as development config
`yarn run app` start both frontend and backend

or
 
```
yarn workspace xxx run start
```
## Architecture

* yarn (no npm!)
* typescript
* eslint + prettier
  
### frontend
* react（use functional components）
* antd
  
### backend(typestack)
* koa
* typeorm
* mysql
### common
 `packages/common` save common typescript models

## technical details
### config
/packages/hospital-backend/configs/environments/

use development and production environments
### user authentication
JWT
[JWT](https://zhuanlan.zhihu.com/p/158186278?from_voters_page=true)

### video and audio communication
[Agora Web API Reference](https://docs.agora.io/cn/faq/API%20Reference/web/index.html)

### live chat
[Websocket](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)

### deploy
CICD： Docker + Github Actions

## git
* before merge master，squash your branch first，then rebase master, let our master commits be a straight line
* before start pull request 前，make sure all commits are head of master
* please use english for commit logs
* commit rules: eg `xxx: message`
    * `feat: add xxx function`
    * `fix: fix xxx problem`
* reference [《Contributing to Angular - Commit Message Guidelines》](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#-commit-message-guidelines)

## Plan

| Category | Function | Workload | Start Date | Expected End Date | End Date  | Priority | Done
| :-- | :-- | :--: | :--: | :--: | :--: | :--: | :--: |
| **frontend** | 页面框架搭建 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 用户登陆页 | 3d | xxxx | xxxx | xxxx | High | No |
| **backend** | 用户登录功能 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 首页 | 5d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 医生认证页 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 医生信息页 | 3d | xxxx | xxxx | xxxx | High | No |
| **backend** | 医生认证 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 用户信息页 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 用户搜索预约医生 | 5d | xxxx | xxxx | xxxx | High | No |
| **backend** | 预约医生功能 | 5d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 音视频聊天页 | 5d | xxxx | xxxx | xxxx | High | No |
| **backend** | 音视频聊天 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 医生开具电子处方页 | 5d | xxxx | xxxx | xxxx | High | No |
| **backend** | 电子处方（保存，邮件发送） | 5d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 用户展示所有电子处方页 | 5d | xxxx | xxxx | xxxx | High | No |
| **deploy** | 发布到线上服务器 | 3d | xxxx | xxxx | xxxx | High | No |
| **frontend** | 医生评价页面 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **backend** | 医生评价 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **frontend** | 在线会话 | 5d | xxxx | xxxx | xxxx | Mid | No |
| **backend** | 在线会话 | 3d | xxxx | xxxx | xxxx | Mid | No |
| **frontend** | 送药服务 | 10d | xxxx | xxxx | xxxx | Low | No |
| **frontend** | 医疗信息科普 | 5d | xxxx | xxxx | xxxx | Low | No |

