export type AmplifyDependentResourcesAttributes = {
    "api": {
        "BearcamCompanion": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        },
        "bcExploreApi": {
            "RootUrl": "string",
            "ApiName": "string",
            "ApiId": "string"
        }
    },
    "auth": {
        "BearcamCompanion": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "predictions": {
        "identifyLabelsd92e673a": {
            "region": "string",
            "type": "string"
        }
    },
    "storage": {
        "s3bearcamcompanionstoragecb0d4917": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "function": {
        "bcOnImagesFindObjects": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        },
        "bearcamcompanionbcNodeLayer": {
            "Arn": "string"
        },
        "bcExploreLambda": {
            "Name": "string",
            "Arn": "string",
            "Region": "string",
            "LambdaExecutionRole": "string"
        }
    }
}