pipeline {
    agent any

    environment {
        EC2_HOST = 'your-ec2-public-ip'
        EC2_USER = 'ec2-user'
        REMOTE_DIR = '/home/ec2-user/app'
        SSH_KEY = credentials('EC2_SSH_KEY')  // private key stored in Jenkins
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', credentialsId: 'GITHUB_TOKEN', url: 'https://github.com/yourname/simple-devsecops.git'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                echo "Transferring project files..."
                scp -o StrictHostKeyChecking=no -i ${SSH_KEY} -r * ${EC2_USER}@${EC2_HOST}:${REMOTE_DIR}
                '''
            }
        }

        stage('Install Dependencies & Start App') {
            steps {
                sh '''
                ssh -o StrictHostKeyChecking=no -i ${SSH_KEY} ${EC2_USER}@${EC2_HOST} << 'EOF'
                  cd ${REMOTE_DIR}
                  sudo yum install -y nodejs npm
                  npm install --production
                  pkill -f "node app.js" || true
                  nohup node app.js > app.log 2>&1 &
                  exit
                EOF
                '''
            }
        }
    }
}
