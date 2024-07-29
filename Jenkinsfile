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
        
        stage('build 디렉토리 생성') {
            steps {
                sh 'mkdir -p build'
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
                sh 'sudo mkdir -p /var/www/reactapp'
                
                // 빌드된 파일을 웹 서버 디렉토리로 복사
                sh 'sudo rsync -avz build/ /var/www/reactapp/'
                
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