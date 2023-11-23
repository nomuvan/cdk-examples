import * as cdk from 'aws-cdk-lib';
import { CdkVpcEc2Stack } from '../lib/cdk-vpc-ec2-stack';
import { DefaultStackSynthesizer } from 'aws-cdk-lib';

const app = new cdk.App();
new CdkVpcEc2Stack(app, 'CdkVpcEc2Stack', {
  synthesizer: new DefaultStackSynthesizer({
    fileAssetsBucketName: 'cdk-vpc-ec2-assets', // bootstrapのバケット名を指定
  }),
  description: 'This is a cdk-vpc-ec2-sample-stack', // CloudFormationスタックに説明を追加
});