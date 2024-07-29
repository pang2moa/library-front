pipeline {
    agent any

    tools {
        nodejs "node 20.15.1"  // Global Tool Configuration에서 설정한 NodeJS 이름
    }

    environment {
        PM2_HOME = '/home/appuser/.pm2'  // PM2 홈 디렉토리 설정
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

    stage('Install Dependencies') {
        steps {
            script {
                // 이전 빌드에서 node_modules가 캐시되었는지 확인
                def nodeModulesExists = fileExists 'node_modules'
                
                // package.json이 변경되었는지 확인
                def packageChanged = sh(script: 'git diff HEAD^ HEAD --name-only | grep "package.json"', returnStatus: true) == 0
                
                if (!nodeModulesExists || packageChanged) {
                    echo 'Installing dependencies...'
                    sh 'npm ci'
                } else {
                    echo 'Dependencies are up to date, skipping installation'
                }
            }
        }
    }

        stage('Build') {
            steps {
                sh 'npm run build'
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
                        sh 'pwd'
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