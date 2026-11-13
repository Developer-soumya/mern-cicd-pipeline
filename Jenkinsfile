
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm ci'
                }
            }
        }

        stage('Backend Tests') {
            steps {
                dir('backend') {
                    bat 'npm test --if-present'
                }
            }
        }

        stage('Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm ci'
                }
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                bat 'docker build -t devops-task-manager-backend:latest ./backend'
                bat 'docker build -t devops-task-manager-frontend:latest ./frontend'
            }
        }

    }

    post {
        success {
            echo 'CI Pipeline completed successfully!'
        }

        failure {
            echo 'CI Pipeline failed. Check the console output.'
        }
    }
}
