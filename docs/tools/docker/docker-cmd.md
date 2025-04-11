# Docker 常用命令

个人理解 docker中的镜像 就像是咱们java 中的Class ，而容器呢 是基于这个镜像构建出的实例 类似于咱java 中 根据Class构造出的一个个实例对象

```cmd
docker 镜像： ----java中 class

docker容器 ： ----java中 class new 出来的实例对象
```

## docker 基础命令

启动docker

```bash
systemctl start docker
```

关闭docker

```bash
systemctl stop docker
```

重启docker

```bash
systemctl restart docker
```

docker设置随服务启动而自启动

```bash
systemctl enable docker
```

查看docker 运行状态

------如果是在运行中 输入命令后 会看到绿色的active

```bash
systemctl status docker
```

查看docker 版本号信息

```bash
docker version
```

查看docker 详细信息

```bash
docker info
```

docker 帮助命令

忘记了某些命令便可使用此进行查看与回顾

```bash
docker --help
docker <command> --help
```

比如 咱忘记了 拉取命令 不知道可以带哪些参数 咱可以这样使用

```bash
docker pull --help
```

## docker 镜像命令

查看自己服务器中docker 镜像列表

```bash
docker images
```

搜索镜像

```bash
docker search 镜像名
docker search --filter=STARS=9000 mysql 搜索 STARS >9000的 mysql 镜像
```

拉取镜像

```bash
docker pull 镜像名
docker pull 镜像名:tag
docker pull 镜像名:tag --disable-content-trust=false
```

比如拉取最新的 mysql 镜像

```bash
docker pull mysql:latest
```

删除镜像 ------当前镜像没有被任何容器使用才可以删除

删除一个

```bash
docker rmi -f 镜像名/镜像ID
```

删除多个 其镜像ID或镜像用用空格隔开即可

```bash
docker rmi -f 镜像名/镜像ID 镜像名/镜像ID 镜像名/镜像ID
```

删除全部镜像  -a 意思为显示全部, -q 意思为只显示ID

```bash
docker rmi -f $(docker images -aq)
```

强制删除镜像

```bash
docker image rm 镜像名称/镜像ID
docker rmi -f 镜像名称/镜像ID
```

保存镜像
将我们的镜像 保存为tar 压缩文件 这样方便镜像转移和保存 ,然后 可以在任何一台安装了docker的服务器上 加载这个镜像

命令:

```bash
docker save 镜像名/镜像ID -o 镜像保存在哪个位置与名字
```

exmaple:

```bash
docker save tomcat -o /myimg.tar
```

加载镜像

任何装 docker 的地方加载镜像保存文件,使其恢复为一个镜像

```bash
docker load -i 镜像保存文件位置
docker load -i /myimg.tar
```

镜像标签

有的时候呢，我们需要对一个镜像进行分类或者版本迭代操作，比如我们一个微服务已经打为docker镜像，但是想根据环境进行区分为develop环境与alpha环境，这个时候呢，我们就可以使用Tag，来进对镜像做一个标签添加，从而行进区分；版本迭代逻辑也是一样，根据不同的tag进行区分

```bash
app:1.0.0 基础镜像
# 分离为开发环境
app:develop-1.0.0   
# 分离为alpha环境
app:alpha-1.0.0   
# 分离为beta环境
app:beta-1.0.0   
```

```bash
docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]

docker tag 源镜像名:TAG 想要生成新的镜像名:新的TAG

# 如果省略TAG 则会为镜像默认打上latest TAG
docker tag aaa bbb
# 上方操作等于 docker tag aaa:latest bbb:test
```

```bash
# 我们根据镜像 quay.io/minio/minio 添加一个新的镜像 名为 aaa 标签Tag设置为1.2.3
docker tag quay.io/minio/minio:1.2.3 aaa:1.2.3

# 我们根据镜像 app-user:1.0.0 添加一个新的镜像 名为 app-user 标签Tag设置为alpha-1.0.0
docker tag app-user:1.0.0 app-user:alpha-1.0.0

```

## docker 容器命令

查看容器列表

查看正在运行容器列表

```bash
docker ps
```

查看所有容器 -----包含正在运行 和已停止的

```bash
docker ps -a
```

容器怎么来呢 **可以通过run 镜像 来构建 自己的容器实例**

运行一个容器

```bash
# -it 表示 与容器进行交互式启动 -d 表示可后台运行容器 （守护式运行）  --name 给要运行的容器 起的名字  /bin/bash  交互路径
docker run -it -d --name 要取的别名 镜像名:Tag /bin/bash 
```

每一个 Docker容器都是独立和安全的应用平台（我们可以理解为，每一个docker容器都相当于在我们的服务器上占用资源然后开辟了属于自己的一个空间（也可以理解为服务器））

