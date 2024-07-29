pipeline {
    agent any

    environment {
        NODE_VERSION = '20'  // 또는 프로젝트에서 사용하는 Node.js 버전
        PM2_HOME = '/home/appuser/.pm2'  // PM2 홈 디렉토리 설정
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Setup Node.js') {
            steps {
                nvm(nodeVersion: env.NODE_VERSION) {
                    sh 'node --version'
                    sh 'npm --version'
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                nvm(nodeVersion: env.NODE_VERSION) {
                    script {
                        // package.json이 변경되었는지 확인
                        def packageChanged = sh(script: 'git diff HEAD^ HEAD --name-only | grep "package.json"', returnStatus: true) == 0
                        if (packageChanged) {
                            sh 'npm ci'  // npm install 대신 npm ci 사용
                        } else {
                            echo 'package.json not changed, skipping npm ci'
                        }
                    }
                }
            }
        }

        stage('Build') {
            steps {
                nvm(nodeVersion: env.NODE_VERSION) {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // 애플리케이션 디렉토리로 이동
                    dir('/var/www/nextapp') {
                        // 빌드 결과물 복사
                        sh 'rsync -avz --delete $WORKSPACE/.next ./'
                        sh 'rsync -avz --delete $WORKSPACE/public ./'
                        sh 'rsync -avz $WORKSPACE/package*.json ./'

                        // PM2로 애플리케이션 재시작
                        sh 'pm2 restart nextjs-app || pm2 start npm --name "nextjs-app" -- start'
                    }
                }
            }
        }
    }

    post {
        always {
            // 작업 공간 정리
            cleanWs()
        }
    }
}