#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { CdkVpcEc2Stack } from '../lib/cdk-vpc-ec2-stack';

const app = new cdk.App();
new CdkVpcEc2Stack(app, 'CdkVpcEc2Stack');
