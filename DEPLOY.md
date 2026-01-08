# 部署指南 (Next.js 版) / Deployment Guide (Next.js)

您已成功将项目迁移至 Next.js 架构！现在部署到 Vercel 将变得异常简单且安全。

## 方案一：部署到 Vercel (最推荐)

Vercel 是 Next.js 的开发商，提供了最佳的部署体验。

### 步骤：

1.  **推送到 GitHub/GitLab**：
    确保您的代码已提交到远程仓库。

2.  **在 Vercel 导入项目**：
    *   登录 [Vercel Dashboard](https://vercel.com/dashboard)。
    *   点击 **"Add New..."** -> **"Project"**。
    *   选择您的 `motion-bin` 仓库。

3.  **配置环境变量**：
    *   在 **"Environment Variables"** 部分，添加：
        *   Key: `DASHSCOPE_API_KEY`
        *   Value: `您的_API_KEY` (sk-xxx)
    *   *注意：不再需要 `VITE_` 前缀，因为我们现在使用的是 Next.js API Routes (服务端)，直接用 `process.env.DASHSCOPE_API_KEY` 读取，非常安全。*

4.  **点击 Deploy**：
    Vercel 会自动识别 Next.js 项目并开始构建。

### 解决国内访问问题
部署完成后，Vercel 会分配一个 `*.vercel.app` 的域名。如果国内无法访问：
1.  在 Vercel 项目设置中找到 **"Domains"**。
2.  绑定您自己的域名（需备案或使用海外 DNS）。
3.  或者使用 Vercel 的国内优化线路（CNAME 到 `cname-china.vercel-dns.com`，但不保证长期稳定）。

---

## 方案二：Docker / 阿里云 FC (依然支持)

由于 Next.js 也是基于 Node.js，您依然可以使用之前的 Docker 或 阿里云 FC 方案。

**Docker 部署更新：**
我们现在的 `package.json` 脚本已经适配 Next.js。
```bash
# 构建镜像
docker build -t motion-bin .

# 运行 (端口映射改为 3000)
docker run -d -p 80:3000 -e DASHSCOPE_API_KEY="sk-xxx" motion-bin
```

*注意：需要更新 Dockerfile 以适配 Next.js 的构建产物（建议使用 standalone 模式以减小体积），但标准 Node.js 镜像也能跑通。*

---

## 总结

现在您的项目是一个标准的 **Next.js 全栈应用**。
*   **前端**：React + Tailwind + Framer Motion
*   **后端**：Next.js API Routes (替代了之前的 server.js)
*   **部署**：Vercel (首选) 或 Docker
