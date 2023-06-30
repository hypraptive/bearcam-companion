export type AmplifyDependentResourcesAttributes = {
  "analytics": {
    "bearcamcompanion": {
      "Id": "string",
      "Region": "string",
      "appName": "string"
    }
  },
  "api": {
    "BearcamCompanion": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    },
    "bcExploreApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    }
  },
  "auth": {
    "BearcamCompanion": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "bcCountBears": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "bcExploreLambda": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "bcOnImagesFindObjects": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    },
    "bearcamcompanionbcNodeLayer": {
      "Arn": "string"
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
  }
}