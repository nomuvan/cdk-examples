import * as cdk from 'aws-cdk-lib';
import * as ecr from "aws-cdk-lib/aws-ecr";
import { Construct } from 'constructs';

export class CdkErcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // ECRレポジトリ
    const lambdaEcrRepository = new ecr.Repository(this, 'Repository', {
      repositoryName: "my-repo",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteImages: true,
    });
  }
}