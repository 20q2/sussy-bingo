import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import * as apigwv2 from 'aws-cdk-lib/aws-apigatewayv2';
import * as integrations from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as path from 'path';

export class SussyBingoStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const stateTable = new dynamodb.Table(this, 'GameState', {
      tableName: 'sussy-bingo-state',
      partitionKey: { name: 'PK', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'SK', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: 'ttl',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    const handlerFn = new nodejs.NodejsFunction(this, 'WebSocketHandler', {
      runtime: lambda.Runtime.NODEJS_20_X,
      entry: path.join(__dirname, '..', 'lambda', 'handler.ts'),
      handler: 'handler',
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        TABLE_NAME: stateTable.tableName,
      },
      bundling: {
        minify: true,
        sourceMap: true,
      },
    });

    stateTable.grantReadWriteData(handlerFn);

    const integration = new integrations.WebSocketLambdaIntegration(
      'HandlerIntegration',
      handlerFn,
    );

    const api = new apigwv2.WebSocketApi(this, 'SussyBingoApi', {
      apiName: 'sussy-bingo',
      connectRouteOptions: { integration },
      disconnectRouteOptions: { integration },
      defaultRouteOptions: { integration },
    });

    const stage = new apigwv2.WebSocketStage(this, 'ProductionStage', {
      webSocketApi: api,
      stageName: 'production',
      autoDeploy: true,
    });

    // Allow the Lambda to call back via @connections/*
    api.grantManageConnections(handlerFn);

    // CDK's WebSocketLambdaIntegration only grants invoke permission for one
    // route ARN pattern. Explicitly grant API Gateway permission to invoke the
    // Lambda for *every* route on this API ($connect, $disconnect, $default).
    handlerFn.addPermission('ApiGatewayInvokeAllRoutes', {
      principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
      action: 'lambda:InvokeFunction',
      sourceArn: `arn:aws:execute-api:${this.region}:${this.account}:${api.apiId}/*/*`,
    });

    new cdk.CfnOutput(this, 'WebSocketUrl', {
      value: stage.url,
      description: 'Paste this into src/app/app.component.ts:106 (wsUrl)',
    });
  }
}
