pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS'
    }

    stages {
        stage('Checkout') {
            steps {
                // 拉取代码
                git 'https://github.com/YeomanWang/vueApp.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                // 安装依赖
                script {
                    // 使用 Node.js
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                // 执行构建
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Test') {
            steps {
                // 执行构建
                script {
                    sh 'npm run test:unit'
                }
            }
        }

        // stage('Deploy') {
        //     steps {
        //         // 部署到生产环境（例如，上传到服务器、Docker 部署等）
        //         script {
        //             // 此处根据你的需求执行部署脚本
        //             sh './deploy.sh'
        //         }
        //     }
        // }
    }

    post {
        success {
            // 构建成功后的操作，例如发送通知
            echo 'Build and deploy succeeded!'
        }
        failure {
            // 构建失败后的操作
            echo 'Build failed!'
        }
    }
}
