import { Duration, Stack, StackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import { CfnOutput } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CdkVpcEc2Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // バケット
    const bucket = new s3.Bucket(this, 'SampleBucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      bucketName: "cdk-vpc-ec2-sample-bucket",
    });

    // VPC
    const vpc = new ec2.Vpc(this, 'SampleVpc', {
      ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
      vpcName: 'cdk-sample-vpc'
    });

    // セキュリティグループ
    const securityGroup = new ec2.SecurityGroup(this, 'SampleSecurityGroup', {
      vpc: vpc,
      securityGroupName: 'cdk-vpc-ec2-security-group',
    });

    // (Session Mangerを使うための)IAMロール
    const instanceRole = new iam.Role(this, 'SampleRole', {
      assumedBy: new iam.ServicePrincipal('ec2.amazonaws.com'),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName(
          "AmazonSSMManagedInstanceCore"
        ),
      ],
      description: 'cdk-vpc-ec2-instance-role',
    });

    // EC2インスタンス作成
    const createInstance = (id: string, name: string, subnet: ec2.SubnetSelection): ec2.Instance => {
      return new ec2.Instance(this, id, {
        vpc,
        vpcSubnets: subnet,
        instanceType: new ec2.InstanceType(this.node.tryGetContext('instanceType')),
        machineImage: ec2.MachineImage.latestAmazonLinux({
          generation: ec2.AmazonLinuxGeneration.AMAZON_LINUX_2,
        }),
        securityGroup: securityGroup,
        role: instanceRole,
        instanceName: name
      });
    };

    const instance1 = createInstance('SampleInstance1', 'cdk-vpc-ec2-instance1', vpc.selectSubnets({
      subnetType: ec2.SubnetType.PUBLIC
    }));

    const instance2 = createInstance('SampleInstance2', 'cdk-vpc-ec2-instance2', vpc.selectSubnets({
      subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS
    }));

    // CloudFormationに出力
    new CfnOutput(this, 'S3', { value: bucket.bucketName });
    new CfnOutput(this, 'VPC', { value: vpc.vpcId });
    new CfnOutput(this, 'Security Group', { value: securityGroup.securityGroupId });
    new CfnOutput(this, 'EC2Instance1', { value: instance1.instanceId });
    new CfnOutput(this, 'EC2Instance2', { value: instance2.instanceId });
  }
}