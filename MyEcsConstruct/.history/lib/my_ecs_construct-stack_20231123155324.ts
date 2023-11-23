import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class MyEcsConstructStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = ec2.Vpc.fromLookup(this, 'Vpc', {
      vpcId: 'vpc-xxx'
    })

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'MyEcsConstructQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
