pipeline {
  agent {label 'docker'}
  environment {
    REPOSITORY_URL = 'gcr.io/claiming-service-dev-29824/frontend'
  }
  stages {
    stage('build-upload-dev-container') {
      when {
        branch 'master'
      }
      agent {
        docker {
          image 'docker:dind'
          args  '-v /var/run/docker.sock:/var/run/docker.sock -u root'
        }
      }
      steps {
        sh 'apk add --update make ca-certificates openssl python bash curl'
        sh 'update-ca-certificates'
        sh 'curl -sSL https://sdk.cloud.google.com | bash'
        sh '/root/google-cloud-sdk/bin/gcloud --quiet components update'
        sh '/root/google-cloud-sdk/bin/gcloud --quiet components install kubectl'
        withCredentials([file(credentialsId: 'google-claiming-service', variable: 'FILE')])
        {
          sh '/root/google-cloud-sdk/bin/gcloud auth activate-service-account --key-file "$FILE"'
          sh 'docker login -u _json_key --password-stdin https://gcr.io < "$FILE"'
        }
        sh 'docker build -t ${REPOSITORY_URL}:dev .'
        sh 'docker tag ${REPOSITORY_URL}:dev  ${REPOSITORY_URL}:${GIT_COMMIT:0:7}'
        sh 'docker push ${REPOSITORY_URL}:dev'
        sh 'docker push ${REPOSITORY_URL}:${GIT_COMMIT:0:7}'
      }
    }
  }
  post {
    failure {
      mattermostSend(channel: '#hd-jenkins', color: '#ff0000', message: "FAILURE: ${currentBuild.fullDisplayName}" )
    }
    success {
      mattermostSend(channel: '#hd-jenkins', color: 'good', message: "SUCCESS: ${currentBuild.fullDisplayName}" )
    }
  }
}
