pipeline {
    agent any

    environment {
        // NODE_VERSION = '18.x' // Example: Specify Node.js version if using nvm or similar in Jenkins agent
        CYPRESS_BROWSER = 'chrome' // Default browser for CI runs
        // SLACK_CHANNEL = '#your-ci-alerts-channel' // For Slack notifications
        // SLACK_TOKEN_CREDENTIAL_ID = 'your-slack-token-credential-id' // Jenkins credential ID for Slack token
    }

    tools {
        // If you have NodeJS installations configured globally in Jenkins:
        // nodejs 'NodeJS-18' // Replace 'NodeJS-18' with your NodeJS installation name in Jenkins
    }

    stages {
        stage('Checkout') {
            steps {
                script {
                    // Clean before checkout if needed
                    // cleanWs()
                    checkout scm
                }
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // 'npm ci' is generally faster and more reliable for CI
                // Or 'npm install' if you don't have a package-lock.json or prefer it
            }
        }

        stage('Run Cypress Tests') {
            steps {
                script {
                    try {
                        // Example for tag-based execution (modify as needed)
                        // If a 'TAGS' parameter is passed to the Jenkins job:
                        // sh "npx cypress run --browser ${env.CYPRESS_BROWSER} --env tags='${params.TAGS}'"
                        // For now, run all tests:
                        sh "npx cypress run --browser ${env.CYPRESS_BROWSER}"
                    } catch (e) {
                        echo "Cypress tests failed: ${e.getMessage()}"
                        currentBuild.result = 'FAILURE'
                        // throw e // Optional: rethrow to halt pipeline immediately
                    } finally {
                        // Always try to archive reports even if tests fail
                        echo "Archiving test reports..."
                        // Ensure cucumber JSON reports are generated for Allure
                        // The current setup in package.json should handle this.
                    }
                }
            }
        }

        stage('Generate and Archive Allure Report') {
            // This stage should run even if tests fail, to capture the report
            when {
                expression { currentBuild.rawBuild.result == null || currentBuild.rawBuild.result != 'ABORTED' }
            }
            steps {
                script {
                    // Check if allure-results directory exists and has content
                    if (fileExists('allure-results') && sh(script: 'find allure-results -type f -name "*.xml" -o -name "*.json" -o -name "*.txt" | read', returnStatus: true) == 0) {
                        echo "Generating Allure report..."
                        // Ensure allure commandline is available in the Jenkins agent's PATH
                        // Or provide full path / install it as part of the pipeline
                        sh 'npx allure generate allure-results --clean -o allure-report'

                        echo "Archiving Allure report..."
                        archiveArtifacts artifacts: 'allure-report/**', fingerprint: true

                        // Optional: Publish Allure report using the Allure Jenkins Plugin
                        // allure([
                        //     includeProperties: false,
                        //     jdk: '',
                        //     properties: [],
                        //     reportBuildPolicy: 'ALWAYS',
                        //     results: [[path: 'allure-results']]
                        // ])
                        // Note: The Allure Jenkins plugin needs to be installed and configured in Jenkins.
                        // Using archiveArtifacts is a simpler way if the plugin is not available.
                    } else {
                        echo "No Allure results found to generate report."
                    }
                }
            }
        }

        // Placeholder for Slack Notification stage
        // stage('Notify Slack') {
        //     when {
        //         always() // Run this stage regardless of build status
        //     }
        //     steps {
        //         script {
        //             def jobName = env.JOB_NAME
        //             def buildNumber = env.BUILD_NUMBER
        //             def buildStatus = currentBuild.result ?: 'SUCCESS' // Default to SUCCESS if not set
        //             def buildUrl = env.BUILD_URL
        //             def allureReportUrl = "${buildUrl}allure/" // If using Allure Jenkins Plugin
        //             def message = "Build ${buildStatus}: ${jobName} #${buildNumber}\nDetails: ${buildUrl}\nAllure Report: ${allureReportUrl}"

        //             if (buildStatus == 'SUCCESS') {
        //                 slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: env.SLACK_TOKEN_CREDENTIAL_ID, message: ":white_check_mark: ${message}", color: 'good')
        //             } else if (buildStatus == 'FAILURE') {
        //                 slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: env.SLACK_TOKEN_CREDENTIAL_ID, message: ":x: ${message}", color: 'danger')
        //             } else {
        //                 slackSend(channel: env.SLACK_CHANNEL, tokenCredentialId: env.SLACK_TOKEN_CREDENTIAL_ID, message: ":warning: ${message}", color: 'warning')
        //             }
        //         }
        //     }
        // }
    }

    post {
        always {
            echo 'Build finished.'
            // Clean up workspace if desired
            // cleanWs()
        }
        // Additional post actions for success, failure, etc. can be added here
        // success {
        //     echo 'Build was successful!'
        // }
        // failure {
        //     echo 'Build failed.'
        // }
    }
}
