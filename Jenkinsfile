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
                sh 'npm run build && npm run prod_start'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh '''
                        rsync -avz --delete $WORKSPACE/.next /var/www/nextapp/
                        rsync -avz --delete $WORKSPACE/public /var/www/nextapp/
                        rsync -avz $WORKSPACE/package*.json /var/www/nextapp/
                        
                        cd /var/www/nextapp
                        npm install --production
                        
                        pm2 delete nextjs-app || true
                        pm2 start ecosystem.config.js
                    '''
                }
            }
        }

        stage('Cleanup') {
            steps {
                script {
                sh '''
                    cd /var/www/nextapp
                    npm prune --production
                    rm -rf .next/cache
                '''
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