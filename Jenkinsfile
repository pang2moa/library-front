pipeline {
    agent any
    
    tools {
        nodejs 'NodeJS'  // Global Tool Configuration에서 설정한 NodeJS 이름
    }
    
    stages {
        stage('소스 코드 체크아웃') {
            steps {
                checkout scm
            }
        }
        
        stage('의존성 설치') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('빌드') {
            steps {
                sh 'npm run build'
            }
        }
        
        stage('배포') {
            steps {
                // 대상 디렉토리 생성 (없는 경우)
                sh 'sudo mkdir -p /var/www/nextapp'

                // Nginx 설정 파일 복사 (필요한 경우)
                sh 'sudo cp nginx.conf /etc/nginx/conf.d/next-app.conf'
                
                // 빌드된 파일을 웹 서버 디렉토리로 복사
                sh 'sudo rsync -avz .next/ /var/www/nextapp/.next/'
                sh 'sudo rsync -avz public/ /var/www/nextapp/public/'
                sh 'sudo cp package.json /var/www/nextapp/'
                
                // node_modules 복사 (프로덕션 의존성만)
                sh 'sudo mkdir -p /var/www/nextapp/node_modules'
                sh 'sudo npm install --prefix /var/www/nextapp --only=prod'
                
                // Nginx 재시작
                sh 'sudo systemctl restart nginx'
            }
        }
    }
    
    post {
        success {
            echo '파이프라인이 성공적으로 완료되었습니다.'
        }
        failure {
            echo '파이프라인 실행 중 오류가 발생했습니다.'
        }
    }
}