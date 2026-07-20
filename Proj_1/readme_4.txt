#1--- Docs


1.5-- nextjs
-- framework cua react (react la trang don -> nang)
-> nextjs giai quyet
hydrate: giam thieu thoi gian tai trang lan dau
tao ra trang tinh -> giam thoi gian load trang, giam over hit, co routes tu dong, viet dc api o nextjs
dc uu tien deploy tren vercel
turbopack: tang toc do tai trang  (nhanh hon x10 so voi vite, 2-3 lan so voi reactjs)

-- hydrate 
server side rerender
what, where (su kien: click, hover, change)

-- start nextjs

-- RSC (Reacr server component)
server component, client component
server component: do file, lay data DB, k dung dc hook
client component: dung dc hook, lay file tu server
mac dinh la server -> chuyen sang client (use client)

-- App router
co san:
[] se cau hinh folder la params

[blogId] -> http://localhost:3000/blog/2
blogId -> http://localhost:3000/blog/blogId/2

reviews -> http://localhost:3000/blog/2/reviews
[reviewId] ->http://localhost:3000/blog/2/reviews/2

-- Catch all segment in Routing

-- not found page

-- custom not found page

-- group route tung trang
Trong Next.js, thư mục có dấu ngoặc đơn như (auth) được gọi là Route Groups.
Tác dụng lớn nhất của nó là giúp bạn tổ chức thư mục dự án gọn gàng hơn mà không làm thay đổi đường dẫn URL.
Sử dụng Layout riêng (Quan trọng nhất)
Tổ chức code theo chức năng (Logic Grouping)

-- layout nextjs (nested layout, rout group layout)
custom layout rieng cho tung page

-- metadata
title, description: toi uu CEO

Việc xóa dòng "use client" là cần thiết vì trong Next.js (App Router), một file không thể vừa là Client Component vừa đảm bảo nhiệm vụ xuất Metadata (SEO).
Hàm generateMetadata chỉ chạy trên Server. Khi bạn viết "use client", bạn đang biến file đó thành một thành phần chạy dưới trình duyệt (Client). Next.js sẽ báo lỗi ngay lập tức vì nó không thể lấy thông tin SEO (như tiêu đề trang) từ một file mà trình duyệt chưa tải xong.
SEO: Khi chạy trên Server, tiêu đề "Blog details" sẽ nằm sẵn trong mã HTML khi Google bot quét trang web của bạn.

Tốc độ: Trình duyệt không cần tải thêm JavaScript để xử lý giao diện này, giúp trang hiện ra nhanh hơn cho người dùng.

-- link and navigation
"use client"
Đặc điểm,Trang Blog (Metadata),Trang Login (useRouter)
Mục tiêu chính,"Hiển thị nội dung, tối ưu SEO.","Tương tác người dùng, điều hướng."
Loại Component,Server Component,Client Component
Metadata,Có thể dùng generateMetadata.,Không thể dùng generateMetadata.
Hook,Không dùng Hook.,"Dùng useRouter, useState,..."

- replace thay push -> khong luu lai lich su
home -> login -> register (do k luu lai ls nen back -> quay lai home)
router.back() giong router.replace()
router.forward()

-- Loading UI

-- handle Error

-- parallel routes
@search -> mat di route, khong ton tai route

-- Static side generate (SSG)
web tinh -> HTML -> dung cho trang landing page, quang cao
uu diem: build san html -> load trang nhanh
lay data tu json (CDN)

-- Server side rendering (SSR)
request -> html tra ve -> borwser -> web
lay data tu json (Database)


-- component image
anh dc tra ve tu phias server


-- route handlers


-- GET, POST, PUT, PATCH, DELETE

-- redirect
da ve trang nao do minh muon khi k tim thay

-- headers
token barer

-- cookies
session login, phien dang nhap, request token
bo nho nho, luu chu identity

-- caching
trong production
yarn build -> Get -> request k thay doi -> luu cache 
-> export const dynamc = "auto";
-> luu vao cache -> lay cache ra hien thi
-> export const dynamc = "fore-dynamic"; -> se cap nhat khong bi luu cache

-- middleware
trung gian giua: rq va rs
phai di qua, quan li cookie, set header cho rs

-- server component
mac dinh la server component
xac dinh clien khi khai bao "use client"

-- lifecycle


-- static rendering 


1.6-- blog
1.7-- setup
1.8-- api auth
1.9-- login,logout, permision
1.10-- authorization
1.11-- permision user
1.12-- user manage
1.13-- setup manage
1.14-- product manage


#2--- install
 extension: thunder client

#3--- generate


#4--- run

npx create-next-app@latest
--
PS D:\A_Self_Proj\learn_nextjs\Proj_1\proj1_4> 

Need to install the following packages:
create-next-app@16.2.4
Ok to proceed? (y) y

√ What is your project named? ... my-app
√ Would you like to use the recommended Next.js defaults? » Yes, use recommended defaults
Creating a new Next.js app in D:\A_Self_Proj\learn_nextjs\Proj_1\proj1_4\my-app.

Using npm.

Initializing project with template: app-tw 


Installing dependencies:
- next
- react
- react-dom

Installing devDependencies:
- @tailwindcss/postcss
- @types/node
- @types/react
- @types/react-dom
- eslint
- eslint-config-next
- tailwindcss
- typescript
--

yarn dev


#5--- ci/cd


#6--- docker


#7--- deploy