我们甚至可以在一个服务器上，使用docker镜像，来跑出N个 mysql实例（尽管，他们的默认端口都是一样的，但还是那句话，容器间，环境是隔离的。A容器中的3306 与B容器的3306毫无关系，因为其不在一个世界呀!）

默认情况下，我们是无法通过宿主机（安装docker的服务器）端口来直接访问容器的 ,因为docker容器自己开辟空间的端口与宿主机端口没有联系…

如果外部想要访问容器，那必须得让容器中的端口与宿主机的端口建立联系绑定起来，这个正式的概念叫做 **容器端口映射**

有了端口映射，我们就可以将宿主机端口与 容器端口绑定起来，比如 我们建立宿主机的6379端口与容器redis6379端口绑定起来，那么再访问宿主机Ip:6379 就可以访问到对应容器了！

删除容器

```bash
docker rm -f 容器ID/容器名
```

删除多个容器

```bash
docker rm -f 容器ID/容器名 容器ID/容器名 容器ID/容器名
```

删除所有容器

```bash
docker rm -f $(docker ps -aq)
```

删除所有停止的容器

```bash
docker rm -f $(docker ps -aq -f status=exited)
```

容器端口与服务器端口映射

```bash
docker run -it -d --name 容器名 -p 服务器端口:容器端口 镜像名:Tag
```

比如我们运行一个mysql容器,将宿主机的3306端口与容器的3306端口绑定起来

```bash
docker run -it -d --name mysql -p 3306:3306 mysql:latest
```

那么容器端口映射有没有什么限制呢？

> 有的，虽说每个容器之间，环境都是隔离的，但是宿主机每个端口都是一个，8888端口被redis002容器绑定了，那么其他所有的容器都不可以使用8888这个端口了!!!

**进入容器方式**:

```bash
docker exec -it 容器ID/容器名 /bin/bash
```

比如我们进入mysql容器

```bash
docker exec -it mysql /bin/bash
```

从容器内 退出到自己服务器中 需注意 两个退出命令的区别

```bash
#-----直接退出  未添加 -d(持久化运行容器) 时 执行此参数 容器会被关闭  
exit
```

```bash
# 优雅退出 --- 无论是否添加-d 参数 执行此命令容器都不会被关闭
Ctrl + p + q
```

停止容器

```bash
docker stop 容器ID/容器名
```

重启容器

```bash
docker restart 容器ID/容器名
```

启动容器

```bash
docker start 容器ID/容器名
```

kill 容器

```bash
docker kill 容器ID/容器名
```

**容器文件拷贝**:

无论容器是否开启 都可以进行拷贝

```bash
#docker cp 容器ID/名称:文件路径  要拷贝到外部的路径   |     要拷贝到外部的路径  容器ID/名称:文件路径
#从容器内 拷出
docker cp 容器ID/名称: 容器内路径  容器外路径
#从外部 拷贝文件到容器内
docker  cp 容器外路径 容器ID/名称: 容器内路径
```

启动容器时，使用 `docker run` 命令时 添加参数 `--restart=always` 便表示，该容器随docker服务启动而自动启动

```bash
docker run -itd --name redis002 -p 8888:6379 --restart=always  redis:5.0.5 /bin/bash
```

方法一：担心数据丢了，这说明你在跑容器的时候没有进行数据挂载吧？？？

你问我，什么是数据挂载？

简单来讲，就是将容器内的数据与外部宿主机文件绑定起来，类似一个双持久化，当容器删除时，宿主机文件数据目录仍在，下次启动容器只要将数据目录指向宿主机数据所在位置即可恢复！

```bash
-v 宿主机文件存储位置:容器内文件位置
```

如此操作，就将 容器内指定文件挂载到了宿主机对应位置，-v命令可以多次使用，即一个容器可以同时挂载多个文件

```bash
-v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置 -v 宿主机文件存储位置:容器内文件位置
```

比如我们将宿主机的 /opt/mysql/data 目录挂载到容器内的 /var/lib/mysql 目录下

```bash
docker run -it -d --name mysql -p 3306:3306 -v /opt/mysql/data:/var/lib/mysql mysql:latest
```

方法二：不想删容器，又想让这个容器设置开机自启动，那么我们修改其启动配置即可！

命令:

```bash
docker  update --restart=always 容器Id 或者 容器名
```

或

```bash
docker container update --restart=always 容器Id 或者 容器名
```

更换容器名

```bash
docker rename 容器ID/容器名 新容器名
```

## 自己提交一个镜像

我们运行的容器可能在镜像的基础上做了一些修改，有时候我们希望保存起来，封装成一个更新的镜像，这时候我们就需要使用 commit 命令来构建一个新的镜像

```bash
docker commit -m="提交信息" -a="作者信息" 容器名/容器ID 提交后的镜像名:Tag
```
