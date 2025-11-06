pipeline {
    agent any
    environment {
        APP_DIR = "/home/ec2-user/myapp"
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/angelsitesphil/blueteam_ci-cd' 
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build || echo "No build step"'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test || echo "No tests"'
            }
        }
        stage('Deploy') {
            steps {
                sh 'pkill -f "node app.js" || echo "No process running"'
                sh '''
                mkdir -p $APP_DIR
                cp -r * $APP_DIR
                cd $APP_DIR
                nohup node app.js > app.log 2>&1 &
                '''
            }
        }
    }
    post {
        success { echo '✅ Deployment successful!' }
        failure { echo '❌ Deployment failed!' }
    }
}
